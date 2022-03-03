"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
var mocks_1 = require("../../mocks");
describe('Types: OnPartEvent', function () {
    it('should set values in constructor', function () {
        var usr = (0, mocks_1.user)();
        var model = new types_1.OnPartEvent(usr, false);
        (0, chai_1.expect)(model.user).to.not.be.empty;
        (0, chai_1.expect)(model.user).to.be.equal(usr);
        (0, chai_1.expect)(model.self).to.be.false;
    });
});
//# sourceMappingURL=OnPartEvent.spec.js.map