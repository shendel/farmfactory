import { getState } from './state'
import constants from './constants'
import events from './events'


let rewardsTimeLeftInterval

const debug = (str, ...args) => console.log(`mainPage: ${str}`, ...args)

const html = `
  <div>
    <div class="widget row">
      <div class="balanceCard">
        <div class="title">Your balance</div>
        <div class="value" id="${constants.ids.mainPage.balance}">&mdash;</div>
        <div class="total">
          <div class="title">Reward Per Token</div>
          <div class="value" id="${constants.ids.mainPage.rewardPerToken}">&mdash;</div>
        </div>
      </div>
      <div class="balanceCard rewardsTimeLeft">
        <div class="title">Rewards end in</div>
        <div class="value" id="${constants.ids.mainPage.rewardsTimeLeft}">--:--:--:--</div>
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
    farmingFinishDate,
  ] = await Promise.all([
    contracts.rewards.methods.balanceOf(account).call(),
    contracts.farm.methods.rewardPerToken().call(),
    contracts.farm.methods.periodFinish().call(),
  ])

  document.getElementById(constants.ids.mainPage.balance).innerText = web3.utils.fromWei(balance)
  document.getElementById(constants.ids.mainPage.rewardPerToken).innerText = rewardPerToken

  const finishDate = Number(farmingFinishDate.toString())

  if (finishDate - Date.now() / 1000 > 0) {
    if (rewardsTimeLeftInterval) {
      clearInterval(rewardsTimeLeftInterval)
    }

    rewardsTimeLeftInterval = setInterval(() => {
      let delta = Math.floor((finishDate * 1000 - Date.now()) / 1000)

      const days = Math.floor(delta / 86400)

      delta -= days * 86400

      const hours = Math.floor(delta / 3600) % 24

      delta -= hours * 3600

      const minutes = Math.floor(delta / 60) % 60

      delta -= minutes * 60

      const seconds = delta % 60
      const timeLeft = `${days < 10 ? `0${days}` : days}:${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

      document.getElementById(constants.ids.mainPage.rewardsTimeLeft).innerText = timeLeft
    }, 1000)
  }
  else {
    document.getElementById(constants.ids.mainPage.rewardsTimeLeft).innerText = '00:00:00:00'
  }
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
