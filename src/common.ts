import { createContracts } from './contracts'
import { setState } from './state'


export const initData = async ({ accounts }) => {
  console.debug('common: init')

  const account = accounts[0]
  const web3 = new window.Web3(window.ethereum)
  const contracts = await createContracts(web3)

  setState({
    web3,
    account,
    contracts,
  })
}
