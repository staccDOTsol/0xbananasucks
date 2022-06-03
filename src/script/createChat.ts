import { ChatSdk, PostAction } from "@strata-foundation/chat";
import * as anchor from "@project-serum/anchor";
import { PublicKey } from "@solana/web3.js";
// @ts-ignore
import LitJsSdk from "lit-js-sdk";
import { ChatIDL } from "@strata-foundation/chat";
import { Program } from "@project-serum/anchor";

const args = process.argv;
setTimeout(async () => {
  
console.log(process.env.ANCHOR_PROVIDER_URL);
  anchor.setProvider(anchor.Provider.env());
  const provider = anchor.getProvider();

  const ChatIDLJson = await Program.fetchIdl(ChatSdk.ID, provider);
  const chat = new Program<ChatIDL>(
    ChatIDLJson as ChatIDL,
    ChatSdk.ID,
    provider
  ) as Program<ChatIDL>;
  const client = new LitJsSdk.LitNodeClient();

  const chatSdk = new ChatSdk(provider, chat, client);

  await chatSdk.initializeChat({
    identifier: 'burnit',
    name: 'burnit',
    readPermissionMint: new PublicKey("openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"),
    postPermissionMint: new PublicKey("openDKyuDPS6Ak1BuD3JtvkQGV3tzCxjpHUfe1mdC79"),
    imageUrl: "https://raw.githubusercontent.com/dyor-market/token-list/main/assets/mainnet/D3gRmoveMFa8e3ziw5XCwCByHKiSk76T4fi62GXNYXHi/logo.png",
    postPermissionAction: PostAction.Burn,
    postPermissionAmount: 1.38
  });
}, 1);