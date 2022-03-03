import { User } from "./user";
import { IUserEvent } from "./IUserEvent"

export class OnPartEvent implements IUserEvent {
  constructor(
    public user: User,
    public self: boolean
  ) { }
}