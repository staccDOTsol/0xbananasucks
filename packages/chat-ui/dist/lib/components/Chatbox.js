"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chatbox = void 0;
const react_1 = require("@chakra-ui/react");
const web3_js_1 = require("@solana/web3.js");
const chat_1 = require("@strata-foundation/chat");
const react_2 = require("@strata-foundation/react");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const react_3 = __importStar(require("react"));
const ai_1 = require("react-icons/ai");
const contexts_1 = require("../contexts");
const hooks_1 = require("../hooks");
const useDelegateWallet_1 = require("../hooks/useDelegateWallet");
const BuyMoreButton_1 = require("./BuyMoreButton");
const FileAttachment_1 = require("./FileAttachment");
const GifSearch_1 = require("./GifSearch");
function Chatbox({ scrollRef, chatKey, onAddPendingMessage, }) {
    const [input, setInput] = (0, react_3.useState)("");
    const { isOpen, onToggle, onClose } = (0, react_1.useDisclosure)();
    const handleChange = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInput(e.target.value);
    };
    const { chatSdk } = (0, contexts_1.useChatSdk)();
    const delegateWalletKeypair = (0, useDelegateWallet_1.useDelegateWallet)();
    const [error, setError] = (0, react_3.useState)();
    const { handleErrors } = (0, react_2.useErrorHandler)();
    const { info: chat } = (0, hooks_1.useChat)(chatKey);
    const balance = (0, react_2.useOwnedAmount)(chat === null || chat === void 0 ? void 0 : chat.postPermissionMint);
    const mint = (0, react_2.useMint)(chat === null || chat === void 0 ? void 0 : chat.postPermissionMint);
    const postAmount = (chat === null || chat === void 0 ? void 0 : chat.postPermissionAmount) &&
        mint &&
        (0, spl_token_bonding_1.toNumber)(chat === null || chat === void 0 ? void 0 : chat.postPermissionAmount, mint);
    const hasEnough = typeof postAmount == "undefined" || typeof balance == "undefined" || (balance >= postAmount);
    handleErrors(error);
    /*get uid and phoroURL from current User then send message
    and set chat state to "", then scroll to latst message
    */
    const sendMessage = (message) => __awaiter(this, void 0, void 0, function* () {
        if (delegateWalletKeypair) {
            if (chatSdk && chatKey) {
                setInput("");
                const { instructions, signers } = yield chatSdk.sendMessageInstructions({
                    delegateWalletKeypair,
                    payer: delegateWalletKeypair.publicKey,
                    chat: chatKey,
                    message,
                    encrypted: true,
                });
                let tx = new web3_js_1.Transaction();
                tx.recentBlockhash = (yield chatSdk.provider.connection.getRecentBlockhash()).blockhash;
                tx.feePayer = delegateWalletKeypair.publicKey;
                tx.add(...instructions);
                tx.sign(...signers);
                const rawTx = tx.serialize();
                const txid = yield chatSdk.provider.connection.sendRawTransaction(rawTx, {
                    skipPreflight: true,
                });
                if (onAddPendingMessage) {
                    const { fileAttachments } = message, rest = __rest(message, ["fileAttachments"]);
                    onAddPendingMessage({ content: Object.assign(Object.assign({}, rest), { decryptedAttachments: fileAttachments }), txid, chatKey });
                }
                scrollRef.current.scrollIntoView({ behavior: "smooth" });
                yield (0, spl_utils_1.sendAndConfirmWithRetry)(chatSdk.provider.connection, rawTx, {
                    skipPreflight: true,
                }, "confirmed");
            }
        }
    });
    return hasEnough ? (react_3.default.createElement(react_3.default.Fragment, null,
        react_3.default.createElement(react_1.Flex, { direction: "row", position: "sticky", bottom: 0 },
            react_3.default.createElement(react_1.HStack, { p: "10px", spacing: 2, w: "full", align: "stretch" },
                hasEnough && (react_3.default.createElement(react_1.Input, { onKeyPress: (ev) => {
                        if (ev.key === "Enter") {
                            if (ev.shiftKey) {
                                ev.preventDefault();
                                setInput((i) => `${i}\n`);
                            }
                            else {
                                ev.preventDefault();
                                sendMessage({
                                    type: chat_1.MessageType.Text,
                                    text: input,
                                });
                            }
                        }
                    }, size: "lg", value: input, onChange: handleChange, placeholder: "Type Message" })),
                react_3.default.createElement(FileAttachment_1.FileAttachment, { onUpload: (file) => __awaiter(this, void 0, void 0, function* () {
                        yield sendMessage({
                            type: chat_1.MessageType.Image,
                            fileAttachments: [file]
                        });
                    }) }),
                react_3.default.createElement(react_1.IconButton, { size: "lg", "aria-label": "Select GIF", variant: "outline", onClick: onToggle, icon: react_3.default.createElement(react_1.Icon, { w: "24px", h: "24px", as: ai_1.AiOutlineGif }) }),
                react_3.default.createElement(react_1.Button, { colorScheme: "primary", variant: "outline", alignSelf: "flex-end", isDisabled: !hasEnough || !input, size: "lg", onClick: () => sendMessage({
                        type: chat_1.MessageType.Text,
                        text: input,
                    }) },
                    react_3.default.createElement(react_1.Icon, { as: ai_1.AiOutlineSend })))),
        react_3.default.createElement(react_1.Modal, { isOpen: isOpen, onClose: onClose, size: "2xl", isCentered: true, trapFocus: true },
            react_3.default.createElement(react_1.ModalContent, { borderRadius: "xl", shadow: "xl" },
                react_3.default.createElement(react_1.ModalHeader, null, "Select GIF"),
                react_3.default.createElement(react_1.ModalBody, null,
                    react_3.default.createElement(GifSearch_1.GifSearch, { onSelect: (gifyId) => {
                            onClose();
                            sendMessage({ type: chat_1.MessageType.Gify, gifyId });
                        } })))))) : (react_3.default.createElement(react_1.Flex, { justify: "center", mb: "6px" },
        react_3.default.createElement(BuyMoreButton_1.BuyMoreButton, { mint: chat === null || chat === void 0 ? void 0 : chat.postPermissionMint })));
}
exports.Chatbox = Chatbox;
//# sourceMappingURL=Chatbox.js.map