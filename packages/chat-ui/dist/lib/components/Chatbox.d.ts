import { PublicKey } from "@solana/web3.js";
import { IDecryptedMessageContent } from "@strata-foundation/chat";
export interface IPendingMessage {
    content: IDecryptedMessageContent;
    txid: string;
    chatKey?: PublicKey;
}
export declare type chatProps = {
    onAddPendingMessage?: (message: IPendingMessage) => void;
    chatKey?: PublicKey;
    scrollRef?: any;
};
export declare function Chatbox({ scrollRef, chatKey, onAddPendingMessage, }: chatProps): JSX.Element;
//# sourceMappingURL=Chatbox.d.ts.map