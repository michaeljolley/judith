"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cheerSubFlags = exports.founderFlags = exports.moderatorFlags = exports.broadcasterFlags = exports.vipFlags = exports.subscriberFlags = exports.viewerFlags = void 0;
function viewerFlags() {
    return {
        subscriber: false,
        vip: false,
        broadcaster: false,
        founder: false,
        mod: false,
        highlighted: false,
        customReward: false
    };
}
exports.viewerFlags = viewerFlags;
function subscriberFlags() {
    return {
        subscriber: true,
        vip: false,
        broadcaster: false,
        founder: false,
        mod: false,
        highlighted: false,
        customReward: false
    };
}
exports.subscriberFlags = subscriberFlags;
function vipFlags() {
    return {
        subscriber: false,
        vip: true,
        broadcaster: false,
        founder: false,
        mod: false,
        highlighted: false,
        customReward: false
    };
}
exports.vipFlags = vipFlags;
function broadcasterFlags() {
    return {
        subscriber: false,
        vip: false,
        broadcaster: true,
        founder: false,
        mod: false,
        highlighted: false,
        customReward: false
    };
}
exports.broadcasterFlags = broadcasterFlags;
function moderatorFlags() {
    return {
        subscriber: false,
        vip: false,
        broadcaster: false,
        founder: false,
        mod: true,
        highlighted: false,
        customReward: false
    };
}
exports.moderatorFlags = moderatorFlags;
function founderFlags() {
    return {
        subscriber: false,
        vip: false,
        broadcaster: false,
        founder: true,
        mod: false,
        highlighted: false,
        customReward: false
    };
}
exports.founderFlags = founderFlags;
function cheerSubFlags() {
    return {
        mod: false,
        founder: false,
        subscriber: true,
        vip: true
    };
}
exports.cheerSubFlags = cheerSubFlags;
//# sourceMappingURL=Flags.js.map