import { OnCommandEvent } from './onCommandEvent';

export class Command {
  constructor(
    public commandName: string,
    public command: (onCommandEvent: OnCommandEvent) => void
  ) { }
}