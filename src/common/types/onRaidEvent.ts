import { User } from "./user"
import { IUserEvent } from "./IUserEvent"

export class OnRaidEvent implements IUserEvent {
  constructor(
    public user: User,
    public viewers: number
  ) { }
}