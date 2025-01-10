import { setState, getState } from './state'


const networks = {
  mainnet: 'https://mainnet.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
  ropsten: 'https://ropsten.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
  kovan: 'https://kovan.infura.io/v3/5ffc47f65c4042ce847ef66a3fa70d4c',
  arbeth_mainnet: 'https://arb1.arbitrum.io/rpc',
  sepolia: 'https://sepolia.infura.io/v3/7213b5d53a4943b7af08a9cfce1cf2e2',
  goerli: 'https://goerli.infura.io/v3/7213b5d53a4943b7af08a9cfce1cf2e2',
  ozone: 'https://node1.ozonechain.io',
  vector_testnet: 'https://testnet-rpc.vsgofficial.com',
  vector_mainnet: 'https://rpc.vscblockchain.org',
}

const setupWeb3 = () => new Promise((resolve, reject) => {
  const activeNetworkName = ({
    1: 'mainnet',
    3: 'ropsten',
    42: 'kovan',
    42161: 'arbeth_mainnet',
    5: 'goerli',
    11155111: 'sepolia',
    4000: 'ozone',
    420044: 'vector_testnet',
    420042: 'vector_mainnet',
  })[window.ethereum && window.ethereum.networkVersion]

  const network = networks[activeNetworkName]
  const web3 = new window.Web3(window.ethereum || window.Web3.givenProvider || new window.Web3.providers.HttpProvider(network))

  if (web3) {
    setState({ web3 })
    resolve()
  }
  else {
    reject()
  }
})


export default setupWeb3
