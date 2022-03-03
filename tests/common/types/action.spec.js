"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var common_1 = require("../../../src/common");
describe('Types: Action', function () {
    it('should set values in constructor', function () {
        var props = ["actionDate", "userId", "displayName", "avatarUrl", "eventType", "eventData", "_id"];
        var propVals = ["1", "2", "3", "4", "5", "6", "7"];
        var model = new common_1.Action(propVals[0], propVals[1], propVals[2], propVals[3], propVals[4], propVals[5], propVals[6]);
        var letModelAny = model;
        for (var idx in props) {
            var prop = props[idx];
            (0, chai_1.expect)(letModelAny[prop]).to.not.be.undefined;
            (0, chai_1.expect)(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    });
});
//# sourceMappingURL=action.spec.js.map