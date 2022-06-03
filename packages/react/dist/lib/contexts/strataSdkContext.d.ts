import { SplTokenBonding } from "@strata-foundation/spl-token-bonding";
import { SplTokenCollective } from "@strata-foundation/spl-token-collective";
import { SplTokenMetadata } from "@strata-foundation/spl-utils";
import React from "react";
export declare const StrataSdksContext: React.Context<IStrataSdksReactState>;
export interface IStrataSdks {
    tokenBondingSdk?: SplTokenBonding;
    tokenCollectiveSdk?: SplTokenCollective;
    tokenMetadataSdk?: SplTokenMetadata;
}
export interface IStrataSdksReactState extends IStrataSdks {
    error?: Error;
    loading: boolean;
}
export declare const StrataSdksProviderRaw: React.FC;
export declare const StrataSdksProvider: React.FC;
//# sourceMappingURL=strataSdkContext.d.ts.map