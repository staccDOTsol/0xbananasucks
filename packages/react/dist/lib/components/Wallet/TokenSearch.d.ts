import { StackProps } from "@chakra-ui/react";
import { ITokenWithMetaAndAccount } from "@strata-foundation/spl-token-collective";
import React from "react";
export declare const TokenSearch: React.MemoExoticComponent<({ onSelect, placeholder, resultsStackProps, onBlur, includeSol }: {
    onBlur?: (() => void) | undefined;
    placeholder?: string | undefined;
    resultsStackProps?: StackProps | undefined;
    onSelect: (tokenWithMeta: ITokenWithMetaAndAccount) => void;
    includeSol?: boolean | undefined;
}) => JSX.Element>;
//# sourceMappingURL=TokenSearch.d.ts.map