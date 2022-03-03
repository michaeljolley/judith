"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var chai_1 = require("chai");
var sinon_1 = __importDefault(require("sinon"));
require("mocha");
var _soundEffect_1 = require("../../../src/chat/commands/_soundEffect");
var common_1 = require("../../../src/common");
var events_1 = require("../../../src/events");
var mocks_1 = require("../../mocks");
var onCommandEvent;
beforeEach(function () {
    onCommandEvent = new common_1.OnCommandEvent((0, mocks_1.user)(), 'words', '!words', (0, mocks_1.viewerFlags)(), (0, mocks_1.onCommandExtra)(), (0, mocks_1.activeStream)());
});
afterEach(function () {
    events_1.EventBus.eventEmitter.removeAllListeners();
});
describe('Commands: _SoundEffect', function () {
    describe('webSetup', function () {
        var originalBasePath = "";
        var spy = sinon_1.default.spy();
        beforeEach(function () {
            var emitter = events_1.EventBus.eventEmitter;
            emitter.on(common_1.BotEvents.OnSoundEffect, spy);
            (0, _soundEffect_1._SoundEffect)(onCommandEvent);
            spy.calledWith(function (arg) {
                originalBasePath = arg.filename;
            });
            sinon_1.default.stub(fs_1.default, 'existsSync').withArgs('./web').returns(true);
        });
        it('should change basePath if ./web exists', function () {
            (0, _soundEffect_1._SoundEffect)(onCommandEvent);
            spy.calledWith(function (arg) {
                (0, chai_1.expect)(arg.filename).to.not.be.equal(originalBasePath);
            });
        });
    });
    it('should not send message to chat', function () {
        var spy = sinon_1.default.spy();
        var emitter = events_1.EventBus.eventEmitter;
        emitter.on(common_1.BotEvents.OnSay, spy);
        (0, _soundEffect_1._SoundEffect)(onCommandEvent);
        (0, chai_1.expect)(spy.called).to.equal(false);
    });
    it('should send sound effect if command matches existing .mp3', function () {
        var spy = sinon_1.default.spy();
        var emitter = events_1.EventBus.eventEmitter;
        emitter.on(common_1.BotEvents.OnSoundEffect, spy);
        (0, _soundEffect_1._SoundEffect)(onCommandEvent);
        (0, chai_1.expect)(spy.called).to.equal(true);
    });
    it('should not send sound effect if command does not match existing .mp3', function () {
        onCommandEvent.command = 'no_such_file';
        var spy = sinon_1.default.spy();
        var emitter = events_1.EventBus.eventEmitter;
        emitter.on(common_1.BotEvents.OnSoundEffect, spy);
        (0, _soundEffect_1._SoundEffect)(onCommandEvent);
        (0, chai_1.expect)(spy.called).to.equal(false);
    });
    it('should not send events if on cooldown', function () {
        var sfxSpy = sinon_1.default.spy();
        var emitter = events_1.EventBus.eventEmitter;
        emitter.on(common_1.BotEvents.OnSoundEffect, sfxSpy);
        onCommandEvent.extra.sinceLastCommand.any = 10;
        (0, _soundEffect_1._SoundEffect)(onCommandEvent);
        (0, chai_1.expect)(sfxSpy.called).to.equal(false);
    });
    it('should send events if on cooldown and user is moderator', function () {
        onCommandEvent.flags = (0, mocks_1.moderatorFlags)();
        var sfxSpy = sinon_1.default.spy();
        var emitter = events_1.EventBus.eventEmitter;
        emitter.on(common_1.BotEvents.OnSoundEffect, sfxSpy);
        onCommandEvent.extra.sinceLastCommand.any = 10;
        (0, _soundEffect_1._SoundEffect)(onCommandEvent);
        (0, chai_1.expect)(sfxSpy.called).to.equal(true);
    });
    it('should send events if on cooldown and user is broadcaster', function () {
        onCommandEvent.flags = (0, mocks_1.broadcasterFlags)();
        var sfxSpy = sinon_1.default.spy();
        var emitter = events_1.EventBus.eventEmitter;
        emitter.on(common_1.BotEvents.OnSoundEffect, sfxSpy);
        onCommandEvent.extra.sinceLastCommand.any = 10;
        (0, _soundEffect_1._SoundEffect)(onCommandEvent);
        (0, chai_1.expect)(sfxSpy.called).to.equal(true);
    });
    it('should not send events if on user cooldown', function () {
        var sfxSpy = sinon_1.default.spy();
        var emitter = events_1.EventBus.eventEmitter;
        emitter.on(common_1.BotEvents.OnSoundEffect, sfxSpy);
        onCommandEvent.extra.sinceLastCommand.user = 10;
        (0, _soundEffect_1._SoundEffect)(onCommandEvent);
        (0, chai_1.expect)(sfxSpy.called).to.equal(false);
    });
});
//# sourceMappingURL=_soundEffect.spec.js.map