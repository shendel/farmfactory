import { getState } from './state'
import web3modal from './web3modal'
import constants from './constants'
import loader from './loader'
import toFixed from './toFixed'
import events from './events'


const html = `
  <div class="farmfactory-form farmfactory-connect">
    Connect wallet to enable widget.
    <div class="farmfactory-row">
      <button class="farmfactory-button" id="${constants.ids.connectForm.connectButton}">Connect</button>
    </div>
  </div>
`

const addListeners = () => {
  const connectButton = document.getElementById(constants.ids.connectForm.connectButton)

  connectButton.addEventListener('click', web3modal.connect)
  events.subscribe('connect', hide)
}

const show = async () => {
  const { contracts, account, stakingTokenName, stakingDecimals } = getState()

  const root = document.getElementById(constants.ids.widget.root)
  const title = document.getElementById(constants.ids.depositForm.title)

  root.classList.add('farmfactory-connect-visible')

  title.innerHTML = `Balance: ${loader(true)}`

  const balance = await contracts.staking.methods.balanceOf(account).call()

  title.innerHTML = `Balance: <b>${toFixed(Number(balance) / Math.pow(10, stakingDecimals))} ${stakingTokenName}</b>`
}

const hide = () => {
  document.getElementById(constants.ids.widget.root).classList.remove('farmfactory-connect-visible')
}


export default {
  html,
  addListeners,
  show,
  hide,
}
