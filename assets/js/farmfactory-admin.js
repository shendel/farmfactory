/**
 * Admin Scripts
 */
(function( $ ){
	"use strict";

	var loaderOverlay  		= document.getElementById('farmfactory_loaderOverlay');
	var loaderStatusText 	= document.getElementById('farmfactory_loaderStatus');
	var showLoader = () => {
		loaderStatusText.innerText = '';
		loaderOverlay.classList.add('visible');
	}
	var setLoaderStatus = (message) => loaderStatusText.innerText = message;
	var hideLoader = () 			=> loaderOverlay.classList.remove('visible');

	var getValue = (id) 		=> document.getElementById(id).value;
	var setValue = (id, value) 	=> document.getElementById(id).value = value;
	var getHtmlText = (id) 		=> document.getElementById(id).textContent;
	var setHtml = (id, value) 	=> document.getElementById(id).innerHTML = value;
	var showBlock = (id)		=> document.getElementById(id).style.display = '';
	var hideBlock = (id) 		=> document.getElementById(id).style.display = 'none';

	var errMessage = (message) => { alert(message) }

	var rewardsAddress 				= document.getElementById('rewardsAddress');
	var fetchRewardTokenButton 		= document.getElementById('farmfactory_fetch_reward_token_button');

	var stakingAddress 				= document.getElementById('stakingAddress');
	var fetchStakingTokenButton	 	= document.getElementById('farmfactory_fetch_staking_token_button');

	var deployButton         		= document.getElementById('farmfactory_deploy_button');

	var amount             			= document.getElementById('amount');
	var startFarmingButton 			= document.getElementById('farmfactory_startFarmingButton');

	let setupType = 'deployNewFarm' // also can be as 'fetchExistsFarm'.
	const setSetupType = (event) => {
		setupType = event.target.value;
		if (setupType === 'deployNewFarm') {
			showBlock('deployNewFarmContainer');
			hideBlock('fetchExistsFarmContainer');
		}

		if (setupType === 'fetchExistsFarm') {
			showBlock('fetchExistsFarmContainer');
			hideBlock('deployNewFarmContainer');
		}

		console.log('setupType:', setupType)
	};
	document.querySelectorAll("input[name='setup_type']").forEach((input) => {
        input.addEventListener('change', setSetupType);
    });

	farmDeployer.init({
		onStartLoading: () => {
			// show loader
			deployButton.disabled = true;
		},
		onFinishLoading: () => {
			// hide loader
			deployButton.disabled = false;
		},
		onError: (err) => {
			console.error(err);
			deployButton.disabled = true;
			alert(err);
		}
	});

	$( fetchStakingTokenButton ).on('click', function (e) {
		e.preventDefault();

		const unlockButton = () => {
			fetchStakingTokenButton.disabled = false;
			hideLoader();
		}

		const tokenAddress = getValue('stakingAddress');

		if (!window.Web3.utils.isAddress(tokenAddress)) {
		  return errMessage( 'Staking token address is not correct' );
		}

		showLoader();

		setLoaderStatus( 'Fetching staking token info' );
		fetchStakingTokenButton.disabled = true;
		hideBlock('staking_token_info');

		farmDeployer.getTokenInfo({ tokenAddress })
			.then((tokenInfo) => {
				console.log('staking tokenInfo', tokenInfo);

				setHtml('staking_token_name_view', tokenInfo.name);
				setValue('staking_token_name', tokenInfo.name);
				setHtml('staking_token_symbol_view', ` (${tokenInfo.symbol}). `);
				setValue('staking_token_symbol', tokenInfo.symbol);
				setHtml('staking_decimals_view', `Decimals: ${tokenInfo.decimals}`);
				setValue('staking_decimals', tokenInfo.decimals);

				showBlock('staking_token_info');
			})
			.catch((error) => {
				console.error(error);
				errMessage( `Staking token address is not correct or token address from another network, please check selected metamask network, it should be ${getHtmlText('network_name')}.` );
			})
			.finally(() => {
				unlockButton();
			})
	})

	$( fetchRewardTokenButton ).on('click', function (e) {
		e.preventDefault();

		const unlockButton = () => {
			fetchRewardTokenButton.disabled = false;
			hideLoader();
		}

		const tokenAddress = getValue('rewardsAddress');

		if (!window.Web3.utils.isAddress(tokenAddress)) {
		  return errMessage( 'Reward token address is not correct' );
		}

		showLoader();

		setLoaderStatus( 'Fetching reward token info' );
		fetchRewardTokenButton.disabled = true;
		hideBlock('reward_token_info');

		farmDeployer.getTokenInfo({ tokenAddress })
			.then((tokenInfo) => {
				console.log('reward tokenInfo', tokenInfo);

				setHtml('reward_token_name_view', tokenInfo.name);
				setValue('reward_token_name', tokenInfo.name);
				setHtml('reward_token_symbol_view', ` (${tokenInfo.symbol}). `);
				setValue('reward_token_symbol', tokenInfo.symbol);
				setHtml('reward_decimals_view', `Decimals: ${tokenInfo.decimals}`);
				setValue('reward_decimals', tokenInfo.decimals);

				showBlock('reward_token_info');
			})
			.catch((error) => {
				console.error(error);
				errMessage( `Reward token address is not correct or token address from another network, please check selected metamask network, it should be ${getHtmlText('network_name')}.` );
			})
			.finally(() => {
				unlockButton();
			})
	})

	$( deployButton ).on( 'click', function(e) {
	  	e.preventDefault();

		const duration = getValue('farmfactory_duration')
		const stakingTokenDecimal = getValue('staking_decimals')
		const rewardTokenDecimal = getValue('reward_decimals')

	  	if (!rewardsAddress || !stakingAddress || !duration ) {
	    	errMessage('All fields should be filled: rewardsAddress, stakingAddress, duration.');
			return;
		}

		if (!stakingTokenDecimal || !rewardTokenDecimal) {
			errMessage('Firstly you should to fetch reward and staking tokens data.');
			return;
		}

		if (deployButton.disabled) {
			return;
		}

		const unlockButton = () => {
			deployButton.disabled = false;
			hideLoader();
		}

		deployButton.disabled = true;
		showLoader();

		farmDeployer.deploy({
			rewardsAddress: rewardsAddress.value,
			stakingAddress: stakingAddress.value,
			duration,
			decimal: stakingTokenDecimal,
			onTrx: (trxHash) => {
				errMessage(`Transaction hash: ${trxHash}. Send this hash to the support via support@onout.org if you have a problem with deploy.`);
			},
			onSuccess: (address) => {
				console.log('Contract address:', address);
				unlockButton();
				setValue('farm_address', address);
				setHtml('farm_address_view', address);
			},
			onError: (err) => {
				console.error(err);
				unlockButton();
				errMessage(err);
			},
		});

	});

	startFarmingButton?.addEventListener('click', () => {
		if (farmDeployer.disabled) {
			return;
		}

		const unlockButton = () => {
			startFarmingButton.disabled = false;
			hideLoader();
		}

		farmDeployer.disabled = true;
		showLoader();

		farmDeployer.startFarming({
			rewardsAddress: getValue('rewardsAddress'),
			farmAddress: getValue('farm_address'),
			amount: amount.value,
			onSuccess: () => {
				console.log('Farming started');
				unlockButton();
			},
			onError: (err) => {
				console.error(err);
				unlockButton();
				errMessage(err);
			}
		});
	});












	/**
	 * @namespace wp.media.featuredImage
	 * @memberOf wp.media
	 */
	wp.media.featuredIcon = {
		/**
		 * Get the featured image post ID
		 *
		 * @return {wp.media.view.settings.post.featuredImageId|number}
		 */
		get: function() {
			return wp.media.view.settings.post.featuredIconId;
		},
		/**
		 * Sets the featured image ID property and sets the HTML in the post meta box to the new featured image.
		 *
		 * @param {number} id The post ID of the featured image, or -1 to unset it.
		 */
		set: function( id ) {
			var settings = wp.media.view.settings;

			settings.post.featuredIconId = id;

			wp.media.post( 'get-post-thumbnail-html', {
				post_id:      settings.post.id,
				thumbnail_id: settings.post.featuredIconId,
				_wpnonce:     settings.post.nonce
			}).done( function( html ) {
				if ( '0' === html ) {
					window.alert( wp.i18n.__( 'Could not set that as the thumbnail image. Try a different attachment.' ) );
					return;
				}
				$( '.inside', '#postimagediv' ).html( html );
			});
		},
		/**
		 * Remove the featured image id, save the post thumbnail data and
		 * set the HTML in the post meta box to no featured image.
		 */
		remove: function() {
			wp.media.featuredIcon.set( -1 );
		},
		/**
		 * The Featured Image workflow
		 *
		 * @this wp.media.featuredImage
		 *
		 * @return {wp.media.view.MediaFrame.Select} A media workflow.
		 */
		frame: function() {
			if ( this._frame ) {
				wp.media.frame = this._frame;
				return this._frame;
			}

			this._frame = wp.media({
				state: 'featured-image',
				states: [ new wp.media.controller.FeaturedImage() , new wp.media.controller.EditImage() ]
			});

			this._frame.on( 'toolbar:create:featured-image', function( toolbar ) {
				/**
				 * @this wp.media.view.MediaFrame.Select
				 */
				this.createSelectToolbar( toolbar, {
					text: wp.media.view.l10n.setFeaturedImage
				});
			}, this._frame );

			this._frame.on( 'content:render:edit-image', function() {
				var selection = this.state('featured-image').get('selection'),
					view = new wp.media.view.EditImage( { model: selection.single(), controller: this } ).render();

				this.content.set( view );

				// After bringing in the frame, load the actual editor via an Ajax call.
				view.loadEditor();

			}, this._frame );

			this._frame.state('featured-image').on( 'select', this.select );
			return this._frame;
		},
		/**
		 * 'select' callback for Featured Image workflow, triggered when
		 *  the 'Set Featured Image' button is clicked in the media modal.
		 *
		 * @this wp.media.controller.FeaturedImage
		 */
		select: function() {
			var selection = this.get('selection').single();

			if ( ! wp.media.view.settings.post.featuredImageId ) {
				return;
			}

			wp.media.featuredImage.set( selection ? selection.id : -1 );
		},
		/**
		 * Open the content media manager to the 'featured image' tab when
		 * the post thumbnail is clicked.
		 *
		 * Update the featured image id when the 'remove' link is clicked.
		 */
		init: function() {
			$('#farmimagediv').on( 'click', '#set-farm-thumbnail', function( event ) {
				event.preventDefault();
				// Stop propagation to prevent thickbox from activating.
				event.stopPropagation();

				wp.media.featuredIcon.frame().open();
			}).on( 'click', '#remove-farm-thumbnail', function() {
				wp.media.featuredIcon.remove();
				return false;
			});
		}
	};

	//$( wp.media.featuredIcon.init );

	/**
	 * Select/Upload icon
	 */
	$('#farmimagediv').on('click', '#set-farm-thumbnail', function(e){
		e.preventDefault();

		var button = $(this),
			custom_uploader = wp.media({
				title: farmfactory.l18n.featuredImage,
				library : {
					type : 'image'
				},
			button: {
				text: farmfactory.l18n.setFeaturedImage,
			},
			multiple: false
		}).on('select', function() {
			var attachment = custom_uploader.state().get('selection').first().toJSON();

			$('#_farm_thumbnail_id').val( attachment.id );

			var html = '<p><a href="#" id="set-farm-thumbnail"><img src="' + attachment.url + '"></a></p>' +
			'<p class="howto">' + farmfactory.l18n.clickTheImage + '</p>' +
			'<p><a href="#" id="remove-farm-thumbnail">' + farmfactory.l18n.removeFeaturedImage + '</a></p>';
			$('.farmfactory-thumbnail-container').html( html );
		})
		.open();
	});

	/**
	 * Select/Upload icon
	 */
	$('#farmimagediv').on('click', '#remove-farm-thumbnail', function(e){
		e.preventDefault();

		$('#_farm_thumbnail_id').val( '-1' );

		var html = '<p><a href="#" id="set-farm-thumbnail">' + farmfactory.l18n.setFeaturedImage + '</a></p>';

		$('.farmfactory-thumbnail-container').html( html );
	});

	/**
	 * Clipboard
	 */
	var copyFarmShortcodeClipboard = new ClipboardJS( '.copy-farm-shortcode' );
	var copyFarmShortcodeSuccessTimeout;
	copyFarmShortcodeClipboard.on( 'success', function( event ) {
		var triggerElement = $( event.trigger );
		var successElement = $( '.success', triggerElement.closest( '.copy-to-clipboard-container' ) );

		// Clear the selection and move focus back to the trigger.
		event.clearSelection();
		// Handle ClipboardJS focus bug, see https://github.com/zenorocha/clipboard.js/issues/680
		triggerElement.trigger( 'focus' );

		// Show success visual feedback.
		clearTimeout( copyFarmShortcodeSuccessTimeout );
		successElement.removeClass( 'hidden' );

		// Hide success visual feedback after 3 seconds since last success.
		copyFarmShortcodeSuccessTimeout = setTimeout( function() {
			successElement.addClass( 'hidden' );
		}, 3000 );

	} );

})( jQuery );
