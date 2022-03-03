import { log, LogLevel } from "../common";
import { EventBus } from "../events";
import { Fauna, Twitch } from "../integrations";
import {
  BotEvents,
  OnStreamChangeEvent,
  OnStreamStartEvent,
  Stream
} from "../common";

export abstract class State {

  private static stream: Stream;

  public static init(): void {
    EventBus.eventEmitter.addListener(BotEvents.OnStreamChange,
      (onStreamChangeEvent: OnStreamChangeEvent) => this.onStreamChange(onStreamChangeEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnStreamEnd, () => this.onStreamEnd())
    EventBus.eventEmitter.addListener(BotEvents.OnStreamStart,
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
    if (!this.stream) {
      EventBus.eventEmitter.emit(BotEvents.OnStreamStart, new OnStreamStartEvent(onStreamChangeEvent.stream))
    } else {
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