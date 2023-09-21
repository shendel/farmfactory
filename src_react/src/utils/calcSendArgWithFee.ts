// @ts-nocheck
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { getChainRPC } from './networks'

export const calcSendArgWithFee2 = async (options) => {
  const {
    account,
    chainId,
    contractAddress,
    abi,
    method,
    args,
    weiAmount
  } = options
  
  const web3 = new Web3(getChainRPC(chainId))
  const contract = new web3.eth.Contract(abi, contractAddress)
  
  const txArguments = {
    from: account,
    gas: '0'
  }

  if (weiAmount) txArguments.value = new BigNumber(weiAmount)

  const gasAmountCalculated = await contract.methods
    [method](...args)
    .estimateGas(txArguments)

  const gasAmounWithPercentForSuccess = new BigNumber(
    new BigNumber(gasAmountCalculated)
      .multipliedBy(1.15) // + 15% -  множитель добавочного газа, если будет фейл транзакции - увеличит (1.05 +5%, 1.1 +10%)
      .toFixed(0)
  ).toString(16)

  txArguments.gas = '0x' + gasAmounWithPercentForSuccess
  //txArguments.gas = gasAmounWithPercentForSuccess
  return txArguments
}

export const calcSendArgWithFee = async (account, contract, method, args, weiAmount) => {
  const txArguments = {
    from: account,
    //gas: '0'
  }

  if (weiAmount) txArguments.value = new BigNumber(weiAmount)

  const gasAmountCalculated = await contract.methods
    [method](...args)
    .estimateGas(txArguments)

  const gasAmounWithPercentForSuccess = new BigNumber(
    new BigNumber(gasAmountCalculated)
      .multipliedBy(1.15) // + 15% -  множитель добавочного газа, если будет фейл транзакции - увеличит (1.05 +5%, 1.1 +10%)
      .toFixed(0)
  ).toString(16)

  txArguments.gas = '0x' + gasAmounWithPercentForSuccess
  return txArguments
}