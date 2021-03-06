import { MintInfo, u64 } from "@solana/spl-token";
import BN from "bn.js";
import { toBN as toBNUtils } from "@strata-foundation/spl-utils";
/**
 * Convert a number to a 12 decimal fixed precision u128
 *
 * @param num Number to convert to a 12 decimal fixed precision BN
 * @returns
 */
export declare function toU128(num: number | BN): BN;
export declare function toNumber(numberOrBn: BN | number, mint: MintInfo): number;
export declare const toBN: typeof toBNUtils;
export declare function amountAsNum(amount: u64, mint: MintInfo): number;
export declare function supplyAsNum(mint: MintInfo): number;
export declare function asDecimal(percent: number): number;
//# sourceMappingURL=utils.d.ts.map