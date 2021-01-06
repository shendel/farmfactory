import { getState } from './state'
import constants from './constants'
import events from './events'


const debug = (str, ...args) => console.log(`mainPage: ${str}`, ...args)

const html = `
  <div>
    <div class="farmfactory-widget">
      <div class="farmfactory-balanceCard">
        <div class="farmfactory-title">Your balance</div>
        <div class="farmfactory-value" id="${constants.ids.mainPage.balance}">&mdash;</div>
        <div class="farmfactory-total">
          <div class="farmfactory-title">Reward Per Token</div>
          <div class="farmfactory-value" id="${constants.ids.mainPage.rewardPerToken}">&mdash;</div>
        </div>
      </div>
      <div class="farmfactory-balanceCard rewardsTimeLeft">
        <div class="farmfactory-title">Rewards end in</div>
        <div class="farmfactory-value" id="${constants.ids.mainPage.rewardsTimeLeft}">--:--:--:--</div>
      </div>
    </div>
  </div>
`

const getData = async () => {
  debug('getData')

  const { web3, contracts, account } = getState()

  if (!contracts) {
    return
  }

  const [
    balance,
    rewardPerToken, // amount of rewards tokens per one staking token
  ] = await Promise.all([
    contracts.rewards.methods.balanceOf(account).call(),
    contracts.farm.methods.rewardPerToken().call(),
    contracts.farm.methods.periodFinish().call(),
  ])

  document.getElementById(constants.ids.mainPage.balance).innerText = web3.utils.fromWei(balance)
  document.getElementById(constants.ids.mainPage.rewardPerToken).innerText = rewardPerToken
}

const injectHtml = () => {
  const ffMainHtmlNode = document.getElementById(constants.ids.mainRoot)

  ffMainHtmlNode.innerHTML = html

  events.subscribe('update page data', getData)
}


export default {
  injectHtml,
  getData,
}
