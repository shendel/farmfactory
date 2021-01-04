<div class="wrap">
    <div class="welcome-panel">
        <h2><?php echo esc_html(get_admin_page_title()); ?></h2>
        <h2 class="nav-tab-wrapper farmfactory-nav-tabs wp-clearfix">
            <a href="#farmfactory-tab-1" class="nav-tab nav-tab-active">
                <?php esc_html_e('Main Setting', 'farmfactory'); ?>
            </a>
        </h2>

        <div class="welcome-panel-column-container farmfactory-panel-tab panel-tab-active" id="farmfactory-tab-1">
            <div class="farmfactory-shortcode-panel-row">
                <form action="#" method="post" class="wp-farmfactory-widget-form">

                    <table class="form-table">
                        <tbody>
						
                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Logo url 1', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input value="<?php echo esc_attr(get_option('farmfactory_farmAddress')); ?>"
                                           name="farmfactory_farmAddress" type="text" class="large-text js-farmfactory-load-icon ">
                                    <button class="button button-secondary farmfactory-input-icon"><?php esc_html_e('Farming address Address',
                                            'farmfactory'); ?></button>
									How to create farm contract: <br>
									1. Go to <a href="">this interface</a> (or <a href="https://kovan.etherscan.io/address/0x867f4a2a230de019370931ef3f21a09504fd87f2#writeContract" target=_blank>this</a> for kovan tesntet)
									2. Connect metamask <Br>
									3. Open "Create farm" dialog (screenshot) and enter this variables:  <br>
									4. Enter _rewardsToken (address) address of token's contract which users will stake (deposit). You can find erc20 address here https://etherscan.io/tokens . For example "0xdac17f958d2ee523a2206206994597c13d831ec7"  (USDT) <br>
									5. Enter _stakingToken  (address) erc20 address of reward token which users will earn ("harvest") (enter the same as in pt. 4) <br>
									6. Enter _rewardsDuration - duration of staking round in seconds. 86400 - 1 day, 2592000 - 30 day, 31536000 - 1 year<Br>
									7. Enter _newOwner - your metamask's address. This is admin's address, who can start round. <Br>
									8. Click "write" and copy paste new contract address to this "Farming address Address" input
                                </div>
                            </td>
                        </tr>
						
						 <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Logo url 1', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input value="<?php echo esc_attr(get_option('farmfactory_icon')); ?>"
                                           name="farmfactory_icon" type="text" class="large-text js-farmfactory-load-icon ">
                                    <button class="button button-secondary farmfactory-input-icon"><?php esc_html_e('Upload icon',
                                            'farmfactory'); ?></button>

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

            </div>
        </div>
    </div>

</div>