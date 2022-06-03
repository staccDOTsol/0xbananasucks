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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chat_1 = require("@strata-foundation/chat");
const anchor = __importStar(require("@project-serum/anchor"));
const web3_js_1 = require("@solana/web3.js");
// @ts-ignore
const lit_js_sdk_1 = __importDefault(require("lit-js-sdk"));
const anchor_1 = require("@project-serum/anchor");
const args = process.argv;
setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log(process.env.ANCHOR_PROVIDER_URL);
    anchor.setProvider(anchor.Provider.env());
    const provider = anchor.getProvider();
    const ChatIDLJson = yield anchor_1.Program.fetchIdl(chat_1.ChatSdk.ID, provider);
    const chat = new anchor_1.Program(ChatIDLJson, chat_1.ChatSdk.ID, provider);
    const client = new lit_js_sdk_1.default.LitNodeClient();
    const chatSdk = new chat_1.ChatSdk(provider, chat, client);
    yield chatSdk.initializeChat({
        identifier: 'burnit',
        name: 'burnit',
        readPermissionMint: new web3_js_1.PublicKey("openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"),
        postPermissionMint: new web3_js_1.PublicKey("openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"),
        imageUrl: "https://raw.githubusercontent.com/dyor-market/token-list/main/assets/mainnet/D3gRmoveMFa8e3ziw5XCwCByHKiSk76T4fi62GXNYXHi/logo.png",
        postPermissionAction: chat_1.PostAction.Burn,
        postPermissionAmount: 1.38
    });
}), 1);
//# sourceMappingURL=createChat.js.map