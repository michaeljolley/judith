import { webhookRouter } from './integrations/twitch/eventSub';
import dotenv from 'dotenv'
dotenv.config()

import axios, { AxiosResponse } from 'axios'
import http from 'http'
import express from 'express'
import qs from 'querystring'

import { Config, log, LogLevel, TwitchTokenResponse } from './common'
import { ChatMonitor } from './chat'
import { overlayRouter, assetsRouter } from './web'
import { Fauna, Twitch } from './integrations'
import { IO } from './hub'
import { Logger } from './logger'
import { State } from './state'
import { Cron } from './cron';

// Identify the Twitch credentials first
const TWITCH_API = 'https://id.twitch.tv/oauth2/token'
const TwitchClientId = process.env.TWITCH_CLIENT_ID
const TwitchClientSecret = process.env.TWITCH_CLIENT_SECRET

const authParams = qs.stringify({
  client_id: TwitchClientId,
  client_secret: TwitchClientSecret,
  grant_type: 'client_credentials'
})

axios.post(`${TWITCH_API}?${authParams}`)
  .then(init)
  .catch((reason: unknown) => log(LogLevel.Error, `Twitch OAuth booboo: ${JSON.stringify(reason)}`))

async function init(response: AxiosResponse<TwitchTokenResponse>) {

  const twitchAuth = response.data
  const port = process.env.PORT

  const config: Config = new Config(
    TwitchClientId,
    process.env.TWITCH_CHANNEL,
    twitchAuth.access_token,
    process.env.TWITCH_BOT_USERNAME,
    process.env.TWITCH_BOT_AUTH_TOKEN,
    process.env.TWITCH_CHANNEL_ID
  )

  const app = express()
  const server = http.createServer(app)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const io = new IO(server);

  Fauna.init()
  State.init()
  Logger.init()
  Twitch.init(config)
  Cron.init()

  app.use(express.raw({// Need raw message body for signature verification
    type: 'application/json'
  }))  

  app.use('/webhooks', webhookRouter)

  app.use('/overlays', overlayRouter)

  if (process.env.NODE_ENV && process.env.NODE_ENV === 'development') {
    app.use('/overlays/assets', assetsRouter)
  }

  server.listen(port, () => {
    log(LogLevel.Info, `Server is listening on port ${port}`)
  })

  await Twitch.registerWebhooks()

  const chatMonitor: ChatMonitor = new ChatMonitor(config)

  chatMonitor.init()

  // close all streams and clean up anything needed for the stream
  // when the process is stopping
  process.on("SIGTERM", () => {
    log(LogLevel.Info, "Shutting down...")
    server.close()
    chatMonitor.close()
  })
}
