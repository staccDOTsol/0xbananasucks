#![allow(clippy::or_fun_call)]

use anchor_lang::prelude::*;

pub mod error;
pub mod instructions;
pub mod state;
pub mod utils;

use instructions::*;

declare_id!("chatGL6yNgZT2Z3BeMYGcgdMpcBKdmxko4C5UhEX4To");

#[program]
pub mod chat {
  use super::*;
  pub fn initialize_chat_v0(
    ctx: Context<InitializeChatV0>,
    args: InitializeChatArgsV0,
  ) -> Result<()> {
    instructions::initialize_chat_v0::handler(ctx, args)
  }
  pub fn update_chat_v0(
    ctx: Context<UpdateChatV0>,
    args: UpdateChatArgsV0,
  ) -> Result<()> {
    instructions::update_chat_v0::handler(ctx, args)
  }

  pub fn initialize_profile_v0(
    ctx: Context<InitializeProfileV0>,
    args: InitializeProfileArgsV0,
  ) -> Result<()> {
    instructions::initialize_profile_v0::handler(ctx, args)
  }

  pub fn initialize_delegate_wallet_v0(
    ctx: Context<InitializeDelegateWalletV0>,
  ) -> Result<()> {
    instructions::initialize_delegate_wallet_v0::handler(ctx)
  }

  pub fn send_message_v0(
    ctx: Context<SendMessageV0>,
    args: MessageV0,
  ) -> Result<()> {
    instructions::send_message_v0::handler(ctx, args)
  }
}
