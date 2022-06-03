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
exports.ProfileButton = void 0;
const useDelegateWallet_1 = require("../hooks/useDelegateWallet");
const react_1 = require("@chakra-ui/react");
const wallet_adapter_base_1 = require("@solana/wallet-adapter-base");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const web3_js_1 = require("@solana/web3.js");
const react_2 = require("@strata-foundation/react");
const react_3 = __importStar(require("react"));
const bs_1 = require("react-icons/bs");
const hooks_1 = require("../hooks");
const CreateProfileModal_1 = require("./CreateProfileModal");
const react_async_hook_1 = require("react-async-hook");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const contexts_1 = require("../contexts");
function loadDelegate(chatSdk) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (chatSdk) {
            const instructions = [];
            const signers = [];
            const { output: { delegateWalletKeypair }, instructions: delInstructions, signers: delSigners, } = yield chatSdk.initializeDelegateWalletInstructions({});
            instructions.push(...delInstructions);
            signers.push(...delSigners);
            instructions.push(web3_js_1.SystemProgram.transfer({
                fromPubkey: chatSdk.wallet.publicKey,
                toPubkey: delegateWalletKeypair.publicKey,
                lamports: 10000000, // 2000 messages
            }));
            yield (0, spl_utils_1.sendInstructions)(chatSdk.errors || new Map(), chatSdk.provider, instructions, signers);
            const existing = localStorage.getItem("delegateWallet");
            const existingObj = existing ? JSON.parse(existing) : {};
            existingObj[(_a = chatSdk.wallet.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58()] = Array.from(delegateWalletKeypair.secretKey);
            localStorage.setItem("delegateWallet", JSON.stringify(existingObj));
        }
    });
}
const ProfileButton = (_a) => {
    var { children = "Select Wallet", onClick } = _a, props = __rest(_a, ["children", "onClick"]);
    const { connected, publicKey } = (0, wallet_adapter_react_1.useWallet)();
    const { visible, setVisible } = (0, wallet_adapter_react_ui_1.useWalletModal)();
    const { info: profile, loading } = (0, hooks_1.useWalletProfile)();
    const delegate = (0, useDelegateWallet_1.useDelegateWallet)();
    const { chatSdk } = (0, contexts_1.useChatSdk)();
    const { handleErrors } = (0, react_2.useErrorHandler)();
    const { execute: execLoadDelegate, error, loading: loadingDelegate } = (0, react_async_hook_1.useAsyncCallback)(loadDelegate);
    handleErrors(error);
    (0, react_3.useEffect)(() => {
        if (profile && !delegate) {
            execLoadDelegate(chatSdk);
        }
    }, [profile, delegate]);
    const handleClick = (0, react_3.useCallback)((event) => {
        if (onClick)
            onClick(event);
        if (!event.defaultPrevented)
            setVisible(!visible);
    }, [onClick, visible, setVisible]);
    const { cluster, setClusterOrEndpoint } = (0, react_2.useEndpoint)();
    return (react_3.default.createElement(react_1.ButtonGroup, { marginTop: "auto", colorScheme: "primary", color: (0, react_1.useColorModeValue)("black", "white"), variant: "outline", spacing: "6", isAttached: true, size: props.size },
        !loading && connected && !profile && !delegate && react_3.default.createElement(CreateProfileModal_1.CreateProfileModal, null),
        loadingDelegate && react_3.default.createElement(react_1.Modal, { isOpen: true, onClose: () => { } },
            react_3.default.createElement(react_1.ModalContent, null,
                react_3.default.createElement(react_1.ModalBody, null, "Loading local wallet..."))),
        react_3.default.createElement(react_1.Button, Object.assign({ color: (0, react_1.useColorModeValue)("black", "white"), borderColor: "primary.500" }, props, { leftIcon: profile ? (react_3.default.createElement(react_1.Avatar, { w: "30px", h: "30px", src: profile.imageUrl })) : (react_3.default.createElement(react_1.Icon, { w: "16px", h: "16px", as: bs_1.BsFillPersonFill })), onClick: handleClick, _hover: { backgroundColor: "orange.500" } }), connected
            ? profile
                ? profile.username
                : (0, react_2.truncatePubkey)(publicKey)
            : children),
        react_3.default.createElement(react_1.Menu, { isLazy: true },
            react_3.default.createElement(react_1.MenuButton, { as: react_1.IconButton, color: (0, react_1.useColorModeValue)("black", "white"), borderColor: "primary.500", borderLeft: "none", "aria-label": "Network", icon: react_3.default.createElement(react_1.Icon, { as: bs_1.BsChevronDown }) }),
            react_3.default.createElement(react_1.MenuList, { backgroundColor: (0, react_1.useColorModeValue)("white", "black.300"), borderColor: "black.500" },
                react_3.default.createElement(react_1.MenuOptionGroup, { title: "Network", type: "radio", onChange: (e) => setClusterOrEndpoint(e), value: cluster },
                    react_3.default.createElement(react_1.MenuItemOption, { value: wallet_adapter_base_1.WalletAdapterNetwork.Mainnet, _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" } }, "Mainnet"),
                    react_3.default.createElement(react_1.MenuItemOption, { _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" }, value: wallet_adapter_base_1.WalletAdapterNetwork.Devnet }, "Devnet"),
                    react_3.default.createElement(react_1.MenuItemOption, { _focus: { backgroundColor: "primary.300" }, _hover: { backgroundColor: "primary.500" }, value: "localnet" }, "Localnet"))))));
};
exports.ProfileButton = ProfileButton;
//# sourceMappingURL=ProfileButton.js.map