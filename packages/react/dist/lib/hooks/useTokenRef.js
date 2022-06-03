"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useTokenRef = void 0;
const _1 = require(".");
function useTokenRef(tokenRef) {
    const { tokenCollectiveSdk } = (0, _1.useStrataSdks)();
    return (0, _1.useAccount)(tokenRef, tokenCollectiveSdk === null || tokenCollectiveSdk === void 0 ? void 0 : tokenCollectiveSdk.tokenRefDecoder, true);
}
exports.useTokenRef = useTokenRef;
//# sourceMappingURL=useTokenRef.js.map