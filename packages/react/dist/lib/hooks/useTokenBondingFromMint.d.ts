import { PublicKey } from "@solana/web3.js";
import { ITokenBonding } from "@strata-foundation/spl-token-bonding";
import { UseAccountState } from "./";
export declare function useTokenBondingFromMint(mint: PublicKey | undefined | null, index?: number): UseAccountState<ITokenBonding> & {
    error?: Error;
};
//# sourceMappingURL=useTokenBondingFromMint.d.ts.map