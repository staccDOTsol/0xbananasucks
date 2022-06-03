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
exports.useSwapDriver = exports.getMissingSpace = void 0;
const spl_token_1 = require("@solana/spl-token");
const web3_js_1 = require("@solana/web3.js");
const useCapInfo_1 = require("./useCapInfo");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
const react_1 = __importStar(require("react"));
const react_async_hook_1 = require("react-async-hook");
const utils_1 = require("../utils");
const _1 = require("./");
function getMints(hierarchy) {
    if (!hierarchy) {
        return [];
    }
    return [hierarchy.tokenBonding.baseMint, ...getMints(hierarchy.parent)];
}
function getMissingSpace(provider, hierarchy, baseMint, targetMint) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!provider || !provider.wallet || !provider.wallet.publicKey || !baseMint || !targetMint || !hierarchy) {
            return 0;
        }
        const path = hierarchy.path(baseMint, targetMint);
        const accounts = (yield Promise.all(path.map((hierarchy) => __awaiter(this, void 0, void 0, function* () {
            return [
                yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, hierarchy.tokenBonding.baseMint, provider.wallet.publicKey, true),
                yield spl_token_1.Token.getAssociatedTokenAddress(spl_token_1.ASSOCIATED_TOKEN_PROGRAM_ID, spl_token_1.TOKEN_PROGRAM_ID, hierarchy.tokenBonding.targetMint, provider.wallet.publicKey, true),
            ];
        })))).flat();
        const distinctAccounts = Array.from(new Set(accounts.map((a) => a.toBase58())));
        const totalSpace = (yield Promise.all(distinctAccounts.map((acct) => __awaiter(this, void 0, void 0, function* () {
            if (yield provider.connection.getAccountInfo(new web3_js_1.PublicKey(acct))) {
                return 0;
            }
            return spl_token_1.AccountLayout.span;
        })))).reduce((acc, total) => acc + total, 0);
        return totalSpace;
    });
}
exports.getMissingSpace = getMissingSpace;
const useSwapDriver = ({ onConnectWallet, tokenBondingKey, tradingMints, onTradingMintsChange, swap, extraTransactionInfo, }) => {
    const { provider } = (0, _1.useProvider)();
    const [internalError, setInternalError] = (0, react_1.useState)();
    const [spendCap, setSpendCap] = (0, react_1.useState)(0);
    const { info: tokenBonding, loading: tokenBondingLoading } = (0, _1.useTokenBonding)(tokenBondingKey);
    const { base: baseMint, target: targetMint } = tradingMints;
    const { image: baseImage, metadata: baseMeta, loading: baseMetaLoading, error: baseMetaError, } = (0, _1.useTokenMetadata)(baseMint);
    const { image: targetImage, metadata: targetMeta, loading: targetMetaLoading, error: targetMetaError, } = (0, _1.useTokenMetadata)(targetMint);
    const { loading: curveLoading, pricing, error, } = (0, _1.useBondingPricing)(tokenBonding === null || tokenBonding === void 0 ? void 0 : tokenBonding.publicKey);
    const { result: missingSpace, error: missingSpaceError } = (0, react_async_hook_1.useAsync)(getMissingSpace, [provider, pricing === null || pricing === void 0 ? void 0 : pricing.hierarchy, baseMint, targetMint]);
    const { amount: feeAmount, error: feeError } = (0, _1.useEstimatedFees)(missingSpace || 0, 1);
    const targetMintAcct = (0, _1.useMint)(targetMint);
    const allMints = react_1.default.useMemo(() => [tokenBonding === null || tokenBonding === void 0 ? void 0 : tokenBonding.targetMint, ...getMints(pricing === null || pricing === void 0 ? void 0 : pricing.hierarchy)].filter(utils_1.truthy), [tokenBonding, pricing]);
    const ownedBase = (0, _1.useOwnedAmount)(baseMint);
    const { handleErrors } = (0, _1.useErrorHandler)();
    handleErrors(missingSpaceError, baseMetaError, targetMetaError, feeError, internalError, error);
    const unixTime = (0, _1.useSolanaUnixTime)();
    (0, react_1.useEffect)(() => {
        if (tokenBonding && targetMintAcct && pricing) {
            const purchaseCap = tokenBonding.purchaseCap
                ? (0, _1.amountAsNum)(tokenBonding.purchaseCap, targetMintAcct)
                : Number.POSITIVE_INFINITY;
            const maxSpend = pricing.buyTargetAmount(purchaseCap, pricing.hierarchy.tokenBonding.baseMint, unixTime);
            setSpendCap(maxSpend);
        }
    }, [tokenBonding, targetMint, pricing, setSpendCap, unixTime]);
    const base = baseMint && {
        name: (baseMeta === null || baseMeta === void 0 ? void 0 : baseMeta.data.name) || "",
        ticker: (baseMeta === null || baseMeta === void 0 ? void 0 : baseMeta.data.symbol) || "",
        image: baseImage,
        publicKey: baseMint,
    };
    const target = targetMint && {
        name: (targetMeta === null || targetMeta === void 0 ? void 0 : targetMeta.data.name) || "",
        ticker: (targetMeta === null || targetMeta === void 0 ? void 0 : targetMeta.data.symbol) || "",
        image: targetImage,
        publicKey: targetMint,
    };
    const lowMint = base &&
        target &&
        (pricing === null || pricing === void 0 ? void 0 : pricing.hierarchy.lowest(base.publicKey, target.publicKey));
    const targetBonding = lowMint && (pricing === null || pricing === void 0 ? void 0 : pricing.hierarchy.findTarget(lowMint));
    const mintCap = targetBonding &&
        targetMintAcct &&
        targetBonding.mintCap &&
        (0, spl_token_bonding_1.toNumber)(targetBonding.mintCap, targetMintAcct);
    const { numRemaining } = (0, useCapInfo_1.useCapInfo)(tokenBondingKey);
    const handleSubmit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        if (values.topAmount) {
            try {
                // They explicitly set the amount they want. Accomodate this if we're not doing a multi
                // level swap
                const path = pricing === null || pricing === void 0 ? void 0 : pricing.hierarchy.path(baseMint, targetMint);
                let shouldUseDesiredTargetAmount = values.lastSet == "bottom" &&
                    path &&
                    path.length == 1 &&
                    path[0].tokenBonding.targetMint.equals(targetMint);
                let outputAmountSetting = {
                    baseAmount: +values.topAmount,
                    expectedOutputAmount: +values.bottomAmount,
                };
                if (shouldUseDesiredTargetAmount) {
                    outputAmountSetting = {
                        desiredTargetAmount: +values.bottomAmount,
                        expectedBaseAmount: +values.topAmount,
                    };
                }
                yield swap(Object.assign(Object.assign({ baseMint: baseMint, targetMint: targetMint }, outputAmountSetting), { slippage: +values.slippage / 100, ticker: target.ticker }));
            }
            catch (e) {
                setInternalError(e);
            }
        }
    });
    return {
        extraTransactionInfo,
        numRemaining,
        mintCap,
        loading: targetMetaLoading ||
            baseMetaLoading ||
            tokenBondingLoading ||
            !tokenBonding ||
            !baseMeta,
        onConnectWallet,
        onTradingMintsChange,
        onBuyBase: () => {
            const tokenBonding = pricing.hierarchy.findTarget(baseMint);
            onTradingMintsChange({
                base: tokenBonding.baseMint,
                target: tokenBonding.targetMint,
            });
        },
        onSubmit: handleSubmit,
        tokenBonding,
        pricing,
        base,
        target,
        ownedBase,
        spendCap,
        feeAmount,
        baseOptions: react_1.default.useMemo(() => allMints.filter((mint) => baseMint &&
            !mint.equals(baseMint) &&
            pricing &&
            targetMint &&
            pricing.hierarchy.path(mint, targetMint).length > 0), [baseMint, allMints]),
        targetOptions: react_1.default.useMemo(() => allMints.filter((mint) => targetMint &&
            pricing &&
            baseMint &&
            !mint.equals(targetMint) &&
            pricing.hierarchy.path(baseMint, mint).length > 0), [targetMint, allMints]),
        swapBaseWithTargetEnabled: Boolean(baseMint &&
            targetMint &&
            pricing &&
            pricing.hierarchy.path(targetMint, baseMint).length > 0),
    };
};
exports.useSwapDriver = useSwapDriver;
//# sourceMappingURL=useSwapDriver.js.map