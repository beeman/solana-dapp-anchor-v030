'use client'

import { useWallet } from '@solana/wallet-adapter-react'
import { WalletButton } from '../solana/solana-provider'
import { AppHero, ellipsify } from '../ui/ui-layout'
import { ExplorerLink } from '../cluster/cluster-ui'
import { useApp1713693601Program } from './app-1713693601-data-access'
import { App1713693601Create, App1713693601List } from './app-1713693601-ui'

export default function App1713693601Feature() {
  const { publicKey } = useWallet()
  const { programId } = useApp1713693601Program()

  return publicKey ? (
    <div>
      <AppHero
        title="App1713693601"
        subtitle={
          'Create a new account by clicking the "Create" button. The state of a account is stored on-chain and can be manipulated by calling the program\'s methods (increment, decrement, set, and close).'
        }
      >
        <p className="mb-6">
          <ExplorerLink path={`account/${programId}`} label={ellipsify(programId.toString())} />
        </p>
        <App1713693601Create />
      </AppHero>
      <App1713693601List />
    </div>
  ) : (
    <div className="max-w-4xl mx-auto">
      <div className="hero py-[64px]">
        <div className="hero-content text-center">
          <WalletButton />
        </div>
      </div>
    </div>
  )
}
