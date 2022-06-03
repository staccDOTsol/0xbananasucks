"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StrataProviders = void 0;
const contexts_1 = require("../contexts");
const react_1 = __importDefault(require("react"));
const defaultOnError = (error) => console.log(error);
const StrataProviders = ({ children, onError = defaultOnError, resetCSS = false }) => (react_1.default.createElement(contexts_1.ThemeProvider, { resetCSS: resetCSS },
    react_1.default.createElement(contexts_1.ErrorHandlerProvider, { onError: onError },
        react_1.default.createElement(contexts_1.StrataSdksProvider, null,
            react_1.default.createElement(contexts_1.TokenListProvider, null,
                react_1.default.createElement(contexts_1.AccountProvider, { commitment: "confirmed" }, children))))));
exports.StrataProviders = StrataProviders;
//# sourceMappingURL=StrataProviders.js.map