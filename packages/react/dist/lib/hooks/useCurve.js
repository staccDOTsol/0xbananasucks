"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useCurve = void 0;
const _1 = require(".");
function useCurve(curve) {
    const { tokenBondingSdk } = (0, _1.useStrataSdks)();
    return (0, _1.useAccount)(curve, tokenBondingSdk === null || tokenBondingSdk === void 0 ? void 0 : tokenBondingSdk.curveDecoder, true);
}
exports.useCurve = useCurve;
//# sourceMappingURL=useCurve.js.map