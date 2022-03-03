"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onSubExtra = exports.emoteOnlyExtra = exports.onCheerExtra = exports.onCommandExtra = void 0;
var emoteSet = {};
function onCommandExtra() {
    return {
        isEmoteOnly: false,
        id: '1234567',
        roomId: 'channel',
        channel: 'channel',
        sinceLastCommand: {
            any: 0,
            user: 0
        },
        messageType: 'chat',
        userColor: '',
        userId: '12345678',
        username: 'testuser',
        displayName: 'TestUser',
        timestamp: '01/01/2020',
        messageEmotes: emoteSet,
        userBadges: {},
        customRewardId: '',
        flags: {}
    };
}
exports.onCommandExtra = onCommandExtra;
function onCheerExtra() {
    return {
        "channel": "channel",
        "roomId": "channel",
        "displayName": "TestUser",
        "userId": "12345678",
        "username": "testuser",
        "userColor": "",
        "userBadges": {},
        "messageEmotes": emoteSet,
        "subscriber": ""
    };
}
exports.onCheerExtra = onCheerExtra;
function emoteOnlyExtra() {
    return {
        isEmoteOnly: true,
        id: '1234567',
        roomId: 'channel',
        channel: 'channel',
        messageType: 'chat',
        userColor: '',
        userId: '12345678',
        username: 'testuser',
        displayName: 'TestUser',
        timestamp: '01/01/2020',
        messageEmotes: emoteSet,
        userBadges: {},
        customRewardId: '',
        flags: {}
    };
}
exports.emoteOnlyExtra = emoteOnlyExtra;
function onSubExtra() {
    return {
        channel: 'channel',
        id: '1234567',
        roomId: 'channel',
        messageEmotes: emoteSet,
        messageType: 'chat',
        userBadges: {},
        userColor: '',
        userId: '12345678',
        username: 'testuser',
        displayName: 'TestUser'
    };
}
exports.onSubExtra = onSubExtra;
//# sourceMappingURL=Extras.js.map