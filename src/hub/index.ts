import io, { Server as IOServer } from "socket.io"
import { Server as HttpServer } from 'http'

import { EventBus } from '../events'
import {
  BotEvents,
  log, 
  LogLevel,
  OnChatMessageEvent,
  OnCheerEvent,
  OnCreditRollEvent,
  OnFollowEvent,
  OnJoinEvent,
  OnPartEvent,
  OnSoundEffectEvent,
  OnStopEvent,
  OnStreamEndEvent,
  OnStreamStartEvent,
  OnSubEvent,
  OnRaidEvent,
  OnPointRedemptionEvent,
  OnStreamChangeEvent
} from "../common"

export class IO {

  private io: IOServer

  constructor(server: HttpServer) {
    this.io = io(server)

    this.io.on('connect', (conn: io.Socket) => {

      conn.on('onOrbit', (streamDate: string) => this.onOrbit(streamDate))

      conn.on('onFullOrbit', (streamDate: string) => this.onFullOrbit(streamDate))

      // Ensure the connection is from the bots overlays and not
      // and external actor.
      if (conn.handshake.headers.host !== process.env.HOST &&
        conn.handshake.headers.host !== `${process.env.HOST}:${process.env.PORT}`) {
        conn.disconnect(true)
      }
    })

    EventBus.eventEmitter.addListener(BotEvents.OnChatMessage,
      (onChatMessageEvent: OnChatMessageEvent) => this.onChatMessage(onChatMessageEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnCheer,
      (onCheerEvent: OnCheerEvent) => this.onCheer(onCheerEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnFollow,
      (onFollowEvent: OnFollowEvent) => this.onFollow(onFollowEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnJoin,
      (onJoinEvent: OnJoinEvent) => this.onJoin(onJoinEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnPart,
      (onPartEvent: OnPartEvent) => this.onPart(onPartEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnPointRedemption,
      (onPointRedemptionEvent: OnPointRedemptionEvent) => this.onPointRedemption(onPointRedemptionEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnSoundEffect,
      (onSoundEffectEvent: OnSoundEffectEvent) => this.onSoundEffect(onSoundEffectEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnStop,
      (onStopEvent: OnStopEvent) => this.onStop(onStopEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnStreamChange,
      (onStreamChangeEvent: OnStreamChangeEvent) => this.onStreamChange(onStreamChangeEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnStreamEnd,
      (onStreamEndEvent: OnStreamEndEvent) => this.onStreamEnd(onStreamEndEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnStreamStart,
      (onStreamStartEvent: OnStreamStartEvent) => this.onStreamStart(onStreamStartEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnSub,
      (onSubEvent: OnSubEvent) => this.onSub(onSubEvent))
    EventBus.eventEmitter.addListener(BotEvents.OnRaid,
      (onRaidEvent: OnRaidEvent) => this.onRaid(onRaidEvent))
  }

  private onChatMessage(onChatMessageEvent: OnChatMessageEvent) {
    this.io.emit(BotEvents.OnChatMessage, onChatMessageEvent)
  }

  private onCheer(onCheerEvent: OnCheerEvent) {
    this.io.emit(BotEvents.OnCheer, onCheerEvent)
  }

  private onFollow(onFollowEvent: OnFollowEvent) {
    this.io.emit(BotEvents.OnFollow, onFollowEvent)
  }

  private onJoin(onJoinEvent: OnJoinEvent) {
    this.io.emit(BotEvents.OnJoin, onJoinEvent)
  }

  private onPart(onPartEvent: OnPartEvent) {
    this.io.emit(BotEvents.OnPart, onPartEvent)
  }

  private onPointRedemption(onPointRedemptionEvent: OnPointRedemptionEvent) {
    this.io.emit(BotEvents.OnPointRedemption, onPointRedemptionEvent)
  }

  private onSoundEffect(onSoundEffectEvent: OnSoundEffectEvent) {
    this.io.emit(BotEvents.OnSoundEffect, onSoundEffectEvent)
  }

  private onStop(onStopEvent: OnStopEvent) {
    this.io.emit(BotEvents.OnStop, onStopEvent)
  }

  private onStreamChange(onStreamChangeEvent: OnStreamChangeEvent) {
    this.io.emit(BotEvents.OnStreamChange, onStreamChangeEvent)
  }

  private onStreamEnd(onStreamEndEvent: OnStreamEndEvent) {
    this.io.emit(BotEvents.OnStreamEnd, onStreamEndEvent)
  }

  private onStreamStart(onStreamStartEvent: OnStreamStartEvent) {
    this.io.emit(BotEvents.OnStreamStart, onStreamStartEvent)
  }

  private onSub(onSubEvent: OnSubEvent) {
    this.io.emit(BotEvents.OnSub, onSubEvent)
  }

  private onRaid(onRaidEvent: OnRaidEvent) {
    this.io.emit(BotEvents.OnRaid, onRaidEvent)
  }

  private onOrbit(streamDate: string) {
    EventBus.eventEmitter.emit(BotEvents.OnOrbit, streamDate);
  }

  private onFullOrbit(streamDate: string) {
    EventBus.eventEmitter.emit(BotEvents.OnFullOrbit, streamDate);
  }
}