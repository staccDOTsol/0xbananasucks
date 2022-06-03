"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletProfile = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const useProfile_1 = require("./useProfile");
const useProfileKey_1 = require("./useProfileKey");
function useWalletProfile() {
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { key: profileKey, loading } = (0, useProfileKey_1.useProfileKey)({ wallet: publicKey || undefined });
    const profile = (0, useProfile_1.useProfile)(profileKey);
    return Object.assign(Object.assign({}, profile), { loading: profile.loading || loading });
}
exports.useWalletProfile = useWalletProfile;
//# sourceMappingURL=useWalletProfile.js.map