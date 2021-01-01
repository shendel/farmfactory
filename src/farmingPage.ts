import { getState } from './state'
import events from './events'
import withdrawModal from './withdrawModal'
import depositModal from './depositModal'
import infoModal from './infoModal'


let isLoading = false

const debug = (str, ...args) => console.log(`farmingPage: ${str}`, ...args)

const loader = '<div class="loader"><div></div><div></div><div></div></div>'

const html = `
  <div>
    <div class="headline">
      <div>
        <div class="title">Total LPs Staked</div>
        <div class="value" id="farmingTotalSupply"></div>
      </div>
      <div>
        <div class="title">Daily Pool Rewards</div>
        <div class="value" id="farmingRate"></div>
      </div>
    </div>
    <div class="widget row">
      <div class="farmingCard">
        <div class="amount" id="earnedTokens">&mdash;</div>
        <div class="title">Earned</div>
        <div class="buttonContainer">
          <button class="button blue" id="harvestButton">Harvest</button>
        </div>
      </div>
      <div class="farmingCard">
        <div class="amount" id="farmingBalance">&mdash;</div>
        <div class="title">LPs Token Staked</div>
        <div class="buttonContainer" id="lpsButtons"></div>
      </div>
    </div>
  </div>
`

const approveButtonHtml = `
  <button class="button yellow" id="approveButton">Approve LPS</button>
`

const depositAndWithdrawButtonsHtml = `
  <button class="button yellow" id="depositButton">Deposit</button><br />
  <button class="button gray" id="withdrawButton">Withdraw</button>
`

const getData = async () => {
  debug('getData')

  const { contracts, account } = getState()

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
      contracts.staking.methods.allowance(account, window.farmAddress).call(),
    ])

    document.getElementById('farmingTotalSupply').innerText = String(farmingTotalSupply / 1e18)
    document.getElementById('farmingRate').innerText = farmingRate

    document.getElementById('earnedTokens').innerText = String(earnedTokens / 1e18)
    document.getElementById('farmingBalance').innerText = String(farmingBalance / 1e18)

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
    document.getElementById('harvestButton').innerHTML = loader;

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
    document.getElementById('harvestButton').innerHTML = 'Harvest';
  }
}

const approve = async () => {
  debug('init approve')

  const { contracts, account } = getState()

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
    document.getElementById('harvestButton').innerHTML = loader;

    // TODO values? - added on 12/27/20 by pavelivanov
    const spender = window.farmAddress
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
    document.getElementById('harvestButton').innerHTML = 'Approve';
  }
}

const injectLpsButton = (isApproved) => {
  const node = document.getElementById('lpsButtons')

  if (isApproved) {
    node.innerHTML = depositAndWithdrawButtonsHtml

    document.getElementById('depositButton').addEventListener('click', () => {
      depositModal.open()
    })

    document.getElementById('withdrawButton').addEventListener('click', () => {
      withdrawModal.open()
    })
  }
  else {
    node.innerHTML = approveButtonHtml

    document.getElementById('approveButton').addEventListener('click', () => {
      approve()
    })
  }
}

const injectHtml = () => {
  document.getElementById('ffFarmingHtml').innerHTML = html

  document.getElementById('harvestButton').addEventListener('click', () => {
    harvest()
  })

  events.subscribe('deposit success', () => {
    getData()
  })

  events.subscribe('withdraw success', () => {
    getData()
  })

  // events.subscribe('state change', (state) => {
  //   if (isApproved !== state.isApproved) {
  //     injectLpsButton()
  //   }
  // })
}


export default {
  injectHtml,
  getData,
}
