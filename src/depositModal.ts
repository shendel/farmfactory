import { getState } from './state'
import events from './events'
import constants from './constants'
import infoModal from './infoModal'


let isLoading = false

const loader = '<div class="loader"><div></div><div></div><div></div></div>'

const html = `
  <div class="overlay">
    <div class="modal depositModal">
      <button class="closeButton" id="${constants.ids.depositModal.closeButton}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>
        </svg>
      </button>
      <div class="inner">
        <div class="title">Deposit ROOBEE-ETH LPs Tokens</div>
        <div class="row center">
          <div class="balanceTitle">Available to Deposit:</div>
          <div class="balanceValue" id="${constants.ids.depositModal.availableToDeposit}">
            ${loader}
          </div>
        </div>
        <input id="${constants.ids.depositModal.depositAmount}" type="number" />
      </div>
      <div class="footer">
        <button class="button yellow" id="${constants.ids.depositModal.depositButton}">Deposit</button>
        <button class="button gray" id="${constants.ids.depositModal.cancelButton}">Cancel</button>
      </div>
    </div>
  </div>
`

const deposit = async () => {
  const { web3, contracts, account } = getState()

  if (isLoading) {
    return
  }

  if (!contracts.farm) {
    infoModal.open('Farm contract is not connected')
    return
  }

  const input = document.getElementById(constants.ids.depositModal.depositAmount) as HTMLInputElement
  const amount = Number(input.value)

  if (amount > 0) {
    try {
      isLoading = true
      document.getElementById(constants.ids.depositModal.depositButton).innerHTML = loader

      const value = web3.utils.toWei(String(amount))
      const res = await contracts.farm.methods.stake(value).send({ from: account })

      if (res.status) {
        infoModal.open('Transaction confirmed!')
      }

      close()
      events.dispatch('deposit success')
    }
    catch (err) {
      console.error(err)

      if (err.code == 'INVALID_ARGUMENT') {
        infoModal.open('Placeholder cannot be empty')
      }
      else {
        infoModal.open(err.message)
      }
    }
    finally {
      isLoading = false
      document.getElementById(constants.ids.depositModal.depositButton).innerHTML = 'Deposit'
    }
  }
}

const open = async () => {
  const { contracts, account } = getState()

  document.getElementById(constants.ids.modalsRoot).innerHTML = html

  const balance = await contracts.staking.methods.balanceOf(account).call()

  document.getElementById(constants.ids.depositModal.availableToDeposit).innerText = String(Number(balance) / 1e18)

  document.getElementById(constants.ids.depositModal.depositButton).addEventListener('click', () => {
    deposit()
  })

  document.getElementById(constants.ids.depositModal.cancelButton).addEventListener('click', () => {
    close()
  })

  document.getElementById(constants.ids.depositModal.closeButton).addEventListener('click', () => {
    close()
  })
}

const close = () => {
  document.getElementById(constants.ids.modalsRoot).innerHTML = ''
}


export default {
  open,
  close,
}
