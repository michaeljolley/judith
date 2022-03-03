"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = __importDefault(require("chai"));
var expect = chai_1.default.expect;
var sinon_1 = __importDefault(require("sinon"));
var sinon_chai_1 = __importDefault(require("sinon-chai"));
require("mocha");
chai_1.default.use(sinon_chai_1.default);
var common_1 = require("../../src/common");
describe('Common', function () {
    describe('getTime', function () {
        it('should give me current hour and minutes with padding', function () {
            var _a = (0, common_1.getTime)(), hours = _a.hours, minutes = _a.minutes;
            var date = new Date();
            var rawMinutes = date.getMinutes();
            var rawHours = date.getHours();
            var chours = (rawHours < 10 ? '0' : '') + rawHours.toLocaleString();
            var cminutes = (rawMinutes < 10 ? '0' : '') + rawMinutes.toLocaleString();
            expect(chours).to.be.equal(hours);
            expect(cminutes).to.be.equal(minutes);
        });
    });
    describe('log', function () {
        var clock;
        var currEnv;
        before(function () {
            currEnv = process.env.NODE_ENV;
            process.env.NODE_ENV = "testing";
            sinon_1.default.restore();
            clock = sinon_1.default.useFakeTimers(new Date(2020, 10, 29, 9, 8, 0, 0));
        });
        after(function () {
            clock.restore();
            process.env.NODE_ENV = currEnv;
        });
        it('expect console.info to have been called', function () {
            sinon_1.default.spy(console, 'info');
            (0, common_1.log)("info", "test");
            expect(console.info).to.have.been.called;
        });
        it('expect console.info to have been called with test', function () {
            var text = "test";
            var msg = "[09:08] " + text;
            (0, common_1.log)("info", text);
            expect(console.info).to.have.been.calledWithExactly(msg);
        });
        it('expect console.info to have been called with stack-trace in development mode', function () {
            process.env.NODE_ENV = "development";
            var hours = "09";
            var minutes = "08";
            var text = "test";
            (0, common_1.log)("info", text);
            expect(console.info).to.have.been.calledWithMatch(function (arg) {
                return arg.indexOf(hours) > -1 && arg.indexOf(minutes) > -1 && arg.indexOf("common.spec.ts") > -1;
            });
        });
    });
});
//# sourceMappingURL=common.spec.js.map