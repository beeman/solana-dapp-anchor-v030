'use client'

import { App1713693601IDL, getApp1713693601ProgramId ,App1713693601} from '@app-1713693601/anchor'
import { Program } from '@coral-xyz/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useApp1713693601Program() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getApp1713693601ProgramId(cluster.network as Cluster), [cluster])
  const program = new Program(App1713693601IDL as App1713693601, provider)

  const accounts = useQuery({
    queryKey: ['app-1713693601', 'all', { cluster }],
    queryFn: () => program.account.app1713693601.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['app-1713693601', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ app1713693601: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useApp1713693601ProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useApp1713693601Program()

  const accountQuery = useQuery({
    queryKey: ['app-1713693601', 'fetch', { cluster, account }],
    queryFn: () => program.account.app1713693601.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['app-1713693601', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ app1713693601: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['app-1713693601', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ app1713693601: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['app-1713693601', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ app1713693601: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['app-1713693601', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ app1713693601: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
