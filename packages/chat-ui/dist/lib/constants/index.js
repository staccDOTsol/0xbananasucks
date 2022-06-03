"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GIPHY_API_KEY = exports.IS_PRODUCTION = exports.GA_TRACKING_ID = exports.SOLANA_URL = void 0;
exports.SOLANA_URL = process.env.NEXT_PUBLIC_SOLANA_URL ||
    "https://psytrbhymqlkfrhudd.dev.genesysgo.net:8899/";
exports.GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS || "G-L4QLBX3394";
exports.IS_PRODUCTION = process.env.NODE_ENV === "production";
exports.GIPHY_API_KEY = process.env.NEXT_PUBLIC_GIPHY_API_KEY;
//# sourceMappingURL=index.js.map