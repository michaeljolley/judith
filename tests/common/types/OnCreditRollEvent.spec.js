"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
var mocks_1 = require("../../mocks");
describe('Types: OnCreditRollEvent', function () {
    it('should set values in constructor', function () {
        var model = new types_1.OnCreditRollEvent([(0, mocks_1.credit)()]);
        (0, chai_1.expect)(model.credits).to.not.be.empty;
    });
});
//# sourceMappingURL=OnCreditRollEvent.spec.js.map