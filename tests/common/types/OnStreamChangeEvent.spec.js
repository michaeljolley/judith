"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var types_1 = require("../../../src/common/types");
var mocks_1 = require("../../mocks");
describe('Types: OnStreamChangeEvent', function () {
    it('should set values in constructor', function () {
        var str = (0, mocks_1.activeStream)();
        var model = new types_1.OnStreamChangeEvent(str);
        (0, chai_1.expect)(model.stream).to.not.be.undefined;
        (0, chai_1.expect)(model.stream).to.be.equal(str);
    });
});
//# sourceMappingURL=OnStreamChangeEvent.spec.js.map