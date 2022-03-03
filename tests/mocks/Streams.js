"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.endedStream = exports.activeStream = void 0;
var common_1 = require("../../src/common");
function activeStream() {
    return new common_1.Stream('2020202', '01/01/2020', '01/01/2020', 'we streamz fer teh lulz', null);
}
exports.activeStream = activeStream;
function endedStream() {
    return new common_1.Stream('2020202', '01/01/2020', '01/01/2020', 'we streamz fer teh lulz', '01/01/2020');
}
exports.endedStream = endedStream;
//# sourceMappingURL=Streams.js.map