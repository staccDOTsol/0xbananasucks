"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCollective = void 0;
const _1 = require(".");
function useCollective(collective) {
    const { tokenCollectiveSdk } = (0, _1.useStrataSdks)();
    return (0, _1.useAccount)(collective, tokenCollectiveSdk === null || tokenCollectiveSdk === void 0 ? void 0 : tokenCollectiveSdk.collectiveDecoder, false);
}
exports.useCollective = useCollective;
//# sourceMappingURL=useCollective.js.map