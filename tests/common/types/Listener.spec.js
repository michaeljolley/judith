"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var common_1 = require("../../../src/common");
var events_1 = require("../../../src/events");
describe('Model: Listener', function () {
    it('should set values in constructor', function () {
        var listener = new events_1.Listener(common_1.BotEvents.OnSay, function () { });
        (0, chai_1.expect)(listener.type).to.equal(common_1.BotEvents.OnSay);
        (0, chai_1.expect)(typeof listener.listener).to.equal("function");
    });
});
//# sourceMappingURL=Listener.spec.js.map