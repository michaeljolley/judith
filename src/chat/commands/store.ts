import { BotEvents, OnCommandEvent, OnSayEvent, ShouldThrottle } from '../../common'
import { EventBus } from '../../events'
/**
 * Sends a message to chat with a link to BaldBeardedBuilder's store
 * @param onCommandEvent 
 */
export function store(onCommandEvent: OnCommandEvent):void {

  const cooldownSeconds = 300

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cooldown.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const message = `Pick up some merch at https://bbb.dev/shop`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}