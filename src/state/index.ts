import { log, LogLevel, OnCreditRollEvent } from "../common";
import { EventBus } from "../events";
import { Fauna, Twitch } from "../integrations";
import {
  BotEvents,
  Credit,
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
    EventBus.eventEmitter.addListener(BotEvents.RequestCreditRoll,
      () => this.requestCreditRoll());
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

  private static async requestCreditRoll(): Promise<void> {
    try {
      if (!this.stream) {
        await this.getStream();
      }

      if (this.stream) {
        const actions: [string[]] = await Fauna.getCredits(this.stream.streamDate);

        const distinctCredits: Credit[] = [];
        
        const credits: Credit[] = actions.map((payload: string[]) => {
          return new Credit(payload[1], payload[2]);
        });

        credits.forEach((credit: Credit) => {
          if (!distinctCredits.find(f => f.displayName === credit.displayName)) {
            distinctCredits.push(credit);
          }
        });

        distinctCredits.forEach((credit) => {
          credit.onRaid = actions.some(a => a[1] === credit.displayName && a[3] === 'onRaid');
          credit.onCheer = actions.some(a => a[1] === credit.displayName && a[3] === 'onCheer');
          credit.onSub = actions.some(a => a[1] === credit.displayName && a[3] === 'onSub');
          credit.onDonation = actions.some(a => a[1] === credit.displayName && a[3] === 'onDonation');
          const sponsor = actions.find(a => a[1] === credit.displayName && a[3] === 'onSponsor');
          if (sponsor) {
            credit.onSponsor = true;
            credit.tier = parseInt(sponsor[4]);
          }
        });

        const onCreditRollEvent = new OnCreditRollEvent(distinctCredits);
        EventBus.eventEmitter.emit(BotEvents.OnCreditRoll, onCreditRollEvent);
      }
    } catch (err) {
      log(LogLevel.Error, `State: requestCreditRoll: ${err}`);
    }
  }
}