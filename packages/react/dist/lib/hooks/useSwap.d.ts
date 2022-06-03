import { ISwapArgs, ITokenBonding } from "@strata-foundation/spl-token-bonding";
import { InstructionResult } from "@strata-foundation/spl-utils";
import { BN } from "@project-serum/anchor";
export declare type SwapArgs = {
    extraInstructions?: (args: {
        tokenBonding: ITokenBonding;
        isBuy: boolean;
        amount: BN | undefined;
    }) => Promise<InstructionResult<null>>;
};
export declare const useSwap: (swapArgs?: SwapArgs) => {
    execute: (args: ISwapArgs) => Promise<{
        targetAmount: number;
    }>;
    data: {
        targetAmount: number;
    } | undefined;
    loading: boolean;
    error: Error | undefined;
};
//# sourceMappingURL=useSwap.d.ts.map