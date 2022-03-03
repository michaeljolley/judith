"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
var mocks_1 = require("../../mocks");
describe('Types: OnRaidEvent', function () {
    it('should set values in constructor', function () {
        var props = ["user", "viewers"];
        var propVals = [(0, mocks_1.user)(), 32];
        var model = new types_1.OnRaidEvent(propVals[0], propVals[1]);
        var letModelAny = model;
        for (var idx in props) {
            var prop = props[idx];
            (0, chai_1.expect)(letModelAny[prop]).to.not.be.undefined;
            (0, chai_1.expect)(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    });
});
//# sourceMappingURL=OnRaidEvent.spec.js.map