"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
describe('Types: TwitchTokenResponse', function () {
    it('should set values in constructor', function () {
        var props = ["access_token", "expires_in", "token_type"];
        var propVals = ["1", 2, "3"];
        var model = new types_1.TwitchTokenResponse(propVals[0], propVals[1], propVals[2]);
        var letModelAny = model;
        for (var idx in props) {
            var prop = props[idx];
            (0, chai_1.expect)(letModelAny[prop]).to.not.be.undefined;
            (0, chai_1.expect)(letModelAny[prop]).to.be.equal(propVals[idx]);
        }
    });
});
//# sourceMappingURL=TwitchTokenResponse.spec.js.map