import { Stream } from "./stream";

export class OnStreamEndEvent {
  constructor(
    public stream: Stream
  ) { }
}