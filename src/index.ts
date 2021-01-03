import mainPage from './mainPage'
import farmingPage from './farmingPage'
import wrongNetworkModal from './wrongNetworkModal'
import connectModal from './connectModal'
import infoModal from './infoModal'
import { initData } from './common'
import { setState, getState } from './state'
import constants from './constants'
import styles from './styles'


const accountUnlockedStorageKey = 'ff-account-unlocked'

const debug = (str, ...args) => console.log(`index: ${str}`, ...args)

const appendStyles = () => {
  const head = document.head || document.getElementsByTagName('head')[0]
  const style = document.createElement('style')

  style.type = 'text/css'
  style.appendChild(document.createTextNode(styles))

  head.appendChild(style)
}

const appendModalsHtml = () => {
  const modalsNode = document.createElement('div')
  const infoModalNode = document.createElement('div')

  modalsNode.setAttribute('id', constants.ids.modalsRoot)
  infoModalNode.setAttribute('id', constants.ids.infoModalRoot)

  document.body.appendChild(modalsNode)
  document.body.appendChild(infoModalNode)
}

const initApp = async () => {
  const isMainnet = Number(window.ethereum.networkVersion) === 42 // 42 - Kovan, 1 - Mainnet

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

        getState().pageContext.getData()
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

const init = async () => {
  await loadScript('https://cdnjs.cloudflare.com/ajax/libs/web3/1.3.1/web3.min.js')

  appendStyles()
  appendModalsHtml()

  let pageContext

  if (document.getElementById(constants.ids.mainRoot)) {
    pageContext = mainPage
    pageContext.injectHtml()
    setState({ pageContext })
  } else

  if (document.getElementById(constants.ids.farmingRoot)) {
    pageContext = farmingPage
    pageContext.injectHtml()
    setState({ pageContext })
  }
  else {
    infoModal.open('Template variables not found! Please use {farmfactory-main-root} or {farmfactory-farming-root}.')
  }

  await attemptToConnect()
}

const farmFactory = {
  init,
}


export default farmFactory
