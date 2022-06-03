import type { PartsStyleFunction } from "@chakra-ui/theme-tools";
declare const _default: {
    parts: ("element" | "field" | "addon")[];
    baseStyle: Partial<Record<"element" | "field" | "addon", import("@chakra-ui/styled-system").CSSObject>>;
    sizes: Record<string, Partial<Record<"element" | "field" | "addon", import("@chakra-ui/styled-system").CSSObject>>>;
    variants: {
        outline: PartsStyleFunction<Omit<import("@chakra-ui/theme-tools").Anatomy<"element" | "field" | "addon">, "parts">>;
        filled: PartsStyleFunction<Omit<import("@chakra-ui/theme-tools").Anatomy<"element" | "field" | "addon">, "parts">>;
        flushed: PartsStyleFunction<Omit<import("@chakra-ui/theme-tools").Anatomy<"element" | "field" | "addon">, "parts">>;
        unstyled: Partial<Record<"element" | "field" | "addon", import("@chakra-ui/styled-system").CSSObject>>;
    };
    defaultProps: {
        size: string;
        variant: string;
    };
};
export default _default;
//# sourceMappingURL=input.d.ts.map