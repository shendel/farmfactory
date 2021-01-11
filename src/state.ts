import events from './events'


export type State = {
  opts: {
    networkName: 'mainnet' | 'kovan' | 'ropsten'
    farmAddress: string
    rewardsAddress: string
    stakingAddress: string
    harvestButtonTitle?: string
    depositButtonTitle?: string
    withdrawButtonTitle?: string
    timesUpMessage?: string
  }
  web3: any
  account: any
  contracts: any
  stakingTokenName: string
  rewardsTokenName: string
}

let state: State = {
  opts: null,
  web3: null,
  account: null,
  contracts: null,
  stakingTokenName: '',
  rewardsTokenName: '',
}

export const getState = () => state

export const setState = (newState: Partial<State>) => {
  state = {
    ...state,
    ...newState,
  }

  events.dispatch('state change', state)
}
