import { BotEvents, OnCommandEvent, OnSayEvent, ShouldThrottle } from '../../common'
import { EventBus } from '../../events'
/**
 * Sends a message to chat with details about Patreon
 * @param onCommandEvent 
 */
export function patreon(onCommandEvent: OnCommandEvent): void {

  const cooldownSeconds = 300

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cool down.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const message = `https://bbb.dev/patreon`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}