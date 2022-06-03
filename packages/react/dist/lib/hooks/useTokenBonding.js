"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenBonding = void 0;
const _1 = require(".");
const useTokenBonding = (tokenBonding) => {
    const { tokenBondingSdk } = (0, _1.useStrataSdks)();
    return (0, _1.useAccount)(tokenBonding, tokenBondingSdk === null || tokenBondingSdk === void 0 ? void 0 : tokenBondingSdk.tokenBondingDecoder);
};
exports.useTokenBonding = useTokenBonding;
//# sourceMappingURL=useTokenBonding.js.map