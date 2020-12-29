# farmfactory
https://farm.wpmix.net/ 

The simplest way to allow your users to deposit ERC20 tokens (from example USDT) using simple "Deposit/Withdraw" interface and earn (farm) rewards. 

![](https://screenshots.wpmix.net/Telegram_Jc3TBvHVeFb1Cj2Zn2ZaB0k7yjMvsIUV.png)

What admin can specify in admin area:

1. erc20 address of token which users will stake (freeze on the contract)
2. erc20 address of reward token which users can claim after expiration. (by default the same as staking token) 
3. amount of reward token to be distibuted between users (in proportion of their staking value and staking time)
4. duration (expiration) - the date until users can stake the token, after expiration 

Simplest usage: Your holder to stake X TOKEN_A and get (X+Y) TOKEN_A back in 1 month (you must add  Y TOKEN_A to the contract)

Advanced usage (video instruction): 
1. Your holders go to uniswap.exchange and create pool TOKEN_A/ETH (or TOKEN_A/USDT)  
2. receive unsiwap's LP token, which needs to withdraw pooled assets back to the wallet (this step is autmatically performs on uniswap)
3. stake this LP token in the staking contract
4. after expiration holder gets  LP token back  and TOKEN_A as a reward (in proportion of their staking value and staking time).
