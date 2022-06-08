import { OnVoteEvent } from './../../common/types/onVoteEvent';
import { BotEvents, OnCommandEvent, OnSayEvent } from '../../common'
import { EventBus } from '../../events'
import { Fauna } from '../../integrations';

/**
 * Allows viewer to vote for something
 * @param onCommandEvent 
 */
export async function vote(onCommandEvent: OnCommandEvent): Promise<void> {

  // See if there's an active poll. If not, let the viewer know
  const poll = await Fauna.getActivePoll(new Date().toLocaleDateString('en-US'))
  if (poll === undefined) {
    const message = `Sorry @${onCommandEvent.user.display_name || onCommandEvent.user.login}, there are no active polls`
    EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
    return
  }

  // If so, is their selection a valid choice. If not, let them know and
  // tell them what the valid choices are.
  const lowerMessage = onCommandEvent.message.toLocaleLowerCase().trim();
  const splitMessage = lowerMessage.split(" ");
  // We must have exactly one parameter; the vote
  if (splitMessage.length === 1 && 
      poll.choices.find(f => f.name.toLocaleLowerCase() === splitMessage[0])) {
    // If so, record the vote.
    EventBus.eventEmitter.emit(BotEvents.OnVote, new OnVoteEvent(poll.id, splitMessage[0], onCommandEvent.user))
    return
  }
  
  const message = `Sorry @${onCommandEvent.user.display_name || onCommandEvent.user.login}, ${splitMessage[0]} isn't a valid choice. Your options are: ${poll.choices.map(m => m.name.toLocaleLowerCase()).join(", ")}`
  EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
}