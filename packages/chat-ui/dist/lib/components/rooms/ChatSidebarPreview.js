"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatSidebarPreview = void 0;
const react_1 = require("@chakra-ui/react");
const router_1 = require("next/router");
const react_2 = __importDefault(require("react"));
const useChat_1 = require("../../hooks/useChat");
const useChatKey_1 = require("../../hooks/useChatKey");
const routes_1 = require("../../routes");
function ChatSidebarPreview({ identifier }) {
    const chatKey = (0, useChatKey_1.useChatKey)(identifier);
    const { info: chat, loading } = (0, useChat_1.useChat)(chatKey);
    const { colorMode } = (0, react_1.useColorMode)();
    const router = (0, router_1.useRouter)();
    const { id } = router.query;
    const highlightedBg = (0, react_1.useColorModeValue)("gray.200", "gray.800");
    //push to url for specific chat
    const handleClick = () => {
        router.push((0, routes_1.route)(routes_1.routes.chat, { id: chat === null || chat === void 0 ? void 0 : chat.identifier }));
    };
    return (react_2.default.createElement(react_1.Flex, { minW: "200px", align: "center", bg: id == (chat === null || chat === void 0 ? void 0 : chat.identifier) ? highlightedBg : undefined, p: 4, cursor: "pointer", _hover: { bg: colorMode === "light" ? "gray.200" : "gray.700" }, onClick: handleClick },
        loading ? (react_2.default.createElement(react_1.SkeletonCircle, { mr: 2 })) : (react_2.default.createElement(react_1.Avatar, { mr: 2, size: "md", src: chat === null || chat === void 0 ? void 0 : chat.imageUrl })),
        loading ? react_2.default.createElement(react_1.SkeletonText, { width: "200px" }) : react_2.default.createElement(react_1.Text, null, chat === null || chat === void 0 ? void 0 : chat.name)));
}
exports.ChatSidebarPreview = ChatSidebarPreview;
//# sourceMappingURL=ChatSidebarPreview.js.map