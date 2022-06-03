"use strict";
// @ts-nocheck
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSdk = exports.MessageType = void 0;
const anchor_1 = require("@project-serum/anchor");
const web3_js_1 = require("@solana/web3.js");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const chat_1 = require("./generated/chat");
// @ts-ignore
const uuid_1 = require("uuid");
const spl_token_1 = require("@solana/spl-token");
// @ts-ignore
const lit_js_sdk_1 = __importDefault(require("lit-js-sdk"));
// @ts-ignore
const bs58 = __importStar(require("bs58"));
const shdw_1 = require("./shdw");
__exportStar(require("./generated/chat"), exports);
const SYMM_KEY_ALGO_PARAMS = {
    name: "AES-CBC",
    length: 256,
};
function generateSymmetricKey() {
    return __awaiter(this, void 0, void 0, function* () {
        const symmKey = yield crypto.subtle.generateKey(SYMM_KEY_ALGO_PARAMS, true, [
            "encrypt",
            "decrypt",
        ]);
        return symmKey;
    });
}
var MessageType;
(function (MessageType) {
    MessageType["Text"] = "text";
    MessageType["Gify"] = "gify";
    MessageType["Image"] = "image";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function puff(str, len) {
    return str.padEnd(32, "\0");
}
function depuff(str) {
    return str.replace(new RegExp("\0", "g"), "");
}
class ChatSdk extends spl_utils_1.AnchorSdk {
    constructor(provider, program, litClient) {
        super({ provider, program });
        this.chatDecoder = (pubkey, account) => {
            const coded = this.program.coder.accounts.decode("ChatV0", account.data);
            return Object.assign(Object.assign({}, coded), { identifier: depuff(coded.identifier), name: depuff(coded.name), imageUrl: depuff(coded.imageUrl), metadataUrl: depuff(coded.metadataUrl), publicKey: pubkey });
        };
        this.profileDecoder = (pubkey, account) => {
            const coded = this.program.coder.accounts.decode("ProfileV0", account.data);
            return Object.assign(Object.assign({}, coded), { username: depuff(coded.username), imageUrl: depuff(coded.imageUrl), metadataUrl: depuff(coded.metadataUrl), publicKey: pubkey });
        };
        this.authingLit = null;
        // @ts-ignore
        if (provider.connection._rpcEndpoint.includes("dev")) {
            this.chain = "solanaDevnet";
        }
        else {
            this.chain = "solana";
        }
        this.litClient = litClient;
    }
    get isLitAuthed() {
        return Boolean(this.litAuthSig);
    }
    _litAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            this.litAuthSig = yield lit_js_sdk_1.default.checkAndSignAuthMessage({
                chain: this.chain,
                alertWhenUnauthorized: false,
            });
        });
    }
    litAuth() {
        return __awaiter(this, void 0, void 0, function* () {
            this.authingLit = this._litAuth();
            return this.authingLit;
        });
    }
    static init(provider, chatProgramId = ChatSdk.ID) {
        return __awaiter(this, void 0, void 0, function* () {
            const ChatIDLJson = yield anchor_1.Program.fetchIdl(chatProgramId, provider);
            const chat = new anchor_1.Program(ChatIDLJson, chatProgramId, provider);
            const client = new lit_js_sdk_1.default.LitNodeClient();
            yield client.connect();
            return new this(provider, chat, client);
        });
    }
    getChat(chatKey) {
        return this.getAccount(chatKey, this.chatDecoder);
    }
    getProfile(profileKey) {
        return this.getAccount(profileKey, this.profileDecoder);
    }
    getMessagesFromTx(txid) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const connection = this.provider.connection;
            const tx = yield connection.getTransaction(txid, {
                commitment: "confirmed",
            });
            if (!tx) {
                return [];
            }
            if ((_a = tx.meta) === null || _a === void 0 ? void 0 : _a.err) {
                return [];
            }
            const instructions = tx.transaction.message.instructions.filter((ix) => tx.transaction.message.accountKeys[ix.programIdIndex].equals(this.programId));
            const coder = this.program.coder.instruction;
            const sendMessageIdl = this.program.idl.instructions.find((i) => i.name === "sendMessageV0");
            const profileAccountIndex = sendMessageIdl.accounts.findIndex((account) => account.name === "profile");
            const chatAccountIndex = sendMessageIdl.accounts.findIndex((account) => account.name === "chat");
            const decoded = instructions
                .map((ix) => ({
                // @ts-ignore
                data: coder.decode(bs58.decode(ix.data)),
                profile: tx.transaction.message.accountKeys[ix.accounts[profileAccountIndex]],
                chat: tx.transaction.message.accountKeys[ix.accounts[chatAccountIndex]],
            }))
                .filter(spl_utils_1.truthy);
            return Promise.all(decoded
                .filter((decoded) => decoded.data.name === "sendMessageV0")
                .map((decoded) => __awaiter(this, void 0, void 0, function* () {
                const args = decoded.data.data.args;
                const chatAcc = yield this.getChat(decoded.chat);
                const readMint = yield (0, spl_utils_1.getMintInfo)(this.provider, chatAcc.readPermissionMint);
                let decodedMessage;
                if (args.encryptedSymmetricKey) {
                    yield this.authingLit;
                    if (!this.isLitAuthed &&
                        this.wallet &&
                        this.wallet.publicKey) {
                        yield this.litAuth();
                    }
                    const accessControlConditions = [
                        tokenAccessPermissions(chatAcc.readPermissionMint, (0, spl_utils_1.toBN)(args.readPermissionAmount, readMint), this.chain),
                    ];
                    try {
                        const symmetricKey = yield this.litClient.getEncryptionKey({
                            solRpcConditions: accessControlConditions,
                            // Note, below we convert the encryptedSymmetricKey from a UInt8Array to a hex string.  This is because we obtained the encryptedSymmetricKey from "saveEncryptionKey" which returns a UInt8Array.  But the getEncryptionKey method expects a hex string.
                            toDecrypt: args.encryptedSymmetricKey,
                            chain: this.chain,
                            authSig: this.litAuthSig,
                        });
                        const blob = new Blob([
                            lit_js_sdk_1.default.uint8arrayFromString(args.content, "base16"),
                        ]);
                        decodedMessage = JSON.parse(yield lit_js_sdk_1.default.decryptString(blob, symmetricKey));
                        decodedMessage.decryptedAttachments = [];
                        decodedMessage.decryptedAttachments.push(...(yield Promise.all((decodedMessage.encryptedAttachments || []).map((encryptedAttachment) => __awaiter(this, void 0, void 0, function* () {
                            const blob = yield fetch(encryptedAttachment).then((r) => r.blob());
                            const arrBuffer = yield lit_js_sdk_1.default.decryptFile({
                                symmetricKey,
                                file: blob,
                            });
                            return new Blob([arrBuffer]);
                        })))));
                    }
                    catch (e) {
                        console.error("Failed to decode message", e);
                    }
                }
                else {
                    decodedMessage = args.content;
                }
                return Object.assign(Object.assign({}, args), { txid, chatKey: decoded.chat, profileKey: decoded.profile, decodedMessage });
            })));
        });
    }
    static chatKey(identifier, programId = ChatSdk.ID) {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from("chat", "utf-8"),
            Buffer.from(puff(identifier.toLowerCase(), 32), "utf-8"),
        ], programId);
    }
    static delegateWalletKey(delegateWallet, programId = ChatSdk.ID) {
        return web3_js_1.PublicKey.findProgramAddress([Buffer.from("delegate-wallet", "utf-8"), delegateWallet.toBuffer()], programId);
    }
    static profileKey({ username, wallet, }, programId = ChatSdk.ID) {
        return web3_js_1.PublicKey.findProgramAddress([
            Buffer.from(username ? "username_profile" : "wallet_profile", "utf-8"),
            username ? Buffer.from(puff(username.toLowerCase(), 32)) : wallet.toBuffer(),
        ], programId);
    }
    initializeChatInstructions({ payer = this.wallet.publicKey, admin = this.wallet.publicKey, identifier, name, readPermissionMint, postPermissionMint, postPermissionAction = chat_1.PostAction.Hold, postPayDestination, postPermissionAmount = 1, defaultReadPermissionAmount = 1, imageUrl = "", metadataUrl = "", }) {
        return __awaiter(this, void 0, void 0, function* () {
            const chat = (yield ChatSdk.chatKey(identifier, this.programId))[0];
            const postMint = yield (0, spl_utils_1.getMintInfo)(this.provider, postPermissionMint);
            const readMint = yield (0, spl_utils_1.getMintInfo)(this.provider, readPermissionMint);
            const instruction = yield this.instruction.initializeChatV0({
                admin: admin,
                identifier,
                name,
                imageUrl: imageUrl,
                metadataUrl: metadataUrl,
                defaultReadPermissionAmount: (0, spl_utils_1.toBN)(defaultReadPermissionAmount, readMint),
                postPermissionMint,
                readPermissionMint,
                postPermissionAction: postPermissionAction,
                postPermissionAmount: (0, spl_utils_1.toBN)(postPermissionAmount, postMint),
                postPayDestination: postPayDestination || null,
            }, {
                accounts: {
                    payer,
                    chat,
                    systemProgram: web3_js_1.SystemProgram.programId,
                },
            });
            return {
                output: {
                    chat,
                },
                signers: [],
                instructions: [instruction],
            };
        });
    }
    initializeChat(args, commitment = "confirmed") {
        return __awaiter(this, void 0, void 0, function* () {
            return this.execute(this.initializeChatInstructions(args), args.payer, commitment);
        });
    }
    initializeProfileInstructions({ payer = this.wallet.publicKey, ownerWallet = this.wallet.publicKey, username, imageUrl = "", metadataUrl = "", }) {
        return __awaiter(this, void 0, void 0, function* () {
            const instructions = [];
            const usernameProfile = (yield ChatSdk.profileKey({ username }, this.programId))[0];
            const walletProfile = (yield ChatSdk.profileKey({ wallet: ownerWallet }, this.programId))[0];
            instructions.push(yield this.instruction.initializeProfileV0({
                username,
                imageUrl,
                metadataUrl,
            }, {
                accounts: {
                    payer,
                    usernameProfile,
                    walletProfile,
                    ownerWallet,
                    systemProgram: web3_js_1.SystemProgram.programId,
                },
            }));
            return {
                output: {
                    usernameProfile,
                    walletProfile,
                },
                instructions,
                signers: [],
            };
        });
    }
    initializeProfile(args, commitment = "confirmed") {
        return __awaiter(this, void 0, void 0, function* () {
            return this.execute(this.initializeProfileInstructions(args), args.payer, commitment);
        });
    }
    initializeDelegateWalletInstructions({ payer = this.wallet.publicKey, ownerWallet = this.wallet.publicKey, delegateWalletKeypair, delegateWallet, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!delegateWalletKeypair && !delegateWallet) {
                delegateWalletKeypair = web3_js_1.Keypair.generate();
            }
            if (!delegateWallet) {
                delegateWallet = delegateWalletKeypair.publicKey;
            }
            const delegateWalletAcc = (yield ChatSdk.delegateWalletKey(delegateWallet))[0];
            const instructions = [];
            const signers = [delegateWalletKeypair].filter(spl_utils_1.truthy);
            instructions.push(yield this.instruction.initializeDelegateWalletV0({
                accounts: {
                    delegateWallet: delegateWalletAcc,
                    payer,
                    owner: ownerWallet,
                    delegate: delegateWallet,
                    systemProgram: web3_js_1.SystemProgram.programId,
                },
            }));
            return {
                output: {
                    delegateWallet: delegateWalletAcc,
                    delegateWalletKeypair,
                },
                instructions,
                signers,
            };
        });
    }
    initializeDelegateWallet(args, commitment = "confirmed") {
        return __awaiter(this, void 0, void 0, function* () {
            return this.execute(this.initializeDelegateWalletInstructions(args), args.payer, commitment);
        });
    }
    sendMessageInstructions({ payer = this.wallet.publicKey, sender = this.wallet.publicKey, chat, message, readPermissionAmount, delegateWallet, delegateWalletKeypair, encrypted = true, }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (encrypted) {
                yield this.authingLit;
                yield this.litAuth();
            }
            let { fileAttachments } = message, normalMessage = __rest(message, ["fileAttachments"]);
            const chatAcc = (yield this.getChat(chat));
            const readMint = yield (0, spl_utils_1.getMintInfo)(this.provider, chatAcc.readPermissionMint);
            const accessControlConditionsToUse = [
                tokenAccessPermissions(chatAcc.readPermissionMint, (0, spl_utils_1.toBN)(readPermissionAmount || chatAcc.defaultReadPermissionAmount, readMint), this.chain),
            ];
            const symmKey = yield generateSymmetricKey();
            // Encrypt fileAttachements if needed
            if (fileAttachments && encrypted) {
                fileAttachments = yield Promise.all(fileAttachments.map((fileAttachment) => __awaiter(this, void 0, void 0, function* () {
                    const encrypted = yield lit_js_sdk_1.default.encryptWithSymmetricKey(symmKey, yield fileAttachment.arrayBuffer());
                    return new File([encrypted], fileAttachment.name + ".encrypted");
                })));
            }
            // Attach files to either attachments or encryptedAttachments based on whether they were encrypted
            if (fileAttachments) {
                let attachments;
                if (encrypted) {
                    normalMessage.encryptedAttachments =
                        normalMessage.encryptedAttachments || [];
                    attachments = normalMessage.encryptedAttachments;
                }
                else {
                    normalMessage.attachments = normalMessage.attachments || [];
                    attachments = normalMessage.attachments;
                }
                attachments.push(...(yield Promise.all(fileAttachments.map((fileAttachment) => __awaiter(this, void 0, void 0, function* () {
                    return yield (0, shdw_1.uploadFile)(this.provider, fileAttachment, delegateWalletKeypair);
                })))).filter(spl_utils_1.truthy));
            }
            // Encrypt the actual json structure
            let encryptedSymmetricKey, encryptedString;
            if (encrypted) {
                const encryptedStringOut = yield lit_js_sdk_1.default.encryptWithSymmetricKey(symmKey, lit_js_sdk_1.default.uint8arrayFromString(JSON.stringify(normalMessage)));
                encryptedString = buf2hex(yield encryptedStringOut.arrayBuffer());
                encryptedSymmetricKey = lit_js_sdk_1.default.uint8arrayToString(yield this.litClient.saveEncryptionKey({
                    solRpcConditions: accessControlConditionsToUse,
                    symmetricKey: new Uint8Array(yield crypto.subtle.exportKey("raw", symmKey)),
                    authSig: this.litAuthSig,
                    chain: this.chain,
                }), "base16");
            }
            else {
                encryptedSymmetricKey = "";
                encryptedString = JSON.stringify(message);
            }
            const instructions = [];
            const profile = (yield ChatSdk.profileKey({ wallet: sender }, this.programId))[0];
            const profileAcc = (yield this.getProfile(profile));
            const postPermissionAccount = yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, chatAcc.postPermissionMint, profileAcc.ownerWallet, true);
            const remainingAccounts = [];
            if (delegateWallet || delegateWalletKeypair) {
                if (!delegateWallet) {
                    delegateWallet = delegateWalletKeypair.publicKey;
                }
                remainingAccounts.push({
                    pubkey: (yield ChatSdk.delegateWalletKey(delegateWallet, this.programId))[0],
                    isWritable: false,
                    isSigner: false,
                });
            }
            const senderToUse = delegateWallet || sender;
            instructions.push(yield this.instruction.sendMessageV0({
                id: (0, uuid_1.v4)(),
                content: encryptedString,
                encryptedSymmetricKey,
                readPermissionAmount: (0, spl_utils_1.toBN)(readPermissionAmount || chatAcc.defaultReadPermissionAmount, readMint),
                nextId: null,
            }, {
                accounts: {
                    payer,
                    chat,
                    sender: senderToUse,
                    profile,
                    postPermissionAccount,
                    postPermissionMint: chatAcc.postPermissionMint,
                    tokenProgram: spl_token_1.TOKEN_PROGRAM_ID,
                },
                remainingAccounts,
            }));
            return {
                instructions,
                output: null,
                signers: [delegateWalletKeypair].filter(spl_utils_1.truthy),
            };
        });
    }
    sendMessage(args, commitment = "confirmed") {
        return __awaiter(this, void 0, void 0, function* () {
            return this.execute(this.sendMessageInstructions(args), args.payer, commitment);
        });
    }
}
exports.ChatSdk = ChatSdk;
ChatSdk.ID = new web3_js_1.PublicKey("chatGL6yNgZT2Z3BeMYGcgdMpcBKdmxko4C5UhEX4To");
function tokenAccessPermissions(readPermissionMint, threshold, chain) {
    return {
        method: "getTokenAccountsByOwner",
        params: [
            ":userAddress",
            {
                programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
            },
            {
                encoding: "jsonParsed",
            },
        ],
        chain,
        returnValueTest: {
            key: `$[?(@.account.data.parsed.info.mint == "${readPermissionMint.toBase58()}")].account.data.parsed.info.tokenAmount.amount`,
            comparator: ">=",
            value: threshold.toString(10),
        },
    };
}
function buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return [...new Uint8Array(buffer)]
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}
//# sourceMappingURL=index.js.map