"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenAccount = void 0;
const _1 = require(".");
const utils_1 = require("../utils");
const parser = (pubkey, acct) => {
    var _a;
    return (_a = (0, utils_1.TokenAccountParser)(pubkey, acct)) === null || _a === void 0 ? void 0 : _a.info;
};
function useTokenAccount(address) {
    return (0, _1.useAccount)(address, parser);
}
exports.useTokenAccount = useTokenAccount;
//# sourceMappingURL=useTokenAccount.js.map