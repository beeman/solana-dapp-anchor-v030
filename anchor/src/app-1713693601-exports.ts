// Here we export some useful types and functions for interacting with the Anchor program.
import { Cluster, PublicKey } from '@solana/web3.js';
import App1713693601IDL from '../target/idl/app_1713693601.json';
import type { App1713693601 } from '../target/types/app_1713693601';

// Re-export the generated IDL and type
export { App1713693601, App1713693601IDL };

// After updating your program ID (e.g. after running `anchor keys sync`) update the value below.
export const APP_1713693601_PROGRAM_ID = new PublicKey(
  App1713693601IDL.address
);

// This is a helper function to get the program ID for the App1713693601 program depending on the cluster.
export function getApp1713693601ProgramId(cluster: Cluster) {
  switch (cluster) {
    case 'devnet':
    case 'testnet':
    case 'mainnet-beta':
    default:
      return APP_1713693601_PROGRAM_ID;
  }
}
