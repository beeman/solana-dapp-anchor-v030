import * as anchor from '@coral-xyz/anchor'
import { Program } from '@coral-xyz/anchor'
import { Keypair } from '@solana/web3.js'
import { App1713693601 } from '../target/types/app_1713693601'

describe('app-1713693601', () => {
  // Configure the client to use the local cluster.
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const payer = provider.wallet as anchor.Wallet

  const program = anchor.workspace.App1713693601 as Program<App1713693601>

  const app1713693601Keypair = Keypair.generate()

  it('Initialize App1713693601', async () => {
    await program.methods
      .initialize()
      .accounts({
        app1713693601: app1713693601Keypair.publicKey,
        payer: payer.publicKey,
      })
      .signers([app1713693601Keypair])
      .rpc()

    const currentCount = await program.account.app1713693601.fetch(app1713693601Keypair.publicKey)

    expect(currentCount.count).toEqual(0)
  })

  it('Increment App1713693601', async () => {
    await program.methods.increment().accounts({ app1713693601: app1713693601Keypair.publicKey }).rpc()

    const currentCount = await program.account.app1713693601.fetch(app1713693601Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Increment App1713693601 Again', async () => {
    await program.methods.increment().accounts({ app1713693601: app1713693601Keypair.publicKey }).rpc()

    const currentCount = await program.account.app1713693601.fetch(app1713693601Keypair.publicKey)

    expect(currentCount.count).toEqual(2)
  })

  it('Decrement App1713693601', async () => {
    await program.methods.decrement().accounts({ app1713693601: app1713693601Keypair.publicKey }).rpc()

    const currentCount = await program.account.app1713693601.fetch(app1713693601Keypair.publicKey)

    expect(currentCount.count).toEqual(1)
  })

  it('Set app1713693601 value', async () => {
    await program.methods.set(42).accounts({ app1713693601: app1713693601Keypair.publicKey }).rpc()

    const currentCount = await program.account.app1713693601.fetch(app1713693601Keypair.publicKey)

    expect(currentCount.count).toEqual(42)
  })

  it('Set close the app1713693601 account', async () => {
    await program.methods
      .close()
      .accounts({
        payer: payer.publicKey,
        app1713693601: app1713693601Keypair.publicKey,
      })
      .rpc()

    // The account should no longer exist, returning null.
    const userAccount = await program.account.app1713693601.fetchNullable(app1713693601Keypair.publicKey)
    expect(userAccount).toBeNull()
  })
})
