"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSolPrice = void 0;
const contexts_1 = require("../contexts");
const react_1 = require("react");
const useSolPrice = () => {
    return (0, react_1.useContext)(contexts_1.SolPriceContext);
};
exports.useSolPrice = useSolPrice;
//# sourceMappingURL=useSolPrice.js.map