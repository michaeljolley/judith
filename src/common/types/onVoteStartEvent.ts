export class OnVoteStartEvent {
  constructor(
    public pollId: string,
    public started_at: string,
    public lengthInSeconds: number
  ) { }
}