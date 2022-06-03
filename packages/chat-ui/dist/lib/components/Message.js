"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const react_1 = require("@chakra-ui/react");
const js_fetch_api_1 = require("@giphy/js-fetch-api");
const react_components_1 = require("@giphy/react-components");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const chat_1 = require("@strata-foundation/chat");
const react_2 = require("@strata-foundation/react");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const react_3 = __importDefault(require("react"));
const react_async_hook_1 = require("react-async-hook");
const bs_1 = require("react-icons/bs");
const constants_1 = require("../constants");
const hooks_1 = require("../hooks");
const BuyMoreButton_1 = require("./BuyMoreButton");
const gf = new js_fetch_api_1.GiphyFetch(constants_1.GIPHY_API_KEY);
function fetchGif(gifyId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (gifyId) {
            const { data } = yield gf.gif(gifyId);
            return data;
        }
    });
}
function GifyGif({ gifyId }) {
    const { result: data, loading } = (0, react_async_hook_1.useAsync)(fetchGif, [gifyId]);
    if (loading || !data) {
        return react_3.default.createElement(react_1.Skeleton, { w: "300px", h: "300px" });
    }
    return react_3.default.createElement(react_components_1.Gif, { gif: data, width: 300 });
}
function Message({ decodedMessage, profileKey, readPermissionAmount, chatKey, pending = false, }) {
    const { colorMode } = (0, react_1.useColorMode)();
    const { publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { info: profile } = (0, hooks_1.useProfile)(profileKey);
    const id = profile === null || profile === void 0 ? void 0 : profile.ownerWallet.toBase58();
    const { info: chat } = (0, hooks_1.useChat)(chatKey);
    const readMint = chat === null || chat === void 0 ? void 0 : chat.readPermissionMint;
    const readMintAcc = (0, react_2.useMint)(readMint);
    const uid = publicKey === null || publicKey === void 0 ? void 0 : publicKey.toBase58();
    const status = pending ? "Pending" : "Confirmed";
    const redColor = (0, react_1.useColorModeValue)("red.600", "red.400");
    const message = decodedMessage;
    const usernameColor = { light: "green.500", dark: "green.200" };
    const textColor = { light: "black", dark: "white" };
    return (react_3.default.createElement(react_1.HStack, { w: "full", align: "start", spacing: 2 },
        react_3.default.createElement(react_1.Avatar, { mt: "6px", size: "sm", src: profile === null || profile === void 0 ? void 0 : profile.imageUrl }),
        react_3.default.createElement(react_1.VStack, { w: "full", align: "start", spacing: 0 },
            react_3.default.createElement(react_1.Text, { fontSize: "sm", fontWeight: "semibold", color: uid == id ? "blue.500" : usernameColor[colorMode] }, profile === null || profile === void 0 ? void 0 : profile.username),
            react_3.default.createElement(react_1.Box, { w: "fit-content", position: "relative", textAlign: "left", wordBreak: "break-word", color: textColor[colorMode] }, message ? (message.type === chat_1.MessageType.Gify ? (react_3.default.createElement(GifyGif, { gifyId: message.gifyId })) : message.type === chat_1.MessageType.Image ? (react_3.default.createElement(react_1.Image, { mt: "4px", alt: message.text, height: "300px", src: (message.attachments || [])[0] || blobToUrl((message.decryptedAttachments || [])[0]) })) : (react_3.default.createElement(react_1.Text, { mt: "-4px" }, message.text))) : (react_3.default.createElement(react_3.default.Fragment, null,
                react_3.default.createElement(react_1.Text, { color: redColor, fontStyle: "italic", mb: 2 }, readPermissionAmount && readMintAcc
                    ? `You need at least ${(0, react_2.roundToDecimals)((0, spl_token_bonding_1.toNumber)(readPermissionAmount, readMintAcc), readMintAcc.decimals)} tokens to read this message.`
                    : "You do not have enough tokens to read this message."),
                react_3.default.createElement(BuyMoreButton_1.BuyMoreButton, { mint: readMint }))))),
        react_3.default.createElement(react_1.Icon, { alignSelf: "center", w: "12px", h: "12px", as: pending ? bs_1.BsCircle : bs_1.BsCheckCircleFill, color: "gray", title: status })));
}
exports.Message = Message;
function blobToUrl(blob) {
    if (blob) {
        const urlCreator = window.URL || window.webkitURL;
        return urlCreator.createObjectURL(blob);
    }
}
//# sourceMappingURL=Message.js.map