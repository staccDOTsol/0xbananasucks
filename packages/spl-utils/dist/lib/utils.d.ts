import BN from "bn.js";
import { MintInfo } from "@solana/spl-token";
export declare type Truthy<T> = T extends false | "" | 0 | null | undefined ? never : T;
export declare const truthy: <T>(value: T) => value is Truthy<T>;
export declare function toBN(numberOrBn: BN | number, mintOrDecimals: MintInfo | number): BN;
//# sourceMappingURL=utils.d.ts.map