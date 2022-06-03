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
exports.AccountProvider = exports.AccountContext = void 0;
const react_1 = __importStar(require("react"));
const spl_utils_1 = require("@strata-foundation/spl-utils");
const constants_1 = require("../constants");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
exports.AccountContext = (0, react_1.createContext)(undefined);
const AccountProvider = ({ children, commitment = constants_1.DEFAULT_COMMITMENT, extendConnection = true, }) => {
    const { connection } = (0, wallet_adapter_react_1.useConnection)();
    const [cache, setCache] = (0, react_1.useState)(connection && new spl_utils_1.AccountFetchCache({
        connection,
        delay: 500,
        commitment,
        extendConnection,
    }));
    (0, react_1.useEffect)(() => {
        if (connection) {
            cache.close();
            setCache(new spl_utils_1.AccountFetchCache({
                connection,
                delay: 500,
                commitment,
                extendConnection,
            }));
        }
    }, [connection]);
    return (react_1.default.createElement(exports.AccountContext.Provider, { value: cache }, children));
    return null;
};
exports.AccountProvider = AccountProvider;
//# sourceMappingURL=accountContext.js.map