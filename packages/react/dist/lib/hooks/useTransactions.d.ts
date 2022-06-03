import { PublicKey, TransactionResponse } from "@solana/web3.js";
declare type TransactionResponseWithSig = TransactionResponse & {
    signature: string;
};
interface ITransactions {
    error: Error | undefined;
    loadingInitial: boolean;
    loadingMore: boolean;
    transactions: TransactionResponseWithSig[];
    fetchMore(num: number): void;
    fetchNew(num: number): void;
}
export declare const useTransactions: ({ numTransactions, until, address, subscribe }: {
    numTransactions: number;
    until?: Date | undefined;
    address?: PublicKey | undefined;
    subscribe?: boolean | undefined;
}) => ITransactions;
export {};
//# sourceMappingURL=useTransactions.d.ts.map