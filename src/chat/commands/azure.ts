import { BotEvents, OnCommandEvent, OnSayEvent } from '../../common'
import { EventBus } from '../../events'

/**
 * Sends a message to chat with a link to the sponsored Azure link
 * @param onCommandEvent 
 */
export function azure(onCommandEvent: OnCommandEvent):void {

  const message = `Check out the docs/samples/etc. for Azure Content Moderator at https://bbb.dev/azmod`

  // Send the message to Twitch chat
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}