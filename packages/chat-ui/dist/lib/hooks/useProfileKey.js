"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useProfileKey = void 0;
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const react_async_hook_1 = require("react-async-hook");
function useProfileKey(args) {
    var _a;
    const { result, loading } = (0, react_async_hook_1.useAsync)((wallet, username) => chat_1.ChatSdk.profileKey({
        wallet: wallet ? new web3_js_1.PublicKey(wallet) : undefined,
        username,
    }), [(_a = args.wallet) === null || _a === void 0 ? void 0 : _a.toBase58(), args.username]);
    return {
        loading: loading,
        key: result ? result[0] : undefined
    };
}
exports.useProfileKey = useProfileKey;
//# sourceMappingURL=useProfileKey.js.map