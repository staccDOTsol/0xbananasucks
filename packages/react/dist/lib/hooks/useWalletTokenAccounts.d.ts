/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
/// <reference types="@solana/wallet-adapter-react/node_modules/@solana/web3.js" />
/// <reference types="@solana/spl-governance/node_modules/@solana/web3.js" />
import { PublicKey } from "@solana/web3.js";
/**
 * Get all token accounts associated with this wallet
 * @param owner
 * @returns
 */
export declare const useWalletTokenAccounts: (owner?: PublicKey | undefined) => import("react-async-hook").UseAsyncReturn<import("../utils").TokenAccount[], [connection: import("@solana/web3.js").Connection, owner?: PublicKey | undefined]>;
//# sourceMappingURL=useWalletTokenAccounts.d.ts.map