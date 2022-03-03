import { Stream } from "./stream";

export class OnStreamStartEvent {
  constructor(
    public stream: Stream
  ) { }
}