import { NextFunction, Request, Response } from 'express'
import axios, { AxiosResponse } from 'axios'
import { Config, Stream, User } from '../../common'
import { LogLevel, log } from '../../common';
import { Guid } from "guid-typescript";
import * as Crypto from 'crypto';

export class TwitchAPI {

  private twitchAPIEndpoint = 'https://api.twitch.tv/helix'
  private twitchAPIUserEndpoint = `${this.twitchAPIEndpoint}/users`
  private twitchAPIStreamEndpoint = `${this.twitchAPIEndpoint}/streams`
  private twitchAPIWebhookEndpoint = `${this.twitchAPIEndpoint}/eventsub/subscriptions`

  private headers: Record<string, string | number | boolean>
  private webhookSecret: string

  constructor(private config: Config) {
    this.headers = {
      Authorization: `Bearer ${this.config.twitchChannelAuthToken}`,
      'Content-Type': 'application/json',
      'Client-ID': this.config.twitchClientId
    }
  }
  
  /**
   * Registers all webhooks with Twitch directed to this instance of the bot
   */
  public async registerWebhooks(): Promise<void> {
    this.webhookSecret = Guid.create().toString();

    log(LogLevel.Info, 'registering webhooks')

    await this.removeWebhooks();
    await this.registerFollowWebhook();
    await this.registerStreamOnlineWebhook();
    await this.registerStreamOfflineWebhook();
  }

  private async removeWebhooks(): Promise<void> {
    try {
      const response = await axios.get(
        this.twitchAPIWebhookEndpoint,
        {
          headers: {
            Authorization: `Bearer ${this.config.twitchChannelAuthToken}`,
            'Client-ID': this.config.twitchClientId
          }
        });
      log(LogLevel.Info, `TwitchAPI:removeWebhooks - GET Response = ${response.status}`);

      const subs = response.data.data

      for (const sub of subs) {
        const deleteResponse = await axios.delete(
          `${this.twitchAPIWebhookEndpoint}?id=${sub.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.config.twitchChannelAuthToken}`,
              'Client-ID': this.config.twitchClientId
            }
          });
        log(LogLevel.Info, `TwitchAPI:removeWebhooks - DELETE Response = ${deleteResponse.status}`);
      }

    } catch (err) {
      log(LogLevel.Error, `TwitchAPI:removeWebhooks ${err}`);
    }
  }

  private async registerFollowWebhook(): Promise<void> {
    try {
      const payload = {
        "type": "channel.follow",
        "version": "1",
        "condition": {"broadcaster_user_id":`${this.config.twitchChannelId}`},
        "transport": {"method":"webhook","callback":`https://${process.env.HOST}/webhooks/follow`,"secret":this.webhookSecret}
      };
      
      const response = await axios.post(
        this.twitchAPIWebhookEndpoint,
        payload,
        {
          headers: this.headers
        });
      log(LogLevel.Info, `TwitchAPI:registerFollowWebhook - Response = ${response.status}`);
    } catch (err) {
      log(LogLevel.Error, `TwitchAPI:registerFollowWebhook ${err}`);
    }
  }

  private async registerStreamOnlineWebhook(): Promise<void> {
    try {
      const payload = {
        "type": "stream.online",
        "version": "1",
        "condition": {"broadcaster_user_id":`${this.config.twitchChannelId}`},
        "transport": {"method":"webhook","callback":`https://${process.env.HOST}/webhooks/stream`,"secret":this.webhookSecret}
      };

      const response = await axios.post(
        this.twitchAPIWebhookEndpoint,
        payload,
        {
          headers: this.headers
        });
      log(LogLevel.Info, `TwitchAPI:registerStreamOnlineWebhook - Response = ${response.status}`);
    } catch (err) {
      log(LogLevel.Error, `TwitchAPI:registerStreamOnlineWebhook ${err}`);
    }
  }
  
  private async registerStreamOfflineWebhook(): Promise<void> {
    try {
      const payload = {
        "type": "stream.offline",
        "version": "1",
        "condition": {"broadcaster_user_id":`${this.config.twitchChannelId}`},
        "transport": {"method":"webhook","callback":`https://${process.env.HOST}/webhooks/stream`,"secret":this.webhookSecret}
      };

      const response = await axios.post(
        this.twitchAPIWebhookEndpoint,
        payload,
        {
          headers: this.headers
        });
      log(LogLevel.Info, `TwitchAPI:registerStreamOfflineWebhook - Response = ${response.status}`);
    } catch (err) {
      log(LogLevel.Error, `TwitchAPI:registerStreamOfflineWebhook ${err}`);
    }
  }
  
  public validateWebhook(request: Request, response: Response, next: NextFunction): unknown {

    const givenSignature = request.headers['twitch-eventsub-message-signature'];

    if (!givenSignature) {
      log(LogLevel.Error, `webhooks: validator - missing signature`)
      return response.status(409).json({
        error: 'Missing signature'
      });
    }
    log(LogLevel.Info, `Twitch:hooks: x-hub-signature: ${givenSignature}`)

    const digest = Crypto.createHmac('sha256', this.webhookSecret)
      .update((request.headers['twitch-eventsub-message-id'] + request.headers['twitch-eventsub-message-timestamp'] + request.body))
      .digest('hex');
    log(LogLevel.Info, `Twitch:hooks: digest: sha256=${digest}`)

    if (Crypto.timingSafeEqual(Buffer.from(`sha256=${digest}`), Buffer.from(givenSignature))) {
      return next();
    } else {
      log(LogLevel.Error, `webhooks: validator - invalid signature`)
      return response.status(409).json({
        error: 'Invalid signature'
      });
    }
  }

  /**
   * Retrieves data regarding a Twitch user from the Twitch API
   * @param login username of the user to retrieve
   */
  public async getUser(login: string): Promise<User | undefined> {

    const url = `${this.twitchAPIUserEndpoint}?login=${login}`

    let user: User

    try {
      const response: AxiosResponse = await axios.get(url, { headers: this.headers })
      if (response.data) {
        const body = response.data
        const userData = body.data.length > 1 ? body.data : body.data[0]
        if (userData) {
          user = new User(userData.login, userData.profile_image_url, userData.id, userData.display_name)
        }
      }
    } catch (err) {
      log(LogLevel.Error, `TwitchAPI:getUser ${err}`)
    }
    return user
  }

  public async getStream(streamDate: string): Promise<Stream | undefined> {

    const url = `${this.twitchAPIStreamEndpoint}?user_id=${this.config.twitchChannelId}&first=1`

    let stream: Stream

    try {
      const response: AxiosResponse = await axios.get(url, { headers: this.headers })
      if (response.data) {
        const body = response.data
        const streamData = body.data.length > 1 ? body.data : body.data[0]
        if (streamData) {
          stream = new Stream(streamData.id, streamData.started_at, streamDate, streamData.title)
        }
      }
    } catch (err) {
      log(LogLevel.Error, `TwitchAPI:getStream ${err}`)
    }

    return stream
  }
}
