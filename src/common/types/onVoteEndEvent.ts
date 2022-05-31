export class OnVoteEndEvent {
  constructor(
    public pollId: string,
    public ended_at: string
  ) { }
}