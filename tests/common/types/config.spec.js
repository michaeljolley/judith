"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
describe('Types: Config', function () {
    it('should set values in constructor', function () {
        var props = ["twitchClientId", "twitchChannelName", "twitchChannelAuthToken", "twitchBotUsername", "twitchBotAuthToken", "twitchChannelId", "streamElementsJWT"];
        var propVals = ["1", "2", "3", "4", "5", "6", "7"];
        var model = new types_1.Config(propVals[0], propVals[1], propVals[2], propVals[3], propVals[4], propVals[5], propVals[6]);
        var letModelAny = model;
        for (var idx in props) {
            var prop = props[idx];
            (0, chai_1.expect)(letModelAny[prop]).to.not.be.undefined;
            (0, chai_1.expect)(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    });
});
//# sourceMappingURL=config.spec.js.map