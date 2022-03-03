import { BotEvents, OnCommandEvent } from '../../common'
import { EventBus } from '../../events'

/**
 * Triggers the credits to roll
 * @param onCommandEvent 
 */
export function rollCredits(onCommandEvent: OnCommandEvent):void {

  // Only the broadcaster can run this
  if (onCommandEvent.flags.broadcaster) {
    EventBus.eventEmitter.emit(BotEvents.RequestCreditRoll);
  }
}