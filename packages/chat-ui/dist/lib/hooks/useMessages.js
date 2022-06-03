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
exports.useMessages = void 0;
const react_1 = require("@strata-foundation/react");
const react_2 = require("react");
const react_async_hook_1 = require("react-async-hook");
const contexts_1 = require("../contexts");
const seen = {};
function getMessages(chatSdk, signatures) {
    return __awaiter(this, void 0, void 0, function* () {
        if (chatSdk && signatures) {
            return (yield Promise.all(signatures.map((sig) => __awaiter(this, void 0, void 0, function* () {
                if (seen[sig]) {
                    return seen[sig];
                }
                const found = yield chatSdk.getMessagesFromTx(sig);
                seen[sig] = found;
                return found;
            })))).flat();
        }
        return [];
    });
}
function useMessages(chat) {
    const { chatSdk } = (0, contexts_1.useChatSdk)();
    const _a = (0, react_1.useTransactions)({
        address: chat,
        numTransactions: 50,
        subscribe: true
    }), { transactions } = _a, rest = __rest(_a, ["transactions"]);
    // For a stable messages array that doesn't go undefined when we do the next
    // useAsync fetch
    const [messagesStable, setMessagesStable] = (0, react_2.useState)();
    const signatures = (0, react_2.useMemo)(() => transactions.map(t => t.signature).reverse(), [transactions]);
    const { result: messages, loading, error } = (0, react_async_hook_1.useAsync)(getMessages, [chatSdk, signatures]);
    (0, react_2.useEffect)(() => {
        if (messages) {
            setMessagesStable(messages);
        }
    }, [messages]);
    return Object.assign(Object.assign({}, rest), { loadingInitial: rest.loadingInitial || loading, error: rest.error || error, messages: messagesStable });
}
exports.useMessages = useMessages;
//# sourceMappingURL=useMessages.js.map