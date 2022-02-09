import axios, { AxiosResponse } from 'axios'
import { Config, Stream, User } from '../../types'
import { LogLevel, log } from '../../common';

export class TwitchAPI {

  private twitchAPIEndpoint = 'https://api.twitch.tv/helix'
  private twitchAPIUserEndpoint = `${this.twitchAPIEndpoint}/users`
  private twitchAPIStreamEndpoint = `${this.twitchAPIEndpoint}/streams`

  private headers: Record<string, string | number | boolean>

  constructor(private config: Config) {
    this.headers = {
      Authorization: `Bearer ${this.config.twitchChannelAuthToken}`,
      'Content-Type': 'application/json',
      'Client-ID': this.config.twitchClientId
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
          user = {
            login: userData.login,
            avatar_url: userData.profile_image_url,
            id: userData.id,
            display_name: userData.display_name
          } as User;
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
          stream = { 
            id: streamData.id, 
            started_at: streamData.started_at, 
            streamDate, 
            title: streamData.title
          } as Stream
        }
      }
    } catch (err) {
      log(LogLevel.Error, `TwitchAPI:getStream ${err}`)
    }

    return stream
  }

}