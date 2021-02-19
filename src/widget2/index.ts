import web3Modal from './web3Modal'
import infoModal from './infoModal'
import widget from './widget'
import { setState } from './state'


type Opts = {
  widget: any
  wallet: any
}

const init = async (opts: Opts) => {
  if (!opts) {
    throw new Error('options required')
  }

  const { networkName, farmAddress, rewardsAddress, stakingAddress } = opts.widget || {}

  if (!networkName || !farmAddress || !rewardsAddress || !stakingAddress) {
    throw new Error('widgetOptions required')
  }

  setState({ opts })

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
  if (location.protocol !== 'https:') {
    // https://ethereum.stackexchange.com/a/62217/620
    infoModal.open('FarmFactory widget requires HTTPS connection.')
    // document.querySelector('#btn-connect').setAttribute('disabled', 'disabled')
    // return
  }

  const instance = web3Modal.init()

  widget.injectHtml()

  if (instance.providerController.cachedProvider) {
    web3Modal.connect()
  }
}

const farmFactory = {
  init,
}


export default farmFactory
