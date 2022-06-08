import { User } from "./user";

export class OnVoteEvent {
  constructor(
    public pollId: string,
    public choice: string,
    public user: User
  ) { }
}