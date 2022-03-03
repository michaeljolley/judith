"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
describe('Types: Credit', function () {
    it('should set values in constructor', function () {
        var props = ["displayName", "avatarUrl", "onCheer", "onSub", "onDonation", "onSponsor", "onRaid", "tier",];
        var propVals = ["1", "2", true, false, false, false, false, 8];
        var model = new types_1.Credit(propVals[0], propVals[1], propVals[2], propVals[3], propVals[4], propVals[5], propVals[6], propVals[7]);
        var letModelAny = model;
        for (var idx in props) {
            var prop = props[idx];
            (0, chai_1.expect)(letModelAny[prop]).to.not.be.undefined;
            (0, chai_1.expect)(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    });
});
//# sourceMappingURL=Credit.spec.js.map