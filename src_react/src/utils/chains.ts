// @ts-nocheck
import { configureChains } from 'wagmi';
/*
import {
  arbitrum,
  gnosis,
  goerli,
  mainnet,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

console.log('>>> goerli', goerli)
*/
import { publicProvider } from 'wagmi/providers/public'

import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const netInfo = {
  id: 5,
  network: "goerli",
  name: "Goerli",
  nativeCurrency: {
    name: "Goerli Ether",
    symbol: "ETH",
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: [
        "https://eth-goerli.g.alchemy.com/v2/wNvkA78LYEG7fb5S5z4nJIfB22dAcvuH"
      ]
    },
    public: {
      http: [
        "https://eth-goerli.g.alchemy.com/v2/wNvkA78LYEG7fb5S5z4nJIfB22dAcvuH"
      ]
    }
  },
  blockExplorers: {
    etherscan: {
      name: "Etherscan",
      url: "https://goerli.etherscan.io"
    },
    default: {
      name: "Etherscan",
      url: "https://goerli.etherscan.io"
    }
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    ensUniversalResolver: {
      address: "0x56522D00C410a43BFfDF00a9A569489297385790",
      blockCreated: 8765204
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 6507670
    }
  },
  testnet: true
}

const getChainRPC = (chainId) => {
  switch(chainId) {
    case 5:
      return "https://eth-goerli.g.alchemy.com/v2/wNvkA78LYEG7fb5S5z4nJIfB22dAcvuH"
  }
}
export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ netInfo ],
  [
    jsonRpcProvider({
      rpc: (chain) => ({
        http: getChainRPC(chain.id),
      }),
    }),
    /*
    jsonRpcProvider({
      rpc: (chain) => {
        switch (chain) {
          case 5:
            return {
              http: `https://eth-goerli.g.alchemy.com/v2/wNvkA78LYEG7fb5S5z4nJIfB22dAcvuH`,
            }
            break
        }
      }
    }),
    */
    //publicProvider(),
  ],
);
