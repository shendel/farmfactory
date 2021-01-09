import { getState } from './state'
import events from './events'
import constants from './constants'
import infoModal from './infoModal'


let isLoading = false

const loader = '<div class="farmfactory-loader"><div></div><div></div><div></div></div>'

const html = `
  <div class="farmfactory-overlay">
    <div class="farmfactory-modal farmfactory-depositModal">
      <button class="farmfactory-closeButton" id="${constants.ids.withdrawModal.closeButton}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>
        </svg>
      </button>
      <div class="farmfactory-inner">
        <div class="farmfactory-title" id="${constants.ids.withdrawModal.title}">Withdraw Tokens</div>
        <div class="farmfactory-row center">
          <div class="farmfactory-balanceTitle">Available to Withdraw:</div>
          <div class="farmfactory-balanceValue" id="${constants.ids.withdrawModal.availableToWithdraw}">
            ${loader}
          </div>
        </div>
        <input id="${constants.ids.withdrawModal.withdrawAmount}" type="number" />
      </div>
      <div class="farmfactory-footer">
        <button class="farmfactory-button yellow" id="${constants.ids.withdrawModal.withdrawButton}">Withdraw</button>
        <button class="farmfactory-button gray" id="${constants.ids.withdrawModal.cancelButton}">Cancel</button>
      </div>
    </div>
  </div>
`

const open = async () => {
  const { opts, contracts, account, stakingTokenName } = getState()

  document.getElementById(constants.ids.modalsRoot).innerHTML = html

  const title = document.getElementById(constants.ids.withdrawModal.title)
  const availableToWithdraw = document.getElementById(constants.ids.withdrawModal.availableToWithdraw)
  const withdrawButton = document.getElementById(constants.ids.withdrawModal.withdrawButton)
  const cancelButton = document.getElementById(constants.ids.withdrawModal.cancelButton)
  const closeButton = document.getElementById(constants.ids.withdrawModal.closeButton)

  title.innerText = `Withdraw ${stakingTokenName}`

  if (opts.withdrawButtonTitle) {
    withdrawButton.innerText = opts.withdrawButtonTitle
  }

  const balance = await contracts.farm.methods.balanceOf(account).call()

  availableToWithdraw.innerText = String(Number(balance) / 1e18)

  withdrawButton.addEventListener('click', withdraw)
  cancelButton.addEventListener('click', close)
  closeButton.addEventListener('click', close)
}

const close = () => {
  document.getElementById(constants.ids.modalsRoot).innerHTML = ''
}


export default {
  open,
  close,
}
