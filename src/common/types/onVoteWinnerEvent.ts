import { PollChoice } from "./poll";
import { User } from "./user";

export class OnVoteWinnerEvent {
  constructor(
    public pollId: string,
    public title: string,
    public votes: PollVotes[]
  ) { }
}

export class PollVotes extends PollChoice {
  constructor(
    public user: User,
    public name: string,
    public url?: string
  ) { 
    super(name, url)
  }
}