"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDelegateWallet = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const web3_js_1 = require("@solana/web3.js");
const react_1 = require("@strata-foundation/react");
const react_2 = require("react");
function useDelegateWallet() {
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const [delegateData] = (0, react_1.useLocalStorage)("delegateWallet", undefined);
    const delegateWallet = (0, react_2.useMemo)(() => {
        if (delegateData && publicKey) {
            try {
                return JSON.parse(localStorage.delegateWallet)[publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58()];
            }
            catch (e) {
                // ignore
                console.error(e);
            }
        }
    }, [delegateData, publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58()]);
    const delegateWalletKeypair = (0, react_2.useMemo)(() => delegateWallet && web3_js_1.Keypair.fromSecretKey(new Uint8Array(delegateWallet)), [delegateWallet]);
    return delegateWalletKeypair;
}
exports.useDelegateWallet = useDelegateWallet;
//# sourceMappingURL=useDelegateWallet.js.map