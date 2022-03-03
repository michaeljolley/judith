import { BotEvents, OnCommandEvent, OnSayEvent } from "../../common"
import { EventBus } from "../../events"
/**
 * Sends a message to chat with info on BBB Instagram
 * @param onCommandEvent 
 */
export function shoutOut(onCommandEvent: OnCommandEvent): void {
  // Only mods or broadcasters can call the shout-out command.
  if (!onCommandEvent.flags.broadcaster &&
    !onCommandEvent.flags.mod) {
      return;
    }
  const lowerMessage = onCommandEvent.message.toLocaleLowerCase().trim();
  const splitMessage = lowerMessage.split(" ");
  
  // We must have exactly one parameter; the user's name
  if (splitMessage.length === 1) {
    const username = splitMessage[0].replace("@", "");

    const message = `Shout out to @${username}! Check out their stream at https://twitch.tv/${username} and give them a follow.`;
    // Send the message to Twitch chat
    EventBus.eventEmitter.emit(BotEvents.OnSay, new OnSayEvent(message))
  }
}