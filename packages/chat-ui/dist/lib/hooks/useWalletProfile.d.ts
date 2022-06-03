/// <reference types="node" />
/// <reference types="@solana/web3.js" />
/// <reference types="@project-serum/anchor/node_modules/@solana/web3.js" />
/// <reference types="@solana/wallet-adapter-react/node_modules/@solana/web3.js" />
/// <reference types="@solana/spl-governance/node_modules/@solana/web3.js" />
/// <reference types="@strata-foundation/chat/node_modules/@strata-foundation/spl-utils/node_modules/@solana/web3.js" />
export declare function useWalletProfile(): {
    loading: boolean;
    account?: import("@solana/web3.js").AccountInfo<Buffer> | undefined;
    info?: import("@strata-foundation/chat").IProfile | undefined;
};
//# sourceMappingURL=useWalletProfile.d.ts.map