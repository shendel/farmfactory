/**
 * Widget Admin Scripts
 */
(function( $ ){
	"use strict";

	var loaderOverlay  = document.getElementById('farmfactory_loaderOverlay');
	var rewardsAddress = document.getElementById('rewardsAddress');
	var stakingAddress = document.getElementById('stakingAddress');
	var duration       = document.getElementById('farmfactory_duration');
	var decimal        = document.getElementById('farmfactory_reward_decimals');
	var button         = document.getElementById('farmfactory_deploy_button');

	var farmAddress        = document.getElementById('farmfactory_farmAddress');
	var amount             = document.getElementById('amount');
	var startFarmingButton = document.getElementById('farmfactory_startFarmingButton');

	farmDeployer.init({
		onStartLoading: () => {
			// show loader
			button.disabled = true;
		},
		onFinishLoading: () => {
			// hide loader
			button.disabled = false;
		},
		onError: (err) => {
			console.error(err);
			button.disabled = true;
			alert(err);
		}
	});

	$( button ).on( 'click', function(e) {
		e.preventDefault();

		/*if ( ! $( farmAddress ).val() ) {
			farmAddress.focus();
			return;
		}*/

		if (button.disabled) {
			return
		}

		button.disabled = true;
		loaderOverlay.classList.add('visible');

		farmDeployer.deploy({
			rewardsAddress: rewardsAddress.value,
			stakingAddress: stakingAddress.value,
			duration: duration.value,
			decimal: decimal.value,
			onSuccess: (address) => {
				console.log('Contract address:', address);
				button.disabled = false;
				loaderOverlay.classList.remove('visible');
				document.getElementById('farmfactory_farmAddress').value = address;
			},
			onError: (err) => {
				console.error(err);
				button.disabled = true;
				loaderOverlay.classList.remove('visible');
				alert(err);
			}
		});

	});

	startFarmingButton.addEventListener('click', () => {
		if (farmDeployer.disabled) {
			return
		}

		farmDeployer.disabled = true;
		loaderOverlay.classList.add('visible');

		farmDeployer.startFarming({
			rewardsAddress: document.getElementById('rewardsAddress').value,
			farmAddress: farmAddress.value,
			amount: amount.value,
			onSuccess: () => {
				console.log('Farming started');
				startFarmingButton.disabled = false;
				loaderOverlay.classList.remove('visible');
			},
			onError: (err) => {
				console.error(err);
				startFarmingButton.disabled = false;
				loaderOverlay.classList.remove('visible');
				alert(err);
			}
		});
	});

})( jQuery );
