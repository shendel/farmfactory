import constants from './constants'
import { getState } from './state'
import events from './events'


let interval

const init = async () => {
  const { contracts } = getState()

  const root = document.getElementById(constants.ids.timerRoot)

  const farmingFinishDate = await contracts.farm.methods.periodFinish().call()
  const finishDate = Number(farmingFinishDate.toString())

  if (finishDate - Date.now() / 1000 > 0) {
    if (interval) {
      clearInterval(interval)
    }

    interval = setInterval(() => {
      let delta = Math.floor((finishDate * 1000 - Date.now()) / 1000)

      const days = Math.floor(delta / 86400)

      delta -= days * 86400

      const hours = Math.floor(delta / 3600) % 24

      delta -= hours * 3600

      const minutes = Math.floor(delta / 60) % 60

      delta -= minutes * 60

      const seconds = delta % 60
      const timeLeft = `${days < 10 ? `0${days}` : days}:${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

      root.innerText = timeLeft
    }, 1000)
  }
  else {
    root.innerText = '00:00:00:00'
  }
}

const injectHtml = async () => {
  const root = document.getElementById(constants.ids.timerRoot)

  if (root) {
    events.subscribe('data initialized', () => {
      init()
    })
  }
}


export default {
  injectHtml,
}
