"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsHeader = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("@chakra-ui/react");
const useChat_1 = require("../../hooks/useChat");
const react_3 = require("@strata-foundation/react");
const spl_token_bonding_1 = require("@strata-foundation/spl-token-bonding");
function RoomsHeader({ chatKey }) {
    const { info: chat } = (0, useChat_1.useChat)(chatKey);
    const [isMobile] = (0, react_2.useMediaQuery)("(max-width: 680px)");
    const { metadata: readMetadata, image: readImage } = (0, react_3.useTokenMetadata)(chat === null || chat === void 0 ? void 0 : chat.readPermissionMint);
    const postMint = (0, react_3.useMint)(chat === null || chat === void 0 ? void 0 : chat.postPermissionMint);
    const { metadata: postMetadata, image: postImage } = (0, react_3.useTokenMetadata)(chat === null || chat === void 0 ? void 0 : chat.postPermissionMint);
    const { colorMode } = (0, react_2.useColorMode)();
    return (react_1.default.createElement(react_2.Flex, { align: "center", justify: "space-between", width: "100%", p: "10px", borderBottom: "1px solid", borderColor: colorMode === "light" ? "gray.200" : "gray.700", direction: "row" },
        react_1.default.createElement(react_2.Box, { maxWidth: "70%", pt: 1 },
            react_1.default.createElement(react_2.Heading, { size: isMobile ? "md" : "md", isTruncated: true }, chat === null || chat === void 0 ? void 0 : chat.name),
            !isMobile && (react_1.default.createElement(react_2.HStack, { spacing: 4 },
                readMetadata && (react_1.default.createElement(react_2.HStack, { spacing: 1 },
                    react_1.default.createElement(react_2.Text, { fontWeight: 600 }, "Read:"),
                    react_1.default.createElement(react_2.Text, null, "hold 1"),
                    react_1.default.createElement(react_2.Avatar, { w: "16px", h: "16px", title: readMetadata === null || readMetadata === void 0 ? void 0 : readMetadata.data.symbol, src: readImage }))),
                postMetadata && (react_1.default.createElement(react_2.HStack, { spacing: 1 },
                    react_1.default.createElement(react_2.Text, { fontWeight: 600 }, "Post:"),
                    react_1.default.createElement(react_2.Text, null,
                        Object.keys((chat === null || chat === void 0 ? void 0 : chat.postPermissionAction) || {})[0],
                        " ",
                        (chat === null || chat === void 0 ? void 0 : chat.postPermissionAmount) &&
                            postMint &&
                            (0, react_3.roundToDecimals)((0, spl_token_bonding_1.toNumber)(chat.postPermissionAmount, postMint), 4)),
                    react_1.default.createElement(react_2.Avatar, { w: "16px", h: "16px", title: postMetadata === null || postMetadata === void 0 ? void 0 : postMetadata.data.symbol, src: postImage }))))))));
}
exports.RoomsHeader = RoomsHeader;
//# sourceMappingURL=RoomsHeader.js.map