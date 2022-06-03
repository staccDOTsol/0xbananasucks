"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSolanaUnixTime = void 0;
const web3_js_1 = require("@solana/web3.js");
const useAccount_1 = require("./useAccount");
function useSolanaUnixTime() {
    const { info: currentTime } = (0, useAccount_1.useAccount)(web3_js_1.SYSVAR_CLOCK_PUBKEY, (_, data) => {
        const unixTime = data.data.readBigInt64LE(8 * 4);
        return unixTime;
    });
    return Number(currentTime);
}
exports.useSolanaUnixTime = useSolanaUnixTime;
//# sourceMappingURL=useSolanaUnixTime.js.map