// @ts-nocheck
const networks = {
  mainnet: 'https://mainnet.infura.io/v3/7213b5d53a4943b7af08a9cfce1cf2e2',
  sepolia: 'https://sepolia.infura.io/v3/7213b5d53a4943b7af08a9cfce1cf2e2',
  goerli: 'https://goerli.infura.io/v3/7213b5d53a4943b7af08a9cfce1cf2e2',
  5: 'https://goerli.infura.io/v3/7213b5d53a4943b7af08a9cfce1cf2e2',
  matic: 'https://polygon-rpc.com/',
  mumbai: 'https://rpc-mumbai.maticvigil.com',
  // https://docs.binance.org/smart-chain/developer/create-wallet.html
  bsc: 'https://bsc-dataseed1.binance.org:443',
  bsc_test: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  xdai: 'https://rpc.xdaichain.com',
  aurora: 'https://mainnet.aurora.dev',
  fantom: 'https://rpc.ftm.tools/',
  harmony: 'https://api.harmony.one',
  avax: 'https://api.avax.network/ext/bc/C/rpc',
  moonriver: 'https://rpc.moonriver.moonbeam.network',
  cronos: 'https://evm.cronos.org',
  ame: 'https://node1.amechain.io/',
  arbeth_mainnet: 'https://arb1.arbitrum.io/rpc',
  btcix: 'https://seed.btcix.org/rpc',
}

export const getChainRPC = (chainId) => {
  switch (chainId.toString()) {
    case '5':
      return 'https://goerli.infura.io/v3/7213b5d53a4943b7af08a9cfce1cf2e2'
  }
}

export default networks