import { BotEvents, OnCommandEvent, OnSayEvent } from '../../common'
import { EventBus } from '../../events'
/**
 * Sends a message to chat BBB Hype emotes
 * @param onCommandEvent 
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function hype(onCommandEvent: OnCommandEvent):void {

  const message = `baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype baldbeHype`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}