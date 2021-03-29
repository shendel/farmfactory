import events from './events'
import { getState } from './state'
import infoModal from './infoModal'
import web3modal from './web3modal'
import depositModal from './depositModal'
import withdrawModal from './withdrawModal'
import { createContracts, toFixed } from './helpers'


const html = `
  <div class="ff-widget-headline">
    <div class="ff-widget-token-icons">
      <div class="ff-widget-token-icon">
        <span class="ff-skeleton"></span>
      </div>
      <div class="ff-widget-token-icon">
        <span class="ff-skeleton"></span>
      </div>
    </div>
    <div class="ff-title-and-timer">
      <div class="ff-widget-title">
        <span class="ff-skeleton"></span>
      </div>
      <div class="ff-widget-timer">--:--:--:--</div>
    </div>
  </div>
  <div class="ff-widget-section">
    <div class="ff-widget-row2">
      <div class="ff-widget-label">APY:</div>
      <div class="ff-widget-value ff-widget-apy">
        <span class="ff-skeleton"></span>
      </div>
    </div>  
    <div class="ff-widget-row2">
      <div class="ff-widget-label">Earn:</div>
      <div class="ff-widget-value ff-widget-earn-token-name">
        <span class="ff-skeleton"></span>
      </div>
    </div>  
  </div>
  </div>
  <div class="ff-widget-section">
    <div class="ff-widget-section-title">
      <b class="ff-rewards-token-name">
        <span class="ff-skeleton"></span>
      </b> Earned
    </div>
    <div class="ff-widget-row">
      <div class="ff-widget-value ff-widget-earned-amount">
        <span class="ff-skeleton"></span>
      </div>
      <div>
        <button class="ff-button ff-widget-harvest-button" type="button" disabled>Harvest</button>
      </div>
    </div>
  </div>
  <div class="ff-widget-section">
    <div class="ff-widget-section-title">
      <b class="ff-staking-token-name">
        <span class="ff-skeleton"></span>
      </b> Staked
    </div>
    <div class="ff-widget-row">
      <div class="ff-widget-value ff-widget-staked-amount">
        <span class="ff-skeleton"></span>
      </div>
      <div>
        <button class="ff-button ff-widget-deposit-button" type="button" disabled>Deposit</button>
        <button class="ff-button ff-widget-withdraw-button" type="button" disabled>Withdraw</button>
      </div>
    </div>
  </div>
  <button class="ff-button ff-widget-unlock-button" type="button">Unlock wallet</button>
  <button class="ff-button ff-widget-approve-button ff-hidden" type="button">Approve contract</button>
`

const getTokenIcon = (opt: Opts['stakingTokenIcon'], name: string, symbol: string): string => {
  let icon: string

  if (opt) {
    if (typeof opt === 'function') {
      icon = opt(name, symbol)
    }
    else {
      icon = opt
    }
  }

  return icon
}

type GetTokenIconsValues = {
  stakingTokenName: string
  stakingTokenSymbol: string
  rewardsTokenName: string
  rewardsTokenSymbol: string
}

const getTokenIcons = (opts: Opts, values: GetTokenIconsValues) => {
  const { stakingTokenName, stakingTokenSymbol, rewardsTokenName, rewardsTokenSymbol } = values

  const stakingIcon = getTokenIcon(opts.stakingTokenIcon, stakingTokenName, stakingTokenSymbol)
  const rewardsIcon = getTokenIcon(opts.rewardsTokenIcon, rewardsTokenName, rewardsTokenSymbol)

  if (stakingIcon && rewardsIcon) {
    return {
      staking: stakingIcon,
      rewards: rewardsIcon,
    }
  }

  return null
}

type Opts = {
  selector: string
  farmAddress: string
  stakingAddress: string
  rewardsAddress: string
  stakingTokenIcon?: string | ((name: string, symbol: string) => string)
  rewardsTokenIcon?: string | ((name: string, symbol: string) => string)
  apy?: number | (() => Promise<number>)
}

class Widget {

  opts: Opts

  elems: {
    root: HTMLDivElement
    tokenIcons: HTMLDivElement
    title: HTMLDivElement
    timer: HTMLDivElement
    rewardsTokenSymbol: HTMLDivElement
    stakingTokenSymbol: HTMLDivElement
    apyValue: HTMLDivElement
    earnTokenName: HTMLDivElement
    earnedAmount: HTMLDivElement
    stakedAmount:HTMLDivElement
    unlockButton: HTMLButtonElement
    approveButton: HTMLButtonElement
    depositButton: HTMLButtonElement
    withdrawButton: HTMLButtonElement
    harvestButton: HTMLButtonElement
  }

  contracts: {
    farm: any
    staking: any
    rewards: any
  }

  state: {
    stakingTokenSymbol: any
    stakingDecimals: any
    rewardsTokenSymbol: any
    rewardsDecimals: any
  }

  constructor(opts: Opts) {
    this.opts = opts
    this.elems = {} as any
    this.state = {} as any

    const { farmAddress, rewardsAddress, stakingAddress } = opts

    if (!farmAddress || !rewardsAddress || !stakingAddress) {
      throw new Error('Widget requires "farmAddress", "rewardsAddress", "stakingAddress" options')
    }

    this.injectHtml(opts)
    events.subscribe('account connected', this.init)
  }

  injectHtml(opts) {
    const root = document.getElementById(opts.selector) as HTMLDivElement

    root.classList.add('ff-widget')
    root.innerHTML = html

    const tokenIcons        = root.querySelector('.ff-widget-token-icons') as HTMLDivElement
    const title             = root.querySelector('.ff-widget-title') as HTMLDivElement
    const timer             = root.querySelector('.ff-widget-timer') as HTMLDivElement
    const rewardsTokenSymbol  = root.querySelector('.ff-rewards-token-name') as HTMLDivElement
    const stakingTokenSymbol  = root.querySelector('.ff-staking-token-name') as HTMLDivElement
    const apyValue          = root.querySelector('.ff-widget-apy') as HTMLDivElement
    const earnTokenName     = root.querySelector('.ff-widget-earn-token-name') as HTMLDivElement
    const earnedAmount      = root.querySelector('.ff-widget-earned-amount') as HTMLDivElement
    const stakedAmount      = root.querySelector('.ff-widget-staked-amount') as HTMLDivElement
    const unlockButton      = root.querySelector('.ff-widget-unlock-button') as HTMLButtonElement
    const approveButton     = root.querySelector('.ff-widget-approve-button') as HTMLButtonElement
    const depositButton     = root.querySelector('.ff-widget-deposit-button') as HTMLButtonElement
    const withdrawButton    = root.querySelector('.ff-widget-withdraw-button') as HTMLButtonElement
    const harvestButton     = root.querySelector('.ff-widget-harvest-button') as HTMLButtonElement

    this.elems = {
      root,
      tokenIcons,
      title,
      timer,
      rewardsTokenSymbol,
      stakingTokenSymbol,
      apyValue,
      earnTokenName,
      earnedAmount,
      stakedAmount,
      unlockButton,
      approveButton,
      depositButton,
      withdrawButton,
      harvestButton
    }

    unlockButton.addEventListener('click', () => {
      web3modal.connect()
    })

    const createButton = (button, callback) => {
      const text = button.innerHTML
      let isLoading = false

      button.addEventListener('click', async () => {
        if (isLoading) {
          return
        }

        isLoading = true
        button.disabled = true
        button.innerHTML = '<div class="ff-loader"></div>'

        await callback()

        button.disabled = false
        button.innerHTML = text
      })
    }

    createButton(approveButton, async () => {
      const { web3, account } = getState()

      const spender = opts.farmAddress
      const value = web3.utils.toBN('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

      try {
        await this.contracts.staking.methods.approve(spender, value).send({ from: account })
        this.elems.approveButton.classList.add('ff-hidden')
      }
      catch (err) {
        console.error(err)
        infoModal.open(err.message)
      }
    })

    depositButton.addEventListener('click', () => {
      depositModal.open({
        contracts: this.contracts,
        stakingDecimals: this.state.stakingDecimals,
        stakingTokenSymbol: this.state.stakingTokenSymbol,
      })
    })

    withdrawButton.addEventListener('click', () => {
      withdrawModal.open({
        contracts: this.contracts,
        rewardsDecimals: this.state.rewardsDecimals,
        rewardsTokenSymbol: this.state.rewardsTokenSymbol,
      })
    })

    createButton(harvestButton, async () => {
      const { account } = getState()

      try {
        await this.contracts.farm.methods.getReward().send({ from: account })
      }
      catch (err) {
        console.error(err)
        infoModal.open(err.message)
      }
    })
  }

  init = async () => {
    const { farmAddress, rewardsAddress, stakingAddress } = this.opts

    this.elems.unlockButton.classList.add('ff-hidden')

    this.contracts = await createContracts({
      farmAddress,
      rewardsAddress,
      stakingAddress,
    })

    const [
      stakingTokenName,
      stakingTokenSymbol,
      stakingDecimals,
      rewardsTokenName,
      rewardsTokenSymbol,
      rewardsDecimals,
    ] = await Promise.all([
      this.contracts.staking.methods.name().call(),
      this.contracts.staking.methods.symbol().call(),
      this.contracts.staking.methods.decimals().call(),
      this.contracts.rewards.methods.name().call(),
      this.contracts.rewards.methods.symbol().call(),
      this.contracts.rewards.methods.decimals().call(),
    ])

    this.state.stakingTokenSymbol = stakingTokenSymbol
    this.state.rewardsTokenSymbol = rewardsTokenSymbol

    this.state.stakingDecimals = stakingDecimals
    this.state.rewardsDecimals = rewardsDecimals

    this.elems.rewardsTokenSymbol.innerHTML = rewardsTokenSymbol
    this.elems.stakingTokenSymbol.innerHTML = stakingTokenSymbol

    this.elems.title.innerHTML = `${rewardsTokenSymbol}-${stakingTokenSymbol}`

    const tokenIcons = getTokenIcons(this.opts, {
      stakingTokenName,
      stakingTokenSymbol,
      rewardsTokenName,
      rewardsTokenSymbol,
    })

    if (tokenIcons) {
      this.elems.tokenIcons.innerHTML = `
        <img class="ff-widget-token-icon" src="${tokenIcons.rewards}" />
        <img class="ff-widget-token-icon" src="${tokenIcons.staking}" />
      `
    }
    else {
      this.elems.tokenIcons.innerHTML = ''
    }

    if (typeof this.opts.apy === 'function') {
      this.opts.apy()
        .then((value) => {
          this.elems.apyValue.innerHTML = `${value}%`
        })
    }
    else {
      this.elems.apyValue.innerHTML = `${this.opts.apy}%`
    }

    this.elems.earnTokenName.innerHTML = rewardsTokenSymbol

    this.initTimer()
    this.updateValues()

    events.subscribe('deposit success', this.updateValues)
    events.subscribe('withdraw success', this.updateValues)
  }

  initTimer = async () => {
    let farmingFinishDate

    try {
      farmingFinishDate = await this.contracts.farm.methods.periodFinish().call()
    }
    catch (err) {
      console.error(err)
      return
    }

    const finishDate = Number(farmingFinishDate.toString())

    if (finishDate - Date.now() / 1000 > 0) {
      setInterval(() => {
        let delta = Math.floor((finishDate * 1000 - Date.now()) / 1000)

        const days = Math.floor(delta / 86400)

        delta -= days * 86400

        const hours = Math.floor(delta / 3600) % 24

        delta -= hours * 3600

        const minutes = Math.floor(delta / 60) % 60

        delta -= minutes * 60

        const seconds = delta % 60
        const timeLeft = `${days < 10 ? `0${days}` : days}:${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`

        this.elems.timer.innerHTML = timeLeft
      }, 1000)
    }
    else {
      this.elems.timer.innerHTML = 'Farming not started yet'
    }
  }

  updateValues = async () => {
    const { account } = getState()

    const [
      farmingBalance,
      earnedTokens,
      allowance,
    ] = await Promise.all([
      this.contracts.farm.methods.balanceOf(account).call(),
      this.contracts.farm.methods.earned(account).call(),
      this.contracts.staking.methods.allowance(account, this.opts.farmAddress).call(),
    ])

    if (Number(allowance) === 0) {
      this.elems.approveButton.classList.remove('ff-hidden')
    }

    const { stakingDecimals, rewardsDecimals } = this.state

    this.elems.earnedAmount.innerText = toFixed(earnedTokens / Math.pow(10, rewardsDecimals))
    this.elems.stakedAmount.innerText = toFixed(farmingBalance / Math.pow(10, stakingDecimals))

    if (earnedTokens > 0) {
      this.elems.harvestButton.disabled = false
    }

    if (farmingBalance > 0) {
      this.elems.withdrawButton.disabled = false
    }

    this.elems.depositButton.disabled = false
  }
}


export default Widget
