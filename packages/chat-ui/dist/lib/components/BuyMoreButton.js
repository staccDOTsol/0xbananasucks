"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BuyMoreButton = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const react_3 = require("@strata-foundation/react");
const wallet_adapter_react_ui_1 = require("@solana/wallet-adapter-react-ui");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
function BuyMoreButton({ mint }) {
    const { isOpen, onToggle, onClose } = (0, react_2.useDisclosure)();
    const { metadata } = (0, react_3.useTokenMetadata)(mint);
    const { connected } = (0, wallet_adapter_react_1.useWallet)();
    const { result: tokenBondingKey, loading } = (0, react_3.useTokenBondingKey)(mint, 0);
    const { setVisible } = (0, wallet_adapter_react_ui_1.useWalletModal)();
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(react_2.Button, { size: "sm", colorScheme: "primary", variant: "outline", onClick: connected ? onToggle : () => setVisible(true) }, connected ? `Buy More ${metadata === null || metadata === void 0 ? void 0 : metadata.data.symbol}` : "Connect Wallet"),
        react_1.default.createElement(react_2.Modal, { isOpen: isOpen, onClose: onClose, size: "2xl", isCentered: true, trapFocus: true },
            react_1.default.createElement(react_2.ModalContent, { borderRadius: "xl", shadow: "xl" },
                react_1.default.createElement(react_2.ModalHeader, null,
                    "Buy More ", metadata === null || metadata === void 0 ? void 0 :
                    metadata.data.symbol),
                react_1.default.createElement(react_2.ModalBody, { minH: "500px" },
                    tokenBondingKey && react_1.default.createElement(react_3.Swap, { tokenBondingKey: tokenBondingKey, onConnectWallet: () => {
                            onClose();
                            setVisible(true);
                        } }),
                    loading && react_1.default.createElement(react_2.Spinner, null))))));
}
exports.BuyMoreButton = BuyMoreButton;
//# sourceMappingURL=BuyMoreButton.js.map