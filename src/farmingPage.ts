import events from './events'
import { getState } from './state'
import withdrawModal from './withdrawModal'
import depositModal from './depositModal'
import infoModal from './infoModal'
import constants from './constants'


let isLoading = false

const debug = (str, ...args) => console.log(`farmingPage: ${str}`, ...args)

const loader = '<div class="farmfactory-loader"><div></div><div></div><div></div></div>'

// const html = `
//   <div>
//     <div class="farmfactory-headline">
//       <div>
//         <div class="farmfactory-title">Total LPs Staked</div>
//         <div class="farmfactory-value" id="${constants.ids.farmingPage.totalSupply}"></div>
//       </div>
//       <div>
//         <div class="farmfactory-title">Daily Pool Rewards</div>
//         <div class="farmfactory-value" id="${constants.ids.farmingPage.rate}"></div>
//       </div>
//     </div>
//     <div class="farmfactory-widget">
//       <div class="farmfactory-farmingCard">
//         <div class="farmfactory-amount" id="${constants.ids.farmingPage.earnedTokens}">&mdash;</div>
//         <div class="farmfactory-title">Earned</div>
//         <div class="farmfactory-buttonContainer">
//           <button class="farmfactory-button blue disabled" id="${constants.ids.farmingPage.harvestButton}">Harvest</button>
//         </div>
//       </div>
//       <div class="farmfactory-farmingCard">
//         <div class="farmfactory-amount" id="${constants.ids.farmingPage.balance}">&mdash;</div>
//         <div class="farmfactory-title">LPs Token Staked</div>
//         <div class="farmfactory-buttonContainer" id="${constants.ids.farmingPage.lpsButtons}"></div>
//       </div>
//     </div>
//   </div>
// `

const html = `
  <div>
    <div class="farmfactory-widget">
      <div class="farmfactory-farmingCard">
        <div class="farmfactory-amount" id="${constants.ids.farmingPage.earnedTokens}">&mdash;</div>
        <div class="farmfactory-title">Earned</div>
        <div class="farmfactory-buttonContainer">
          <button class="farmfactory-button blue disabled" id="${constants.ids.farmingPage.harvestButton}">Harvest</button>
        </div>
      </div>
      <div class="farmfactory-farmingCard">
        <div class="farmfactory-amount" id="${constants.ids.farmingPage.balance}">&mdash;</div>
        <div class="farmfactory-title" id="${constants.ids.farmingPage.balanceTitle}">Token Staked</div>
        <div class="farmfactory-buttonContainer" id="${constants.ids.farmingPage.lpsButtons}"></div>
      </div>
    </div>
  </div>
`

const approveButtonHtml = `
  <button class="farmfactory-button yellow" id="${constants.ids.farmingPage.approveButton}">Approve LPS</button>
`

const depositAndWithdrawButtonsHtml = `
  <button class="farmfactory-button yellow" id="${constants.ids.farmingPage.depositButton}">Deposit</button><br />
  <button class="farmfactory-button gray" id="${constants.ids.farmingPage.withdrawButton}">Withdraw</button>
`

const getData = async () => {
  debug('getData')

  const { opts, contracts, account, stakingTokenName } = getState()

  if (!contracts) {
    return
  }

  try {
    const [
      earnedTokens,
      farmingBalance,
      // farmingRate,
      // farmingTotalSupply,
      allowance,
    ] = await Promise.all([
      contracts.farm.methods.earned(account).call(),
      contracts.farm.methods.balanceOf(account).call(),
      // contracts.farm.methods.rewardRate().call(),
      // contracts.farm.methods.totalSupply().call(),
      contracts.staking.methods.allowance(account, opts.farmAddress).call(),
    ])

    injectStakingButtons(Number(allowance) > 0)

    // document.getElementById(constants.ids.farmingPage.totalSupply).innerText = String(farmingTotalSupply / 1e18)
    // document.getElementById(constants.ids.farmingPage.rate).innerText = farmingRate

    document.getElementById(constants.ids.farmingPage.earnedTokens).innerText = String(earnedTokens / 1e18)
    document.getElementById(constants.ids.farmingPage.balanceTitle).innerText = `${stakingTokenName}s Token Staked`
    document.getElementById(constants.ids.farmingPage.balance).innerText = String(farmingBalance / 1e18)

    if (earnedTokens > 0) {
      document.getElementById(constants.ids.farmingPage.harvestButton).classList.remove('disabled')
    }
    else {
      document.getElementById(constants.ids.farmingPage.harvestButton).classList.add('disabled')
    }

    if (farmingBalance > 0) {
      document.getElementById(constants.ids.farmingPage.withdrawButton).classList.remove('disabled')
    }
    else {
      document.getElementById(constants.ids.farmingPage.withdrawButton).classList.add('disabled')
    }
  }
  catch (err) {
    console.error(err)
    infoModal.open(err.message)
  }
}

const harvest = async () => {
  debug('init harvest')

  const { contracts, account } = getState()

  if (isLoading) {
    return
  }

  if (!account) {
    // Vue.prototype.$bus.$emit('open-wallet-modal')
    return
  }

  if (!contracts.farm) {
    infoModal.open('Farm contract is not connected')
    return
  }

  try {
    isLoading = true
    document.getElementById(constants.ids.farmingPage.harvestButton).innerHTML = loader;

    const res = await contracts.farm.methods.getReward().send({ from: account })

    if (res.status) {
      infoModal.open('Transaction confirmed!')
    }

    getData()
  }
  catch (err) {
    console.error(err)
    infoModal.open(err.message)
  }
  finally {
    isLoading = false
    document.getElementById(constants.ids.farmingPage.harvestButton).innerHTML = 'Harvest';
  }
}

const approve = async () => {
  debug('init approve')

  const { opts, contracts, account } = getState()

  if (isLoading) {
    return
  }

  if (!account) {
    // Vue.prototype.$bus.$emit('open-wallet-modal')
    return
  }

  if (!contracts.staking) {
    infoModal.open('Staking contract is not connected')
    return
  }

  try {
    isLoading = true
    document.getElementById(constants.ids.farmingPage.approveButton).innerHTML = loader;

    const spender = opts.farmAddress
    const value = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff

    const res = await contracts.staking.methods.approve(spender, value).send({ from: account })

    if (res.status) {
      infoModal.open('Transaction confirmed!')
    }

    getData()
  }
  catch (err) {
    console.error(err)
    infoModal.open(err.message)
  }
  finally {
    isLoading = false
    document.getElementById(constants.ids.farmingPage.approveButton).innerHTML = 'Approve';
  }
}

const injectStakingButtons = (isApproved) => {
  const node = document.getElementById(constants.ids.farmingPage.lpsButtons)

  if (isApproved) {
    const { opts } = getState()

    node.innerHTML = depositAndWithdrawButtonsHtml

    const depositButton = document.getElementById(constants.ids.farmingPage.depositButton)
    const withdrawButton = document.getElementById(constants.ids.farmingPage.withdrawButton)

    if (opts.depositButtonTitle) {
      depositButton.innerText = opts.depositButtonTitle
    }

    if (opts.withdrawButtonTitle) {
      withdrawButton.innerText = opts.withdrawButtonTitle
    }

    depositButton.addEventListener('click', () => {
      depositModal.open()
    })

    withdrawButton.addEventListener('click', () => {
      if (!withdrawButton.classList.contains('disabled')) {
        withdrawModal.open()
      }
    })
  }
  else {
    node.innerHTML = approveButtonHtml

    document.getElementById(constants.ids.farmingPage.approveButton).addEventListener('click', () => {
      approve()
    })
  }
}

const injectHtml = () => {
  const { opts } = getState()

  document.getElementById(constants.ids.farmingRoot).innerHTML = html

  const harvestButton = document.getElementById(constants.ids.farmingPage.harvestButton)

  if (opts.harvestButtonTitle) {
    harvestButton.innerText = opts.harvestButtonTitle
  }

  harvestButton.addEventListener('click', () => {
    if (!harvestButton.classList.contains('disabled')) {
      harvest()
    }
  })

  events.subscribe('deposit success', () => {
    getData()
  })

  events.subscribe('withdraw success', () => {
    getData()
  })

  events.subscribe('update page data', getData)
}


export default {
  injectHtml,
  getData,
}
