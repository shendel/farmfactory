import { Modal } from './modals'
import { getState } from './state'
import infoModal from './infoModal'
import events from './events'
import { formatAmount, toFixed } from './helpers'


const withdrawModal = new Modal({
  title: 'Withdraw',
  content: `
    <div class="ff-text-field-container">
      <div class="ff-text-field-label">Available to withdraw:</div>
      <input class="ff-text-field" type="text" value="" placeholder="0.0" />
    </div>
    <div class="ff-modal-buttons">
      <button class="ff-button" type="button">Withdraw</button>
    </div>
  `,
  onOpen({ contracts, stakingDecimals, stakingTokenSymbol }) {
    const { opts: { networkName }, account } = getState()

    let isLoading = false

    let roundedMaxBalance
    let maxBalance

    const balanceNode = this.elems.root.querySelector('.ff-text-field-label')
    const textField = this.elems.root.querySelector('.ff-text-field')
    const buttonContainer = this.elems.root.querySelector('.ff-modal-buttons')
    const submitButton = this.elems.root.querySelector('.ff-button')

    contracts.farm.methods.balanceOf(account).call()
      .then((balance) => {
        const value = toFixed(Number(balance) / Math.pow(10, stakingDecimals))

        balanceNode.innerHTML = `Available to withdraw: <b>${value} ${stakingTokenSymbol}</b>`

        maxBalance = balance
        roundedMaxBalance = value

        balanceNode.innerHTML = `Available to deposit: <b>${value} ${stakingTokenSymbol}</b> `

        if (value > 0) {
          const useMaxButton = document.createElement('a');
          useMaxButton.className = "ff-max-balance-button"
          useMaxButton.innerHTML = "<b>use max</b>"

          balanceNode.appendChild(useMaxButton);

          useMaxButton.addEventListener('click', () => {
            textField.value = value
          })

        }

      })

    submitButton.addEventListener('click', async () => {
      if (isLoading) {
        return
      }

      const amount = Number(textField.value)

      if (amount > 0) {
        isLoading = true
        submitButton.disabled = true
        submitButton.innerHTML = '<div class="ff-loader"></div>'

        const value = textField.value === roundedMaxBalance ? maxBalance : formatAmount(amount, stakingDecimals)

        contracts.farm.methods.withdraw(value).send({ from: account })
          .on('transactionHash', (hash) => {
            const trxNode = document.createElement('div')
            trxNode.classList.add('ff-transaction-link')

            let explorerLinkWithHash = `https://${networkName.toLowerCase()}.etherscan.io/tx/${hash}`

            if (networkName.toLowerCase() === 'bsc') {
              explorerLinkWithHash = `https://bscscan.com/tx/${hash}`
            }

            if (networkName.toLowerCase() === "xdai") {
              explorerLinkWithHash = `https://blockscout.com/xdai/mainnet/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'fantom') {
              explorerLinkWithHash = `https://ftmscan.com/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'harmony') {
              explorerLinkWithHash = `https://explorer.harmony.one/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'avax') {
              explorerLinkWithHash = `https://snowtrace.io/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'moonriver') {
              explorerLinkWithHash = `https://moonriver.moonscan.io/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'aurora') {
              explorerLinkWithHash = `https://aurorascan.dev/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'cronos') {
              explorerLinkWithHash = `https://cronoscan.com/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'ame') {
              explorerLinkWithHash = `https://amescan.io/tx/${hash}`
            }

            if (networkName.toLowerCase() === 'btcix') {
              explorerLinkWithHash = `https://btcixscan.com/tx/${hash}`
            }

            trxNode.innerHTML = `Pending transaction: <a href="${explorerLinkWithHash}" target="_blank">${hash}</a>`

            this.elems.content.insertBefore(trxNode, buttonContainer)
          })
          .on('error', (err) => {
            console.error(err)

            infoModal.open({
              title: 'Transaction failed',
              message: 'Something went wrong. Try again later.'
            })
          })
          .then(() => {
            events.dispatch('withdraw success')

            infoModal.open({
              title: 'Transaction successful',
              message: 'Tokens have been withdrawn to your address.'
            })
          })
      }
    })
  },
})


export default withdrawModal
