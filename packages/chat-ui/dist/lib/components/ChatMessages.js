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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatMessages = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importStar(require("react"));
const Message_1 = require("./Message");
const hooks_1 = require("../hooks");
function ChatMessages({ scrollRef, messages, pendingMessages, }) {
    const { info: profile } = (0, hooks_1.useWalletProfile)();
    (0, react_2.useEffect)(() => {
        if (messages)
            scrollRef.current.scrollIntoView();
    }, [messages]);
    return (react_2.default.createElement(react_1.VStack, { grow: "1", align: "start", overflowY: "scroll", spacing: 2, h: "full", p: "10px" }, messages === null || messages === void 0 ? void 0 :
        messages.map((msg) => (react_2.default.createElement(Message_1.Message, Object.assign({ key: msg === null || msg === void 0 ? void 0 : msg.id }, msg)))), pendingMessages === null || pendingMessages === void 0 ? void 0 :
        pendingMessages.map((msg, index) => (react_2.default.createElement(Message_1.Message, { key: (msg === null || msg === void 0 ? void 0 : msg.txid) + index, profileKey: profile === null || profile === void 0 ? void 0 : profile.publicKey, txid: msg.txid, decodedMessage: msg.content, pending: true }))),
        react_2.default.createElement("div", { ref: scrollRef })));
}
exports.ChatMessages = ChatMessages;
//# sourceMappingURL=ChatMessages.js.map