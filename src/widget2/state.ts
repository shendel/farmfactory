export type State = {
  opts: {
    widget: {
      networkName: 'mainnet' | 'kovan' | 'ropsten'
      farmAddress: string
      rewardsAddress: string
      stakingAddress: string
      harvestButtonTitle?: string
      depositButtonTitle?: string
      withdrawButtonTitle?: string
      timesUpMessage?: string
    },
    wallet: {
      providerOptions: Record<string, any>
    }
  }
  web3: any
  web3Modal: any
  provider: any
  account: any
  contracts: any
  stakingTokenName: string
  stakingDecimals: number
  rewardsTokenName: string
  rewardsDecimals: number
}

let state: State = {
  opts: null,
  web3: null,
  web3Modal: null,
  provider: null,
  account: null,
  contracts: null,
  stakingTokenName: '',
  stakingDecimals: null,
  rewardsTokenName: '',
  rewardsDecimals: null,
}

export const getState = () => state

export const setState = (newState: Partial<State>) => {
  state = {
    ...state,
    ...newState,
  }

  // events.dispatch('state change', state)
}
