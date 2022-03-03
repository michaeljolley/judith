import axios from 'axios'
import { Activity, log, LogLevel, User } from '../../common'
const baseURL = 'https://app.orbit.love/api/v1'

export abstract class Orbit {

  public static async addActivity(activity: Activity, user: User): Promise<void> {
    try {

      const payload = { 
        activity,
        identity: {
          source: 'twitch',
          source_host: `twitch.tv/deepgramdevs`,
          username: user.login,
          url: `https://twitch.tv/${user.login}`
        }
      }
      
      await axios({
        url: `${baseURL}/${process.env.ORBIT_WS}/activities`,
        method: 'POST',
        headers: { Authorization: `Bearer ${process.env.ORBIT_KEY}` },
        data: payload
      })
    }
    catch (err) {
      console.dir({ ...err.response.data, ...user});
      log(LogLevel.Error, err)
    }
  }
}