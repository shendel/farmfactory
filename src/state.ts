import events from './events'


export type State = {
  opts: {
    networkId: number
    farmAddress: string
    rewardsAddress: string
    stakingAddress: string
  }
  web3: any
  account: any
  contracts: any
  pageContext: any
}

let state: State = {
  web3: null,
  account: null,
  contracts: null,
  pageContext: null,
}

export const getState = () => state

export const setState = (newState) => {
  state = {
    ...state,
    ...newState,
  }

  events.dispatch('state change', state)
}
