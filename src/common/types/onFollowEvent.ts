import { User } from "./user";
import { IUserEvent } from "./IUserEvent"

export class OnFollowEvent implements IUserEvent {
  constructor(
    public user: User
  ) { }
}