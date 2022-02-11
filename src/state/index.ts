import { log, LogLevel } from "../common";
import { Fauna, Twitch } from "../integrations";
import {
  OnCreditRollEvent,
  OnStreamChangeEvent,
  OnStreamStartEvent,
  Stream
} from "../types";

export abstract class State {

  private static stream: Stream;

  public static init(): void {
    EventBus.eventEmitter.addListener(Events.OnStreamChange,
      (onStreamChangeEvent: OnStreamChangeEvent) => this.onStreamChange(onStreamChangeEvent))
    EventBus.eventEmitter.addListener(Events.OnStreamEnd, () => this.onStreamEnd())
    EventBus.eventEmitter.addListener(Events.OnStreamStart,
      (onStreamStartEvent: OnStreamStartEvent) => this.onStreamStart(onStreamStartEvent))
  }

  public static setStream(stream: Stream): void {
    this.stream = stream;
  }

  public static async getStream(): Promise<Stream | undefined> {

    if (this.stream) return this.stream;

    let stream: Stream
    try {
      const streamDate = new Date().toLocaleDateString('en-US')
      stream = await Twitch.getStream(streamDate)
    }
    catch (err) {
      log(LogLevel.Error, `onCommand: getStream: ${err}`)
    }

    if (stream && !stream.ended_at) {
      this.stream = stream;
      return this.stream;
    }

    return undefined;
  }

  private static onStreamChange(onStreamChangeEvent: OnStreamChangeEvent): void {
    if (this.stream) {
      this.stream = onStreamChangeEvent.stream;
    }
  }

  private static onStreamEnd(): void {
    this.stream = undefined;
  }

  private static onStreamStart(onStreamStartEvent: OnStreamStartEvent): void {
    this.stream = onStreamStartEvent.stream;
  }
}