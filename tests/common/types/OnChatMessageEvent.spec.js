"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
var mocks_1 = require("../../mocks");
describe('Types: OnChatMessageEvent', function () {
    it('should set values in constructor', function () {
        var props = ["user", "message", "sanitizedMessage", "flags", "self", "extra", "id", "emotes"];
        var propVals = [(0, mocks_1.user)(), "2", "3", (0, mocks_1.viewerFlags)(), (0, mocks_1.onCommandExtra)(), "6", false, ["8"]];
        var model = new types_1.OnChatMessageEvent(propVals[0], propVals[1], propVals[2], propVals[3], propVals[4], propVals[5], propVals[6], propVals[7]);
        var letModelAny = model;
        for (var idx in props) {
            var prop = props[idx];
            (0, chai_1.expect)(letModelAny[prop]).to.not.be.undefined;
            (0, chai_1.expect)(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    });
});
//# sourceMappingURL=OnChatMessageEvent.spec.js.map