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
exports.CreateProfileModal = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const yup = __importStar(require("yup"));
const react_hook_form_1 = require("react-hook-form");
const yup_1 = require("@hookform/resolvers/yup");
const react_async_hook_1 = require("react-async-hook");
const contexts_1 = require("../contexts");
const react_3 = require("@strata-foundation/react");
const web3_js_1 = require("@solana/web3.js");
const spl_utils_1 = require("@strata-foundation/spl-utils");
const FormControlWithError_1 = require("./FormControlWithError");
const wallet_adapter_react_1 = require("@solana/wallet-adapter-react");
const validationSchema = yup.object({
    username: yup.string().required().min(1),
    imageUrl: yup.string(),
});
function createProfile(chatSdk, args) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        if (chatSdk) {
            const { instructions, signers, } = yield chatSdk.initializeProfileInstructions({
                username: args.username,
                imageUrl: args.imageUrl,
            });
            const { output: { delegateWalletKeypair }, instructions: delInstructions, signers: delSigners } = yield chatSdk.initializeDelegateWalletInstructions({});
            instructions.push(...delInstructions);
            signers.push(...delSigners);
            instructions.push(web3_js_1.SystemProgram.transfer({
                fromPubkey: chatSdk.wallet.publicKey,
                toPubkey: delegateWalletKeypair.publicKey,
                lamports: 100000000, // 20000 messages
            }));
            yield (0, spl_utils_1.sendInstructions)(chatSdk.errors || new Map(), chatSdk.provider, instructions, signers);
            const existing = localStorage.getItem("delegateWallet");
            const existingObj = existing ? JSON.parse(existing) : {};
            existingObj[(_a = chatSdk.wallet.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58()] = Array.from(delegateWalletKeypair.secretKey);
            localStorage.setItem("delegateWallet", JSON.stringify(existingObj));
        }
    });
}
function CreateProfileModal() {
    const formProps = (0, react_hook_form_1.useForm)({
        resolver: (0, yup_1.yupResolver)(validationSchema),
        defaultValues: {},
    });
    const { disconnect } = (0, wallet_adapter_react_1.useWallet)();
    const { register, handleSubmit, formState: { errors, isSubmitting }, } = formProps;
    const { execute, loading, error } = (0, react_async_hook_1.useAsyncCallback)(createProfile);
    const { chatSdk } = (0, contexts_1.useChatSdk)();
    const { awaitingApproval } = (0, react_3.useProvider)();
    const { handleErrors } = (0, react_3.useErrorHandler)();
    handleErrors(error);
    function onSubmit(args) {
        return __awaiter(this, void 0, void 0, function* () {
            yield execute(chatSdk, args);
        });
    }
    return (react_2.default.createElement(react_1.Modal, { isOpen: true, onClose: () => {
            disconnect();
        }, size: "2xl", isCentered: true, trapFocus: true },
        react_2.default.createElement(react_1.ModalContent, { borderRadius: "xl", shadow: "xl" },
            react_2.default.createElement(react_1.ModalHeader, null, "Create Chat Profile"),
            react_2.default.createElement(react_1.ModalBody, null,
                react_2.default.createElement(react_hook_form_1.FormProvider, Object.assign({}, formProps),
                    react_2.default.createElement("form", { onSubmit: handleSubmit(onSubmit) },
                        react_2.default.createElement(react_1.VStack, null,
                            react_2.default.createElement(react_1.Alert, { status: "info" },
                                react_2.default.createElement(react_1.AlertIcon, null),
                                react_2.default.createElement(react_1.Box, null,
                                    react_2.default.createElement(react_1.AlertTitle, null, "Local Wallet"),
                                    react_2.default.createElement(react_1.AlertDescription, null, "Strata Chat is fully decentralized. In order to avoid asking for approval on every message, we create a wallet stored in your machines localStorage that can send messages on your main wallets behalf. Creating a profile will also load this wallet with 0.1 Sol to pay for messages (0.000005 SOL each) and file uploads (1 $SHDW per GB)"))),
                            react_2.default.createElement(FormControlWithError_1.FormControlWithError, { id: "username", help: "A less than 32 character username. This will show as your name in the chat. These must be unique.", label: "Username", errors: errors },
                                react_2.default.createElement(react_1.Input, Object.assign({}, register("username")))),
                            react_2.default.createElement(FormControlWithError_1.FormControlWithError, { id: "imageUrl", help: "A url to the image to use for your profile", label: "Image URL", errors: errors },
                                react_2.default.createElement(react_1.Input, Object.assign({}, register("imageUrl")))),
                            react_2.default.createElement(react_1.Button, { isLoading: loading, colorScheme: "primary", alignSelf: "flex-end", mr: 3, type: "submit", loadingText: awaitingApproval ? "Awaiting Approval" : "Loading" }, "Save"))))))));
}
exports.CreateProfileModal = CreateProfileModal;
//# sourceMappingURL=CreateProfileModal.js.map