import { BotEvents, OnCommandEvent, OnSayEvent, ShouldThrottle } from '../../common'
import { EventBus } from '../../events'
/**
 * Sends a message to chat with a link to Michael's GitHub profile
 * @param onCommandEvent 
 */
export function gitHub(onCommandEvent: OnCommandEvent):void {

  const cooldownSeconds = 300

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cooldown.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const message = `All of our code can be found at https://github.com/builders-club`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}