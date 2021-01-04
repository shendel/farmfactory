import events from './events'
import { getState } from './state'
import withdrawModal from './withdrawModal'
import depositModal from './depositModal'
import infoModal from './infoModal'
import constants from './constants'


let isLoading = false

const debug = (str, ...args) => console.log(`farmingPage: ${str}`, ...args)

const loader = '<div class="loader"><div></div><div></div><div></div></div>'

const html = `
  <div>
    <div class="headline">
      <div>
        <div class="title">Total LPs Staked</div>
        <div class="value" id="${constants.ids.farmingPage.totalSupply}"></div>
      </div>
      <div>
        <div class="title">Daily Pool Rewards</div>
        <div class="value" id="${constants.ids.farmingPage.rate}"></div>
      </div>
    </div>
    <div class="widget row">
      <div class="farmingCard">
        <div class="amount" id="${constants.ids.farmingPage.earnedTokens}">&mdash;</div>
        <div class="title">Earned</div>
        <div class="buttonContainer">
          <button class="button blue" id="${constants.ids.farmingPage.harvestButton}">Harvest</button>
        </div>
      </div>
      <div class="farmingCard">
        <div class="amount" id="${constants.ids.farmingPage.balance}">&mdash;</div>
        <div class="title">LPs Token Staked</div>
        <div class="buttonContainer" id="${constants.ids.farmingPage.lpsButtons}"></div>
      </div>
    </div>
  </div>
`

const approveButtonHtml = `
  <button class="button yellow" id="${constants.ids.farmingPage.approveButton}">Approve LPS</button>
`

const depositAndWithdrawButtonsHtml = `
  <button class="button yellow" id="${constants.ids.farmingPage.depositButton}">Deposit</button><br />
  <button class="button gray" id="${constants.ids.farmingPage.withdrawButton}">Withdraw</button>
`

const getData = async () => {
  debug('getData')

  const { opts, contracts, account } = getState()

  if (!contracts) {
    return
  }

  try {
    const [
      earnedTokens,
      farmingBalance,
      farmingRate,
      farmingTotalSupply,
      allowance,
    ] = await Promise.all([
      contracts.farm.methods.earned(account).call(),
      contracts.farm.methods.balanceOf(account).call(),
      contracts.farm.methods.rewardRate().call(),
      contracts.farm.methods.totalSupply().call(),
      contracts.staking.methods.allowance(account, opts.farmAddress).call(),
    ])

    document.getElementById(constants.ids.farmingPage.totalSupply).innerText = String(farmingTotalSupply / 1e18)
    document.getElementById(constants.ids.farmingPage.rate).innerText = farmingRate

    document.getElementById(constants.ids.farmingPage.earnedTokens).innerText = String(earnedTokens / 1e18)
    document.getElementById(constants.ids.farmingPage.balance).innerText = String(farmingBalance / 1e18)

    injectLpsButton(Number(allowance) > 0)
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
    const value = 0xfffffffffffff

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

const injectLpsButton = (isApproved) => {
  const node = document.getElementById(constants.ids.farmingPage.lpsButtons)

  if (isApproved) {
    node.innerHTML = depositAndWithdrawButtonsHtml

    document.getElementById(constants.ids.farmingPage.depositButton).addEventListener('click', () => {
      depositModal.open()
    })

    document.getElementById(constants.ids.farmingPage.withdrawButton).addEventListener('click', () => {
      withdrawModal.open()
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
  document.getElementById(constants.ids.farmingRoot).innerHTML = html

  document.getElementById(constants.ids.farmingPage.harvestButton).addEventListener('click', () => {
    harvest()
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
