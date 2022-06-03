"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = void 0;
const react_1 = require("@chakra-ui/react");
const react_2 = __importDefault(require("react"));
const io5_1 = require("react-icons/io5");
const ProfileButton_1 = require("./ProfileButton");
const ChatSidebarPreview_1 = require("./rooms/ChatSidebarPreview");
const VISIBLE_CHATS = ["open"];
const Sidebar = ({ fullWidth }) => {
    const { colorMode, toggleColorMode } = (0, react_1.useColorMode)();
    return (react_2.default.createElement(react_1.Flex, { height: "100vh", maxWidth: fullWidth ? "100vw" : "30vw", width: fullWidth ? "100vw" : "", direction: "column", borderRight: "1px solid", borderColor: colorMode === "light" ? "gray.200" : "gray.700" },
        react_2.default.createElement(react_1.Flex, { flexWrap: "wrap", direction: "column", position: "sticky", top: "0" },
            react_2.default.createElement(react_1.Flex, { justify: "space-between", height: "71px", align: "center", p: "10px" },
                react_2.default.createElement(react_1.Stack, { maxWidth: "30vw", direction: "row", w: "full", align: "space-between", justifyContent: "space-evenly" },
                    react_2.default.createElement(ProfileButton_1.ProfileButton, null),
                    react_2.default.createElement(react_1.IconButton, { colorScheme: "primary", variant: "outline", "aria-label": "Toggle Dark Mode", icon: colorMode === "light" ? (react_2.default.createElement(react_1.Icon, { as: io5_1.IoMoon })) : (react_2.default.createElement(react_1.Icon, { as: io5_1.IoSunny })), onClick: toggleColorMode })))),
        react_2.default.createElement(react_1.Stack, { direction: "column", overflow: "scroll" }, VISIBLE_CHATS.map((identifier) => (react_2.default.createElement(ChatSidebarPreview_1.ChatSidebarPreview, { key: identifier, identifier: identifier }))))));
};
exports.Sidebar = Sidebar;
//# sourceMappingURL=Sidebar.js.map