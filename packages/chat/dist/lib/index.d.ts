import { BN, IdlTypes, Program, Provider } from "@project-serum/anchor";
import { Commitment, Keypair, PublicKey } from "@solana/web3.js";
import { AnchorSdk, InstructionResult, TypedAccountParser } from "@strata-foundation/spl-utils";
import { ChatIDL, ChatV0, PostAction, ProfileV0 } from "./generated/chat";
import LitJsSdk from "lit-js-sdk";
export * from "./generated/chat";
export declare enum MessageType {
    Text = "text",
    Gify = "gify",
    Image = "image"
}
export interface IMessageContent {
    type: MessageType;
    text?: string;
    attachments?: string[];
    encryptedAttachments?: string[];
    gifyId?: string;
}
export interface IDecryptedMessageContent extends IMessageContent {
    decryptedAttachments?: Blob[];
}
export interface ISendMessageContent extends IMessageContent {
    fileAttachments?: File[];
}
export interface IChat extends ChatV0 {
    publicKey: PublicKey;
}
export interface IProfile extends ProfileV0 {
    publicKey: PublicKey;
}
declare type MessageV0 = IdlTypes<ChatIDL>["MessageV0"];
export interface IMessage extends MessageV0 {
    txid: string;
    /** Decoded message, if permissions were enough to decode it */
    decodedMessage?: IDecryptedMessageContent;
    profileKey: PublicKey;
    chatKey: PublicKey;
}
export interface InitializeChatArgs {
    payer?: PublicKey;
    /** The admin of this chat instance. **Default:** This wallet */
    admin?: PublicKey;
    /** The unique shortname of the chat. Must be alphanumeric. */
    identifier: string;
    /** Human readable name for the chat */
    name: string;
    /** The mint you need to read this chat */
    readPermissionMint: PublicKey;
    /** The mint you need to post to this chat */
    postPermissionMint: PublicKey;
    /** The number of tokens needed to post to this chat. **Default:** 1 */
    postPermissionAmount?: number | BN;
    /** The action to take when posting. **Default:** hold */
    postPermissionAction?: PostAction;
    /** Amount of read permission mint required to read this chat by default. **Default:** 1 */
    defaultReadPermissionAmount?: any;
    /** The destination to pay to on post */
    postPayDestination?: PublicKey;
    imageUrl?: string;
    metadataUrl?: string;
}
export interface InitializeProfileArgs {
    payer?: PublicKey;
    /** The owner of this profile. **Default:** the current wallet */
    ownerWallet?: PublicKey;
    /** The unique shortname of the user. Must be alphanumeric. */
    username: string;
    imageUrl?: string;
    metadataUrl?: string;
}
export interface InitializeDelegateWalletArgs {
    payer?: PublicKey;
    /** The owning wallet of the delegate. **Default:** the current wallet */
    ownerWallet?: PublicKey;
    /** The delegate wallet to use. **Default:** from keypair */
    delegateWallet?: PublicKey;
    /** The delegate keypair. **Default:** Generate one */
    delegateWalletKeypair?: Keypair;
}
export interface SendMessageArgs {
    payer?: PublicKey;
    /** The chat to send to */
    chat: PublicKey;
    /** The message to send */
    message: ISendMessageContent;
    /** The amount of tokens needed to read. **Default:** from chat */
    readPermissionAmount?: number;
    /** Lit protocol conditions, **Default:** The chatroom default */
    accessControlConditions?: any;
    /** If using a delegate wallet, will send and sign. **Defualt:** delegateWalletKeypair.publicKey */
    delegateWallet?: PublicKey;
    /** If using a delegate wallet, will send and sign */
    delegateWalletKeypair?: Keypair;
    /** The ownerWallet of the sender. **Default:** this wallet*/
    sender?: PublicKey;
    /** Should we encrypt this message using lit protocol? */
    encrypted?: boolean;
}
export declare class ChatSdk extends AnchorSdk<ChatIDL> {
    litClient: LitJsSdk;
    litAuthSig: any | undefined;
    chain: string;
    authingLit: Promise<void> | null;
    static ID: PublicKey;
    get isLitAuthed(): boolean;
    _litAuth(): Promise<void>;
    litAuth(): Promise<void>;
    static init(provider: Provider, chatProgramId?: PublicKey): Promise<ChatSdk>;
    constructor(provider: Provider, program: Program<ChatIDL>, litClient: LitJsSdk);
    chatDecoder: TypedAccountParser<IChat>;
    profileDecoder: TypedAccountParser<IProfile>;
    getChat(chatKey: PublicKey): Promise<IChat | null>;
    getProfile(profileKey: PublicKey): Promise<IProfile | null>;
    getMessagesFromTx(txid: string): Promise<IMessage[]>;
    static chatKey(identifier: string, programId?: PublicKey): Promise<[PublicKey, number]>;
    static delegateWalletKey(delegateWallet: PublicKey, programId?: PublicKey): Promise<[PublicKey, number]>;
    static profileKey({ username, wallet, }: {
        username?: string;
        wallet?: PublicKey;
    }, programId?: PublicKey): Promise<[PublicKey, number]>;
    initializeChatInstructions({ payer, admin, identifier, name, readPermissionMint, postPermissionMint, postPermissionAction, postPayDestination, postPermissionAmount, defaultReadPermissionAmount, imageUrl, metadataUrl, }: InitializeChatArgs): Promise<InstructionResult<{
        chat: PublicKey;
    }>>;
    initializeChat(args: InitializeChatArgs, commitment?: Commitment): Promise<{
        chat: PublicKey;
    }>;
    initializeProfileInstructions({ payer, ownerWallet, username, imageUrl, metadataUrl, }: InitializeProfileArgs): Promise<InstructionResult<{
        usernameProfile: PublicKey;
        walletProfile: PublicKey;
    }>>;
    initializeProfile(args: InitializeProfileArgs, commitment?: Commitment): Promise<{
        usernameProfile: PublicKey;
        walletProfile: PublicKey;
    }>;
    initializeDelegateWalletInstructions({ payer, ownerWallet, delegateWalletKeypair, delegateWallet, }: InitializeDelegateWalletArgs): Promise<InstructionResult<{
        delegateWallet: PublicKey;
        delegateWalletKeypair?: Keypair;
    }>>;
    initializeDelegateWallet(args: InitializeProfileArgs, commitment?: Commitment): Promise<{
        delegateWallet: PublicKey;
        delegateWalletKeypair?: Keypair;
    }>;
    sendMessageInstructions({ payer, sender, chat, message, readPermissionAmount, delegateWallet, delegateWalletKeypair, encrypted, }: SendMessageArgs): Promise<InstructionResult<null>>;
    sendMessage(args: SendMessageArgs, commitment?: Commitment): Promise<{
        txid?: string;
    }>;
}
//# sourceMappingURL=index.d.ts.map