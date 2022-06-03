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
exports.Swap = void 0;
const useSwapDriver_1 = require("../../hooks/useSwapDriver");
const react_1 = __importStar(require("react"));
const react_hot_toast_1 = __importDefault(require("react-hot-toast"));
const hooks_1 = require("../../hooks");
const Notification_1 = require("../Notification");
const SwapForm_1 = require("./SwapForm");
const identity = () => { };
const Swap = ({ tokenBondingKey, onConnectWallet, }) => {
    const { loading, error, execute } = (0, hooks_1.useSwap)();
    const { handleErrors } = (0, hooks_1.useErrorHandler)();
    handleErrors(error);
    const { info: tokenBonding } = (0, hooks_1.useTokenBonding)(tokenBondingKey);
    const [tradingMints, setTradingMints] = (0, react_1.useState)({
        base: tokenBonding === null || tokenBonding === void 0 ? void 0 : tokenBonding.baseMint,
        target: tokenBonding === null || tokenBonding === void 0 ? void 0 : tokenBonding.targetMint,
    });
    react_1.default.useEffect(() => {
        if ((!tradingMints.base || !tradingMints.target) && tokenBonding) {
            setTradingMints({
                base: tokenBonding.baseMint,
                target: tokenBonding.targetMint,
            });
        }
    }, [tokenBonding, tradingMints]);
    const _a = (0, useSwapDriver_1.useSwapDriver)({
        tradingMints,
        onConnectWallet: onConnectWallet || identity,
        onTradingMintsChange: setTradingMints,
        swap: (args) => execute(args)
            .then(({ targetAmount }) => {
            react_hot_toast_1.default.custom((t) => (react_1.default.createElement(Notification_1.Notification, { show: t.visible, type: "success", heading: "Transaction Successful", message: `Succesfully purchased ${Number(targetAmount).toFixed(9)} ${args.ticker}!`, onDismiss: () => react_hot_toast_1.default.dismiss(t.id) })));
        })
            .catch(console.error),
        tokenBondingKey: tokenBondingKey,
    }), { loading: driverLoading } = _a, swapProps = __rest(_a, ["loading"]);
    return (react_1.default.createElement(SwapForm_1.SwapForm, Object.assign({ isLoading: driverLoading, isSubmitting: loading }, swapProps)));
};
exports.Swap = Swap;
//# sourceMappingURL=Swap.js.map