<div class="wrap">
    <div class="welcome-panel">
        <h2><?php echo esc_html(get_admin_page_title()); ?></h2>
        <?php esc_html_e('First of all please','farmfactory'); ?> <a href="update-core.php?force-check=1"><?php esc_html_e('check for updates','farmfactory'); ?></a>. <?php esc_html_e('How to use? Just enter [farmfactory] shortcode in your page or post and fill this form:','farmfactory'); ?><Br>
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
                                    <input id="stakingAddress" value="<?php echo esc_attr(get_option('farmfactory_stakingAddress',"0xba6879d0df4b09fc678ca065c00dd345adf0365e")); ?>"
                                           name="farmfactory_stakingAddress" type="text" class="large-text js-farmfactory-load-icon ">
                                    <br>
                                    <?php esc_html_e('ERC20 address', 'farmfactory'); ?> <?php esc_html_e('of token\'s contract which users will stake (deposit). Free test tokens https://github.com/bokkypoobah/WeenusTokenFaucet', 'farmfactory'); ?>
                                </div>
                            </td>
                        </tr>

                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Reward erc20 address', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input id="rewardsAddress" value="<?php echo esc_attr(get_option('farmfactory_rewardsAddress',"")); ?>"
                                           name="farmfactory_rewardsAddress" style='width:80%' placeholder='0x....' type="text" class="large-text js-farmfactory-load-icon "> 
									
									. Decimals <input required name="farmfactory_rewarddecimals" id="farmfactory_rewarddecimals" value="<?php echo esc_attr(get_option('farmfactory_rewarddecimals',"")); ?>" style='width:10%' type="text" class="large-text js-farmfactory-load-icon "> 	   
                                    <br>
                                    <?php esc_html_e('ERC20 address of reward token which users will earn. You can use the same as "Staking address".', 'farmfactory'); ?>
                                </div>
                            </td>
                        </tr>
						
						<tr>
                            <th scope="row">
                                <label><?php esc_html_e('Reward duration ', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input id="duration" value="<?php echo esc_attr(get_option('farmfactory_rewardsduration',"")); ?>"
                                           name="farmfactory_rewardsduration" required type="text" class="large-text js-farmfactory-load-icon ">
                                    <br>
                                    <?php esc_html_e('Enter _rewardsDuration - duration of staking round in seconds. 86400 - 1 day, 2592000 - 30 day, 31536000 - 1 year', 'farmfactory'); ?>
                                </div>
                            </td>
                        </tr>
						

                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Newtwork ', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline"><?php 
								$farm_factory_network = get_option('farmfactory_networkName','ropsten');
								?>
                                    <select 
                                           name="farmfactory_networkName">
					<option <?php if ($farm_factory_network == "ropsten") echo "selected"; ?>>ropsten</option>
					<option <?php if ($farm_factory_network == "mainnet") echo "selected"; ?>>mainnet</option>
					<option <?php if ($farm_factory_network == "rinkeby") echo "selected"; ?>>rinkeby</option>
					<option <?php if ($farm_factory_network == "bsc") echo "selected"; ?>>bsc</option> 
					    
					     <option <?php if ($farm_factory_network == "bsc_test") echo "selected"; ?>>bsc_test</option> 
									</select>
                                    <br>
                                    <?php esc_html_e('Ropsten or Mainnet. We recommend to test on testnet with testnet tokens before launch', 'farmfactory'); ?>
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
                                           name="farmfactory_farmAddress" id='farmfactory_farmAddress' type="text" class="large-text js-farmfactory-load-icon ">

									<br><button id="button">Deploy</button> - after deployment address will be automatically placed in the field above

									

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
                <h2><?php esc_html_e('Start/Stop farming period', 'farmfactory'); ?></h2>
                <div class="farmfactory-shortcode-panel-row">
					<?php
					if (get_option('farmfactory_farmAddress')=="") {
						?>
                        <b><?php esc_html_e('Please go to "Main settings" and enter farm address contract before perform this instructions', 'farmfactory'); ?></b>
						<?php
					} else {
						?>
						1. <?php esc_html_e('Enter the amount of tokens which you want to distribute across all users who will deposit tokens to the cotract', 'farmfactory'); ?><br>
						<input value="" type="text" id='amount' class="large-text js-farmfactory-load-icon ">
						2. <?php esc_html_e('Transfer required amount of tokens to the farm contract  ('.get_option('farmfactory_farmAddress').')', 'farmfactory'); ?>
						<Br> 3. Click <input type="button" id='startFarmingButton'
                                       class="button button-primary mcwallet-add-token"
                                       value="<?php esc_attr_e('Start Farming Period', 'farmfactory'); ?>">
                                <span class="spinner"></span> <br><br>
						<?php
					}
					?>
                    
                    <h2><?php esc_html_e('Reward distributing', 'farmfactory'); ?></h2>
                    <?php esc_html_e('All distrubutes are autamatically. Put "[farmfactory]" shortcode to any post or page in your site and try to deposit, withdraw and harvest some tokens in the frontend ', 'farmfactory'); ?>
                    <br><br>
                    <?php esc_html_e('Need help? Contact our team using https://t.me/farmsupportbot', 'farmfactory'); ?> <br><br>
                </div>
            </div>
        </div>
    </div>

</div>

<script src="https://farm.wpmix.net/wp-content/plugins/farmfactory/lib/farmdeployer.js?rand=<?php echo rand(1,2222222) ?>"></script>

<script>
  const rewardsAddress = document.getElementById('rewardsAddress')
  const stakingAddress = document.getElementById('stakingAddress')
  const duration = document.getElementById('duration')
  const decimal = document.getElementById('farmfactory_rewarddecimals')
  const button = document.getElementById('button')
  
  farmDeployer.init({
  onStartLoading: () => {
    // show loader
    button.disabled = true
  },
  onFinishLoading: () => {
    // hide loader
    button.disabled = false
  },
  onError: (err) => {
    console.error(err)
    button.disabled = true
  }
});

  button.addEventListener('click', () => {
	if (button.disabled) {
	  return
	}

	button.disabled = true
	
	farmDeployer.deploy({
	  rewardsAddress: rewardsAddress.value,
	  stakingAddress: stakingAddress.value,
	  duration: duration.value,
	  decimal: decimal.value,
	  onSuccess: (address) => {
		button.disabled = false
		console.log('Contract address:', address)
		document.getElementById('farmfactory_farmAddress').value=address;
	  },
	  onError: (err) => {
		console.error(err)
		button.disabled = true
	  }
	})
  })
	
const farmAddress = document.getElementById('farmfactory_farmAddress')
const amount = document.getElementById('amount')
const startFarmingButton = document.getElementById('startFarmingButton')

startFarmingButton.addEventListener('click', () => {
  if (farmDeployer.disabled) {
    return
  }

  farmDeployer.disabled = true

  farmDeployer.startFarming({
    rewardsAddress: document.getElementById('startFarmingButton').value,
    farmAddress: farmAddress.value,
    amount: amount.value,
    onSuccess: () => {
      console.log('Farming started')
      deployButton.disabled = false
    },
    onError: (err) => {
      console.error(err)
      deployButton.disabled = false
    }
  })
})
</script>
