import constants from './constants'


const html = `
  <div class="farmfactory-overlay">
    <div class="farmfactory-modal">
      <button class="farmfactory-closeButton" id="${constants.ids.wrongNetworkModal.closeButton}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>
        </svg>
      </button>
      <div class="farmfactory-inner">
        Wrong network, connect to MAINNET
      </div>
    </div>
  </div>
`

const open = () => {
  document.getElementById(constants.ids.modalsRoot).innerHTML = html

  document.getElementById(constants.ids.wrongNetworkModal.closeButton).addEventListener('click', () => {
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
