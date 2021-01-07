<div class="wrap">
    <div class="welcome-panel">
        <h2><?php echo esc_html(get_admin_page_title()); ?></h2>
        <?php esc_html_e('First of all please','farmfactory'); ?> <a href="update-core.php?force-check=1"><?php esc_html_e('check for updates','farmfactory'); ?></a>. How to use? Just enter [farmfactory] shortcode in your page or post and fill this form: <Br>
        <br><br>
        <h2><?php esc_html_e('Staking settings', 'farmfactory'); ?></h2>
        <div class="welcome-panel-column-container farmfactory-panel-tab panel-tab-active" id="farmfactory-tab-1">
            <div class="farmfactory-shortcode-panel-row">
                <form action="#" method="post" class="wp-farmfactory-widget-form">

                    <table class="form-table">
                        <tbody>


                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Staking erc20 Address', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input value="<?php echo esc_attr(get_option('farmfactory_stakingAddress',"0xaFF4481D10270F50f203E0763e2597776068CBc5")); ?>"
                                           name="farmfactory_stakingAddress" type="text" class="large-text js-farmfactory-load-icon ">
                                    <br>
                                    ERC20 address <a href="https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/" target=_blank>?</a> of token's contract which users will stake (deposit). You can find erc20 address here https://etherscan.io/tokens . For example "0xdac17f958d2ee523a2206206994597c13d831ec7"  (USDT)
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Reward erc20 address', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input value="<?php echo esc_attr(get_option('farmfactory_rewardsAddress',"0xaFF4481D10270F50f203E0763e2597776068CBc5")); ?>"
                                           name="farmfactory_rewardsAddress" type="text" class="large-text js-farmfactory-load-icon ">
                                    <br>
                                    ERC20 address of reward token which users will earn. You can use the same as "Staking address"
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('NetworkId ', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input value="<?php echo esc_attr(get_option('farmfactory_networkId',42)); ?>"
                                           name="farmfactory_networkId" type="text" class="large-text js-farmfactory-load-icon ">
                                    <br>
                                    1 - mainnet or 42 - kovan testnet . We recommend to <a href="https://github.com/kovan-testnet/faucet">test on testnet</a> with <a href="https://github.com/bokkypoobah/WeenusTokenFaucet">testnet tokens</a> before launch
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Farming address Address', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input value="<?php echo esc_attr(get_option('farmfactory_farmAddress')); ?>"
                                           name="farmfactory_farmAddress" type="text" class="large-text js-farmfactory-load-icon ">

                                    <br><b>How to create farm contract: </b><br>
                                    1. Go to <a href="">this interface</a> (or <a href="https://kovan.etherscan.io/address/0x867f4a2a230de019370931ef3f21a09504fd87f2#writeContract" target=_blank>this</a> for kovan tesntet (networkid=42). <br>
                                    2. Connect metamask (click "Connect to web3")<Br>
                                    3. Open "Create farm" dialog (<a href="https://screenshots.wpmix.net/chrome_v0wRXGUaKS0rwhHfoQKN1eonZqQLxIXv.png">screenshot</a>) and enter this variables:  <br>
                                    4. Enter _rewardsToken (address) the same as you entered above <br>
                                    5. Enter _stakingToken  (address)  <br>
                                    6. Enter _rewardsDuration - duration of staking round in seconds. 86400 - 1 day, 2592000 - 30 day, 31536000 - 1 year<Br>
                                    7. Enter _newOwner - your metamask's address. This is admin's address, who can start round. <Br>
                                    8. Click "write" and copy paste new contract address to this "Farming address Address" input (<a href="https://screenshots.wpmix.net/chrome_alA4vL8kN2zsxTpBpJWtn0a2DFrCJ9xi.png" target=_blank>where to get address</a>)
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row"></th>
                            <td>
                                <input type="submit" name="mcwallet-add-token"
                                       class="button button-primary mcwallet-add-token"
                                       value="<?php esc_attr_e('Save', 'farmfactory'); ?>">
                                <span class="spinner"></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>


                </form>
                <br><br>
                <h2>Start/Stop farming period</h2>
                <div class="farmfactory-shortcode-panel-row">
					<?php
					if (get_option('farmfactory_farmAddress')=="") {
						?>
                        <b>Please go to "Main settings" and enter farm address contract before perform this instructions</b>
						<?php
					}
					?>
                    1. <a href="https://etherscan.io/address/<?php echo esc_attr(get_option('farmfactory_farmAddress')); ?>#writeContract">Open your farming contract </a> (in <a href="https://kovan.etherscan.io/address/<?php echo esc_attr(get_option('farmfactory_farmAddress')); ?>#writeContract">in covan testnet</a>) <br>
                    2. Connect to web3 <Br>
                    3. Click "3. notifyRewardAmount"<br>
                    4. Enter the amount of tokens which you want to distribute across all users who will deposit tokens to the cotract<br>
                    5. Don't forget to <a href="https://screenshots.wpmix.net/chrome_iWOzpACLxeiNSxtmx7SuR8QtCn5LwAiv.png" target=_blank>"Add Zeroes"</a> (<a href="https://kovan.etherscan.io/address/<?php echo esc_attr(get_option('farmfactory_rewardsAddress')); ?>#readContract" target=_blank>check "decimals" constant here</a>)<br>
                    6. Transfer required amount of tokens to the farm contract  (<?php echo esc_attr(get_option('farmfactory_farmAddress')); ?>)
                    7. Click "Write", done!
                    <br><br>
                    <h2>Reward distributing</h2>
                    All distrubutes are autamatically. Put "[farmfactory]" shortcode to any post or page in your site and try to deposit, withdraw and harvest some tokens in the frontend ()
                    <br><br>
                    Need help? Contact our team using <a href="https://t.me/farmsupportbot">https://t.me/farmsupportbot</a> <br><br>
                </div>
            </div>
        </div>
    </div>

</div>
