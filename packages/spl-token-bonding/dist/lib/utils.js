"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDecimal = exports.supplyAsNum = exports.amountAsNum = exports.toBN = exports.toNumber = exports.toU128 = void 0;
const spl_token_1 = require("@solana/spl-token");
const bn_js_1 = __importDefault(require("bn.js"));
const spl_utils_1 = require("@strata-foundation/spl-utils");
/**
 * Convert a number to a string avoiding scientific notation
 * @param n
 * @returns
 */
function toFixedSpecial(num, n) {
    var str = num.toFixed(n);
    if (str.indexOf("e+") === -1)
        return str;
    // if number is in scientific notation, pick (b)ase and (p)ower
    str = str
        .replace(".", "")
        .split("e+")
        .reduce(function (b, p) {
        // @ts-ignore
        return b + Array(p - b.length + 2).join(0);
    });
    if (n > 0) {
        // @ts-ignore
        str += "." + Array(n + 1).join(0);
    }
    return str;
}
/**
 * Convert a number to a 12 decimal fixed precision u128
 *
 * @param num Number to convert to a 12 decimal fixed precision BN
 * @returns
 */
function toU128(num) {
    if (bn_js_1.default.isBN(num)) {
        return num;
    }
    if (num == Infinity) {
        return new bn_js_1.default(0);
    }
    try {
        return new bn_js_1.default(toFixedSpecial(num, 12).replace(".", ""));
    }
    catch (e) {
        console.error(`Error converting ${num} to U128`);
        return new bn_js_1.default(0);
    }
}
exports.toU128 = toU128;
function toNumber(numberOrBn, mint) {
    if (bn_js_1.default.isBN(numberOrBn)) {
        return amountAsNum(numberOrBn, mint);
    }
    else {
        return numberOrBn;
    }
}
exports.toNumber = toNumber;
exports.toBN = spl_utils_1.toBN;
function amountAsNum(amount, mint) {
    const decimals = new spl_token_1.u64(Math.pow(10, mint.decimals).toString());
    const decimal = amount.mod(decimals).toNumber() / decimals.toNumber();
    return amount.div(decimals).toNumber() + decimal;
}
exports.amountAsNum = amountAsNum;
function supplyAsNum(mint) {
    return amountAsNum(mint.supply, mint);
}
exports.supplyAsNum = supplyAsNum;
function asDecimal(percent) {
    return percent / 4294967295; // uint32 max value
}
exports.asDecimal = asDecimal;
//# sourceMappingURL=utils.js.map