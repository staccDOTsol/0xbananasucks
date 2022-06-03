import React, { FC, ReactNode } from "react";
import { Commitment } from "@solana/web3.js";
import { AccountFetchCache } from "@strata-foundation/spl-utils";
export interface IAccountProviderProps {
    children: ReactNode;
    commitment: Commitment;
    extendConnection?: boolean;
}
export declare const AccountContext: React.Context<AccountFetchCache | undefined>;
export declare const AccountProvider: FC<IAccountProviderProps>;
//# sourceMappingURL=accountContext.d.ts.map