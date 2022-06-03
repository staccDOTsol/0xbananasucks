import { Provider } from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
import { BondingHierarchy, ISwapArgs } from "@strata-foundation/spl-token-bonding";
import { ISwapFormProps } from "../components/Swap/SwapForm";
export interface ISwapDriverArgs extends Pick<ISwapFormProps, "onConnectWallet" | "extraTransactionInfo"> {
    tokenBondingKey: PublicKey | undefined;
    tradingMints: {
        base?: PublicKey;
        target?: PublicKey;
    };
    onTradingMintsChange(mints: {
        base: PublicKey;
        target: PublicKey;
    }): void;
    swap(args: ISwapArgs & {
        ticker: string;
    }): void;
}
export declare function getMissingSpace(provider: Provider | undefined, hierarchy: BondingHierarchy | undefined, baseMint: PublicKey | undefined, targetMint: PublicKey | undefined): Promise<number>;
export declare const useSwapDriver: ({ onConnectWallet, tokenBondingKey, tradingMints, onTradingMintsChange, swap, extraTransactionInfo, }: ISwapDriverArgs) => Omit<ISwapFormProps, "isSubmitting"> & {
    loading: boolean;
};
//# sourceMappingURL=useSwapDriver.d.ts.map