/* eslint-disable import/prefer-default-export */
import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  braveWallet,
  coinbaseWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig } from 'wagmi';

import { chains, publicClient } from './chains';

console.log('>>> wagmiConfig', chains)
const connectors = connectorsForWallets([
  {
    groupName: 'Popular',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({
        projectId: "a23677c4af3139b4eccb52981f76ad94" || process.env.NEXT_PUBLIC_PROJECT_ID || '',
        chains,
        shimDisconnect: false,
      }),
      walletConnectWallet({
        projectId: "a23677c4af3139b4eccb52981f76ad94" || process.env.NEXT_PUBLIC_PROJECT_ID || '',
        chains,
      }),
    ],
  }
]);

export const wagmiConfig = createConfig({
  publicClient,
  connectors,
  // turn off autoConnect in development
  // autoConnect: true,
});
