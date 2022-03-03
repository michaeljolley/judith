import fs from 'fs'
import { BotEvents, OnCommandEvent, OnSoundEffectEvent } from "../../common"
import { EventBus } from "../../events"
import { ShouldThrottle } from '../../common'

/**
 * Determines if the command is an audio clip and attempts to play if so
 * @param onCommandEvent 
 */
export function _SoundEffect(onCommandEvent: OnCommandEvent): void {
  
  const cooldownSeconds = 60
  
  // The broadcaster & mods are allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cooldown.
  if (!onCommandEvent.flags.broadcaster &&
    !onCommandEvent.flags.mod &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const filename = `${onCommandEvent.command.toLocaleLowerCase()}.mp3`
  let basePath = '.'

  // When running inside a container the audio files are in a slightly different location
  if (fs.existsSync('./web')) {
    basePath = './web/overlays/wwwroot'
  }
  const fullpath = `${basePath}/assets/audio/clips/${filename}`

  if (fs.existsSync(fullpath)) {
    // Send a the sfx to Socket.io
    EventBus.eventEmitter.emit(BotEvents.OnSoundEffect, new OnSoundEffectEvent(filename))
  }
}