"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenList = void 0;
const contexts_1 = require("../contexts");
const react_1 = require("react");
const useTokenList = () => {
    return (0, react_1.useContext)(contexts_1.TokenListContext);
};
exports.useTokenList = useTokenList;
//# sourceMappingURL=useTokenList.js.map