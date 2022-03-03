"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var commandRegistry_1 = require("../../src/chat/commandRegistry");
var common_1 = require("../../src/common");
describe('commandRegistry', function () {
    var oldregistry = commandRegistry_1.CommandRegistry;
    var gotCalled = false;
    var stubCommand = function (onCommandEvent) {
        gotCalled = !!onCommandEvent;
    };
    beforeEach(function () {
        oldregistry = commandRegistry_1.CommandRegistry;
        commandRegistry_1.CommandRegistry.commands = [new common_1.Command('testCommand', stubCommand)];
    });
    it('should not return undefined for a command in the array', function () {
        var cmd = commandRegistry_1.CommandRegistry.getCommand('testCommand');
        (0, chai_1.expect)(cmd).to.not.be.undefined;
    });
    it('should return undefined for a non-existant command', function () {
        var cmd = commandRegistry_1.CommandRegistry.getCommand("doesntExist");
        (0, chai_1.expect)(cmd).to.be.undefined;
    });
    it('should return a single entry containing the testCommand', function () {
        var cmds = commandRegistry_1.CommandRegistry.getCommands();
        (0, chai_1.expect)(cmds).to.not.be.empty;
        (0, chai_1.expect)(cmds.length).to.be.equal(1);
        (0, chai_1.expect)(cmds[0].commandName).to.be.equal("testCommand");
    });
    after(function () {
        commandRegistry_1.CommandRegistry = oldregistry;
    });
});
//# sourceMappingURL=commandRegistry.spec.js.map