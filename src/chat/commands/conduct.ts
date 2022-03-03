import { BotEvents, OnCommandEvent, OnSayEvent, ShouldThrottle } from '../../common'
import { EventBus } from '../../events'

/**
 * Sends a message to chat with a link to the BBB Code of Conduct
 * @param onCommandEvent 
 */
export function conduct(onCommandEvent: OnCommandEvent):void {

  const cooldownSeconds = 300

  // The broadcaster is allowed to bypass throttling. Otherwise,
  // only proceed if the command hasn't been used within the cooldown.
  if (!onCommandEvent.flags.broadcaster &&
    ShouldThrottle(onCommandEvent.extra.sinceLastCommand, cooldownSeconds, true)) {
    return
  }

  const message = `Hey, we're a friendly bunch here, but we do ask that you abide by our code of conduct, which can be found here: https://bbb.dev/coc`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}