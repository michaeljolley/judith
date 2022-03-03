import { BotEvents } from '../../common';

export class Listener<T> {
  constructor(
    public type: BotEvents,
    public listener: (arg: T) => void
  ) { }
}