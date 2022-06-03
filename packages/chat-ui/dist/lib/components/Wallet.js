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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.getToken = void 0;
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_wallets_1 = require("@solana/wallet-adapter-wallets");
const react_1 = __importStar(require("react"));
const react_2 = require("@strata-foundation/react");
const getToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const req = yield fetch("/api/get-token");
    const { access_token } = yield req.json();
    return access_token;
});
exports.getToken = getToken;
const Wallet = ({ children, cluster, }) => {
    const { endpoint, cluster: clusterFromUseEndpoint } = (0, react_2.useEndpoint)();
    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded
    const wallets = (0, react_1.useMemo)(() => [
        new wallet_adapter_wallets_1.PhantomWalletAdapter(),
        new wallet_adapter_wallets_1.GlowWalletAdapter(),
        // @ts-ignore
        new wallet_adapter_wallets_1.SolflareWalletAdapter({ network: clusterFromUseEndpoint }),
        new wallet_adapter_wallets_1.SlopeWalletAdapter(),
        new wallet_adapter_wallets_1.TorusWalletAdapter(),
        new wallet_adapter_wallets_1.LedgerWalletAdapter(),
        new wallet_adapter_wallets_1.ExodusWalletAdapter(),
    ], [clusterFromUseEndpoint]);
    return (react_1.default.createElement(wallet_adapter_react_1.ConnectionProvider, { endpoint: cluster || endpoint, config: {
            commitment: "confirmed",
        } },
        react_1.default.createElement(wallet_adapter_react_1.WalletProvider, { wallets: wallets, autoConnect: true }, children)));
};
exports.Wallet = Wallet;
//# sourceMappingURL=Wallet.js.map