import { getState } from './state'
import events from './events'
import constants from './constants'
import infoModal from './infoModal'


let isLoading = false

const loader = '<div class="loader"><div></div><div></div><div></div></div>'

const html = `
  <div class="overlay">
    <div class="modal depositModal">
      <button class="closeButton" id="${constants.ids.withdrawModal.closeButton}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>
        </svg>
      </button>
      <div class="inner">
        <div class="title">Withdraw ROOBEE-ETH LPs Tokens</div>
        <div class="row center">
          <div class="balanceTitle">Available to Withdraw:</div>
          <div class="balanceValue" id="${constants.ids.withdrawModal.availableToWithdraw}">
            ${loader}
          </div>
        </div>
        <input id="${constants.ids.withdrawModal.withdrawAmount}" type="number" />
      </div>
      <div class="footer">
        <button class="button yellow" id="${constants.ids.withdrawModal.withdrawButton}">Withdraw</button>
        <button class="button gray" id="${constants.ids.withdrawModal.cancelButton}">Cancel</button>
      </div>
    </div>
  </div>
`

const withdraw = async () => {
  const { web3, contracts, account } = getState()

  if (isLoading) {
    return
  }

  if (!contracts.farm) {
    infoModal.open('Farm contract is not connected')
    return
  }

  const input = document.getElementById(constants.ids.withdrawModal.withdrawAmount) as HTMLInputElement
  const amount = Number(input.value)

  if (amount > 0) {
    try {
      isLoading = true
      document.getElementById(constants.ids.withdrawModal.withdrawButton).innerHTML = loader

      const value = web3.utils.toWei(String(amount))
      const res = await contracts.farm.methods.withdraw(value).send({ from: account })

      if (res.status) {
        infoModal.open('Transaction confirmed!')
      }

      close()
      events.dispatch('withdraw success')
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
      document.getElementById(constants.ids.withdrawModal.withdrawButton).innerHTML = 'Withdraw'
    }
  }
}

const open = async () => {
  const { contracts, account } = getState()

  document.getElementById(constants.ids.modalsRoot).innerHTML = html

  const balance = await contracts.farm.methods.balanceOf(account).call()

  document.getElementById(constants.ids.withdrawModal.availableToWithdraw).innerText = String(Number(balance) / 1e18)

  document.getElementById(constants.ids.withdrawModal.withdrawButton).addEventListener('click', () => {
    withdraw()
  })

  document.getElementById(constants.ids.withdrawModal.cancelButton).addEventListener('click', () => {
    close()
  })

  document.getElementById(constants.ids.withdrawModal.closeButton).addEventListener('click', () => {
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
