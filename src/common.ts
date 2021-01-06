import { createContracts } from './contracts'
import { setState } from './state'
import events from './events'


export const initData = async ({ accounts }) => {
  console.debug('common: init')

  const account = accounts[0]
  const web3 = new window.Web3(window.ethereum)
  const contracts = await createContracts(web3)
  const stakingTokenName = await contracts.staking.methods.name().call()
  const rewardsTokenName = await contracts.rewards.methods.name().call()

  setState({
    web3,
    account,
    contracts,
    stakingTokenName,
    rewardsTokenName,
  })

  events.dispatch('data initialized')
}
