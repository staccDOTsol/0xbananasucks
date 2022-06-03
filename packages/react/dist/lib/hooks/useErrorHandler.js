"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useErrorHandler = void 0;
const react_1 = require("react");
const contexts_1 = require("../contexts");
const useErrorHandler = () => {
    const context = (0, react_1.useContext)(contexts_1.ErrorHandlerContext);
    if (context === undefined) {
        throw new Error("useErrorHandler must be used within ErrorHandlerProvider");
    }
    return context;
};
exports.useErrorHandler = useErrorHandler;
//# sourceMappingURL=useErrorHandler.js.map