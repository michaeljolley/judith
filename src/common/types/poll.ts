export class Poll {
  constructor(
    public id: string,
    public streamDate: string,
    public title: string,
    public started_at?: string,
    public ended_at?: string,
    public choices?: PollChoice[],
    public _id?: string
  ) { }
}

export class PollChoice {
  constructor(
    public name: string,
    public url?: string
  ) { }
}