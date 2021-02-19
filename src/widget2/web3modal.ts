import infoModal from './infoModal'
import wrongNetworkModal from './wrongNetworkModal'
import createContracts from './createContracts'
import { getState, setState } from './state'
import events from './events'


const fetchAccountData = async () => {
  const { opts, web3 } = getState()

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId()

  const activeNetwork = ({
    1: 'mainnet',
    3: 'ropsten',
    4: 'rinkeby',
    42: 'kovan',
    56: 'bsc',
    97: 'bsc_test',
  })[chainId]

  console.log('active network name:', activeNetwork)

  wrongNetworkModal.close()

  if (!activeNetwork || activeNetwork.toLowerCase() !== opts.widget.networkName.toLowerCase()) {
    wrongNetworkModal.open()
    return
  }

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts()

  // MetaMask does not give you all accounts, only the selected account
  console.log('accounts:', accounts)

  const account = accounts[0]

  setState({ account })

  if (!account) {
    // TODO disconnect - added on 2/19/21 by pavelivanov
    disconnect()
    return
  }

  console.log('selected account:', account)

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address)

    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/

    const ethBalance = web3.utils.fromWei(balance, 'ether')
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4)

    console.log('address:', address)
    console.log('balance:', humanFriendlyBalance)
  })

  // Because rendering account does its own RPC communication
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers)

  // Display fully loaded UI for wallet data
  console.log('connection finalized')

  events.dispatch('connect')
}

/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
const refreshAccountData = async () => {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  // document.querySelector('#connected').style.display = 'none'
  // document.querySelector('#prepare').style.display = 'block'

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  // document.querySelector('#btn-connect').setAttribute('disabled', 'disabled')
  await fetchAccountData()
  // document.querySelector('#btn-connect').removeAttribute('disabled')
}

const connect = async () => {
  const { web3Modal } = getState()

  try {
    const provider = await web3Modal.connect()

    setState({ provider })

    if (!window.Web3) {
      infoModal.open('Web3 required')
      return
    }

    const web3: any = new window.Web3(provider)

    setState({ web3 })

    const contracts = await createContracts()

    setState({ contracts })

    provider.on('accountsChanged', (accounts) => {
      console.log('account changed', accounts)
      fetchAccountData()
    })

    provider.on('chainChanged', (chainId) => {
      console.log('chain changed', chainId)
      fetchAccountData()
    })

    provider.on('networkChanged', (networkId) => {
      console.log('network changed', networkId)
      fetchAccountData()
    })

    await refreshAccountData()
  }
  catch(err) {
    console.error(err)
  }
}

const disconnect = async () => {
  const { web3Modal, provider } = getState()

  console.log('Killing the wallet connection', provider)

  // TODO: Which providers have close method?
  if (provider.close) {
    await provider.close()

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.

    setState({ provider: null })
  }

  await web3Modal.clearCachedProvider()

  setState({ account: null })

  console.log('finalize disconnect')
}

const init = (): any => {
  const { opts } = getState()

  const web3Modal = new window.Web3Modal.default({
    cacheProvider: true, // optional
    providerOptions: opts.wallet?.providerOptions || {}, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  })

  setState({ web3Modal })

  // @ts-ignore
  window.web3Modal = web3Modal

  web3Modal.on('connect', async (proxy) => {
    console.log('web3Modal connected')
  })

  web3Modal.on('disconnect', async () => {
    console.log('web3Modal disconnected')
  })

  // Subscribe to chainId change
  web3Modal.on('error', (err) => {
    console.log('web3Modal error:', err)
  })

  return web3Modal
}


export default {
  init,
  connect,
  disconnect,
}
