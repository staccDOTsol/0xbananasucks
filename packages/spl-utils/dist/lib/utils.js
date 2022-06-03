"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBN = exports.truthy = void 0;
const bn_js_1 = __importDefault(require("bn.js"));
const truthy = (value) => !!value;
exports.truthy = truthy;
function toBN(numberOrBn, mintOrDecimals) {
    const decimals = typeof mintOrDecimals === "number"
        ? mintOrDecimals
        : mintOrDecimals.decimals;
    if (bn_js_1.default.isBN(numberOrBn)) {
        return numberOrBn;
    }
    else {
        return new bn_js_1.default(Math.ceil(Number(numberOrBn) * Math.pow(10, decimals)).toLocaleString("fullwide", { useGrouping: false }));
    }
}
exports.toBN = toBN;
//# sourceMappingURL=utils.js.map