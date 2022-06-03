"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useAccountFetchCache = void 0;
const react_1 = require("react");
const contexts_1 = require("../contexts");
/**
 * Get the Strata account fetch cache to save on rcp calls. Generally, you want to use {@link useAccount}
 * @returns
 */
const useAccountFetchCache = () => {
    return (0, react_1.useContext)(contexts_1.AccountContext);
};
exports.useAccountFetchCache = useAccountFetchCache;
//# sourceMappingURL=useAccountFetchCache.js.map