import { BotEvents, OnCommandEvent, OnStopEvent } from '../../common'
import { EventBus } from '../../events'

/**
 * Sends command to stop A/V effects
 * @param onCommandEvent 
 */
export function stop(onCommandEvent: OnCommandEvent):void {

  // Only the broadcaster & mods should be able to stop effects
  if (onCommandEvent.flags.broadcaster ||
    onCommandEvent.flags.mod) {
    // Send the message to Twitch chat
    EventBus.eventEmitter.emit(BotEvents.OnStop, new OnStopEvent())
  }

}