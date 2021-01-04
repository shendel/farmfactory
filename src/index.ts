import mainPage from './mainPage'
import farmingPage from './farmingPage'
import wrongNetworkModal from './wrongNetworkModal'
import connectModal from './connectModal'
import infoModal from './infoModal'
import { initData } from './common'
import constants from './constants'
import events from './events'
import { setState, getState } from './state'
import type { State } from './state'


const accountUnlockedStorageKey = 'ff-account-unlocked'

const debug = (str, ...args) => console.log(`index: ${str}`, ...args)

const appendModalsHtml = () => {
  const modalsNode = document.createElement('div')
  const infoModalNode = document.createElement('div')

  modalsNode.setAttribute('id', constants.ids.modalsRoot)
  infoModalNode.setAttribute('id', constants.ids.infoModalRoot)

  document.body.appendChild(modalsNode)
  document.body.appendChild(infoModalNode)
}

const initApp = async () => {
  const { opts } = getState()

  const isMainnet = Number(window.ethereum.networkVersion) === opts.networkId // 42 - Kovan, 1 - Mainnet

  if (!isMainnet) {
    wrongNetworkModal.open()
    return
  }

  const isAccountUnlocked = localStorage.getItem(accountUnlockedStorageKey) === 'true'

  if (isAccountUnlocked) {
    debug('Account is unlocked')

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' })

      if (accounts[0]) {
        await initData({ accounts })

        events.dispatch('update page data')
      }
      else {
        debug('Account not found')
        connectModal.open()
      }
    }
    catch (err) {
      console.error(err)
      localStorage.removeItem(accountUnlockedStorageKey)
      connectModal.open()
    }
  }
  else {
    debug('Account is locked')
    connectModal.open()
  }
}

const attemptToConnect = async () => {
  debug('initialConnect')

  if (!window.ethereum) {
    infoModal.open('Please install MetaMask')
    return
  }

  debug('MetaMask is installed')

  window.ethereum.on('networkChanged', () => {
    initApp()
  })

  initApp()
}

const loadScript = (src) => new Promise((resolve, reject) => {
  const script = document.createElement('script')

  script.onload = resolve
  script.onerror = reject
  script.src = src

  document.head.appendChild(script)
})

const init = async (opts: State['opts']) => {
  const { networkId, farmAddress, rewardsAddress, stakingAddress } = opts

  if (!networkId || !farmAddress || !rewardsAddress || !stakingAddress) {
    infoModal.open('Check farmFactory.init(options). Required options: networkId, farmAddress, rewardsAddress, stakingAddress.')
    return
  }

  setState({ opts })

  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/web3/1.3.1/web3.min.js')

  appendModalsHtml()

  const mainRoot = document.getElementById(constants.ids.mainRoot)
  const farmingRoot = document.getElementById(constants.ids.farmingRoot)

  if (!mainRoot && !farmingRoot) {
    infoModal.open('Template variables not found! Please use {farmfactory-main-root} or {farmfactory-farming-root}.')
    return
  }

  if (mainRoot) {
    mainPage.injectHtml()
  }

  if (farmingRoot) {
    farmingPage.injectHtml()
  }

  await attemptToConnect()
}

const farmFactory = {
  init,
}


export default farmFactory
