import { PublicKey } from "@solana/web3.js";
import { IMessage } from "@strata-foundation/chat";
interface IUseMessages {
    error: Error | undefined;
    loadingInitial: boolean;
    loadingMore: boolean;
    messages: IMessage[] | undefined;
    fetchMore(num: number): void;
    fetchNew(num: number): void;
}
export declare function useMessages(chat: PublicKey | undefined): IUseMessages;
export {};
//# sourceMappingURL=useMessages.d.ts.map