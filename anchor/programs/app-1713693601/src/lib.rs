#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("5SkVTeXdssuUaVxY2EXuJVnhCtWcgrP1AdF4uTPsBh6k");

#[program]
pub mod app_1713693601 {
    use super::*;

  pub fn close(_ctx: Context<CloseApp1713693601>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.app_1713693601.count = ctx.accounts.app_1713693601.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.app_1713693601.count = ctx.accounts.app_1713693601.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeApp1713693601>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.app_1713693601.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeApp1713693601<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + App1713693601::INIT_SPACE,
  payer = payer
  )]
  pub app_1713693601: Account<'info, App1713693601>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseApp1713693601<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub app_1713693601: Account<'info, App1713693601>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub app_1713693601: Account<'info, App1713693601>,
}

#[account]
#[derive(InitSpace)]
pub struct App1713693601 {
  count: u8,
}
