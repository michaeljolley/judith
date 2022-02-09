import { OnCommandEvent, OnSayEvent } from "../../models"
import { EventBus, Events } from "../../events"
import { ShouldThrottle } from '../../shouldThrottle'

/**
 * Sends a message to chat with details about Patreon
 * @param onCommandEvent 
 */
export function Patreon(onCommandEvent: OnCommandEvent): void {

  const cooldownSeconds = 300

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cool down.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const message = `https://bbb.dev/patreon`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(Events.OnSay, new OnSayEvent(message))
}