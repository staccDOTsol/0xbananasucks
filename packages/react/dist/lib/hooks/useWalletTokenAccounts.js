"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useWalletTokenAccounts = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const react_async_hook_1 = require("react-async-hook");
const utils_1 = require("../utils");
/**
 * Get all token accounts associated with this wallet
 * @param owner
 * @returns
 */
const useWalletTokenAccounts = (owner) => {
    const { connection } = (0, wallet_adapter_react_1.useConnection)();
    return (0, react_async_hook_1.useAsync)(utils_1.getWalletTokenAccounts, [connection, owner]);
};
exports.useWalletTokenAccounts = useWalletTokenAccounts;
//# sourceMappingURL=useWalletTokenAccounts.js.map