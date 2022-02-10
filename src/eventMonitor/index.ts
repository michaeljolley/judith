import ComfyJS, { OnCheerExtra, OnCheerFlags, OnCommandExtra, OnMessageFlags, OnResubExtra, OnSubExtra, OnSubGiftExtra, OnSubMysteryGiftExtra } from "comfy.js";
import { SubMethod } from "tmi.js";

import { Config, OnCheerEvent, OnCommandEvent, OnJoinEvent, OnPartEvent, OnRaidEvent, OnSubEvent, User } from '../types';
import { log, LogLevel } from '../common';
import { Twitch } from "../integrations/twitch";
import { Events } from "./events";

// Should listen to all events in the following locations
// and trigger events based on them:
// - Twitch chat
// - Twitch EventSub
// - Stream Elements Donations
// - Discord messages
// - Patreon ??
// - GitHub sponsor

export abstract class EventMonitor {

  private static _config?: Config;

  /**
   * Initializes the EventMonitor to begin watching & emitting events
   * @param config Environment configuration
   */
  static init(config: Config) {
    this._config = config;

    ComfyJS.Init(this._config.twitchBotUsername, this._config.twitchBotAuthToken, this._config.twitchChannelName);

    this._monitor();
  }

  private static _monitor() {
    ComfyJS.onChat = this._onChat.bind(this)
    ComfyJS.onCheer = this._onCheer.bind(this)
    ComfyJS.onCommand = this._onCommand.bind(this)
    ComfyJS.onConnected = this._onConnected.bind(this)
    ComfyJS.onError = this._onError.bind(this)
    ComfyJS.onJoin = this._onJoin.bind(this)
    ComfyJS.onPart = this._onPart.bind(this)
    ComfyJS.onRaid = this._onRaid.bind(this)
    ComfyJS.onReconnect = this._onReconnect.bind(this)
    ComfyJS.onResub = this._onResub.bind(this)
    ComfyJS.onSub = this._onSub.bind(this)
    ComfyJS.onSubGift = this._onSubGift.bind(this)
    ComfyJS.onSubMysteryGift = this._onSubMysteryGift.bind(this)


  }

  /**
   * Handler for users joining Twitch chat
   * @param user 
   * @param self 
   */
  private static async _onJoin(user: string, self: boolean) {
    log(LogLevel.Info, `onJoin: ${user}`)
    let userInfo: User

    try {
      userInfo = await Twitch.getUser(user)
    }
    catch (err) {
      log(LogLevel.Error, `onJoin: ${err}`)
    }

    if (userInfo) {
      this.emit(Events.OnJoin, new OnJoinEvent(userInfo, self))
    }
  }

  /**
   * Handler for users leaving Twitch chat
   * @param user 
   * @param self 
   */
  private static async _onPart(user: string, self: boolean) {
    log(LogLevel.Info, `onPart: ${user}`)
    let userInfo: User

    try {
      userInfo = await Twitch.getUser(user)
    }
    catch (err) {
      log(LogLevel.Error, `onPart: ${err}`)
    }

    if (userInfo) {
      this.emit(Events.OnPart, new OnPartEvent(userInfo, self))
    }
  }

  /**
   * Handler for cheers from Twitch
   * @param user 
   * @param message 
   * @param bits 
   * @param flags 
   * @param extra 
   */
  private static async _onCheer(user: string, message: string, bits: number, flags: OnCheerFlags, extra: OnCheerExtra) {
    log(LogLevel.Info, `onCheer: ${user} cheered ${bits} bits`)
    let userInfo: User

    try {
      userInfo = await Twitch.getUser(user)
    }
    catch (err) {
      log(LogLevel.Error, `onCheer: ${err}`)
    }

    if (userInfo) {
      this.emit(Events.OnCheer, new OnCheerEvent(userInfo, message, bits, flags, extra))
    }
  }

  /**
   * Handler for chat messages that include commands
   * @param user 
   * @param command 
   * @param message 
   * @param flags 
   * @param extra 
   */
  private static async _onCommand(user: string, command: string, message: string, flags: OnMessageFlags, extra: OnCommandExtra) {
    log(LogLevel.Info, `onCommand: ${user} sent the ${command} command`)
    let userInfo: User

    try {
      userInfo = await Twitch.getUser(user)
    }
    catch (err) {
      log(LogLevel.Error, `onCommand: getUser: ${err}`)
    }

    const stream = await State.getStream();

    // Only respond to commands if we're streaming, or debugging
    if (userInfo && (stream || process.env.NODE_ENV === "development")) {
      this.emit(Events.OnCommand, new OnCommandEvent(userInfo, command, message, flags, extra, stream));
    }
  }

  /**
   * Handles event that fires upon connecting to Twitch chat
   * @param address 
   * @param port 
   * @param isFirstConnect 
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static _onConnected(address: string, port: number, isFirstConnect: boolean): void {
    log(LogLevel.Info, `onConnected: ${address}:${port}`)
  }

  /**
   * Handler for incoming raids
   * @param user 
   * @param viewers 
   */
  private static async _onRaid(user: string, viewers: number) {
    log(LogLevel.Info, `onRaid: ${user} raided with ${viewers} viewers`)
    let userInfo: User

    try {
      userInfo = await Twitch.getUser(user)
    }
    catch (err) {
      log(LogLevel.Error, `onRaid: ${err}`)
    }

    if (userInfo) {
      this.emit(Events.OnRaid, new OnRaidEvent(userInfo, viewers))
    }
  }

  /**
   * Handler for reconnecting to Twitch chat
   * @param reconnectCount 
   */
  private static _onReconnect(reconnectCount: number): void {
    log(LogLevel.Info, `onReconnect: ${reconnectCount}`)
  }

  /**
   * Handler for new subscriptions
   * @param user 
   * @param message 
   * @param subTierInfo 
   * @param extra 
   */
  private static async _onSub(user: string, message: string, subTierInfo: SubMethod, extra: OnSubExtra) {
    log(LogLevel.Info, `onSub: ${user} subbed`)
    let userInfo: User

    try {
      userInfo = await Twitch.getUser(user)
    }
    catch (err) {
      log(LogLevel.Error, `onSub: ${err}`)
    }

    if (userInfo) {
      this.emit(Events.OnSub, new OnSubEvent(userInfo, message, subTierInfo, extra))
    }
  }

  /**
   * Handler for newly gifted subscriptions
   * @param gifterUser 
   * @param streakMonths 
   * @param recipientUser 
   * @param senderCount 
   * @param subTierInfo 
   * @param extra 
   */
  private static async _onSubGift(gifterUser: string, streakMonths: number, recipientUser: string, senderCount: number, subTierInfo: SubMethod, extra: OnSubGiftExtra) {
    log(LogLevel.Info, `onSubGift: ${gifterUser} gifted a sub to ${recipientUser}`)
    let userInfo: User
    let gifterInfo: User

    try {
      userInfo = await Twitch.getUser(recipientUser)
    }
    catch (err) {
      log(LogLevel.Error, `onSubGift: ${err}`)
    }

    try {
      gifterInfo = await Twitch.getUser(gifterUser)
    }
    catch (err) {
      log(LogLevel.Error, `onSubGift: ${err}`)
    }

    if (userInfo) {
      this.emit(Events.OnSub, new OnSubEvent(userInfo, '', subTierInfo, extra, null, gifterInfo))
    }
  }

  /**
   * Handler for renewals of subscriptions
   * @param user 
   * @param message 
   * @param streakMonths 
   * @param cumulativeMonths 
   * @param subTierInfo 
   * @param extra 
   */
  private static async _onResub(user: string, message: string, streakMonths: number, cumulativeMonths: number, subTierInfo: SubMethod, extra: OnResubExtra) {
    log(LogLevel.Info, `onResub: ${user} resubbed for ${cumulativeMonths} total months`)
    let userInfo: User

    try {
      userInfo = await Twitch.getUser(user)
    }
    catch (err) {
      log(LogLevel.Error, `onResub: ${err}`)
    }

    if (userInfo) {
      this.emit(Events.OnSub, new OnSubEvent(userInfo, message, subTierInfo, extra, cumulativeMonths))
    }
  }

  /**
   * Handler for anonymously gifted subs
   * @param gifterUser 
   * @param numbOfSubs 
   * @param senderCount 
   * @param subTierInfo 
   * @param extra 
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static _onSubMysteryGift(gifterUser: string, numbOfSubs: number, senderCount: number, subTierInfo: SubMethod, extra: OnSubMysteryGiftExtra): void {
    log(LogLevel.Info, `onSubMysteryGift: ${gifterUser} gifted ${numbOfSubs}`)
  }

  /**
   * Handler for errors in the Twitch client and/or connection
   * @param error 
   */
  private static _onError(error): void {
    log(LogLevel.Error, `onError: ${error}`)
  }
}