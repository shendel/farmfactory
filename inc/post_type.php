<?php
/**
 * Post Type
 */

/**
 * Banners
 */

/**
 * Register Post Type farmfactory
 */
function farmfactory_post_type() {

	$labels = array(
		'name'               => esc_html__( 'Farm Factories', 'farm' ),
		'singular_name'      => esc_html__( 'Farm Factory', 'farm' ),
		'menu_name'          => esc_html__( 'Farm Factories', 'farm' ),
		'name_admin_bar'     => esc_html__( 'Farm Factories', 'farm' ),
		'all_items'          => esc_html__( 'All Farm Factories', 'farm' ),
		'add_new_item'       => esc_html__( 'Add New Farm Factory', 'farm' ),
		'add_new'            => esc_html__( 'Add New', 'farm' ),
		'new_item'           => esc_html__( 'New Farm Factory', 'farm' ),
		'edit_item'          => esc_html__( 'Edit Farm Factory', 'farm' ),
		'update_item'        => esc_html__( 'Update Farm Factory', 'farm' ),
		'search_items'       => esc_html__( 'Search Farm Factory', 'farm' ),
		'not_found'          => esc_html__( 'Not found', 'farm' ),
		'not_found_in_trash' => esc_html__( 'Not found in Trash', 'farm' ),
	);
	$args = array(
		'labels'                => $labels,
		'supports'              => array( 'title' ),
		'hierarchical'          => false,
		'public'                => false,
		'show_ui'               => true,
		'show_in_menu'          => true,
		'show_in_admin_bar'     => false,
		'show_in_nav_menus'     => false,
		'can_export'            => true,
		'publicly_queryable'    => false,
		'capability_type'       => 'post',
		'menu_icon'             => 'dashicons-admin-site-alt3',
	);
	register_post_type( 'farmfactory', $args );

}
add_action( 'init', 'farmfactory_post_type' );

/**
 * Remove date from posts column
 */
function farmfactory_remove_date_column( $columns ) {
	unset( $columns['date'] );
	return $columns;
}
add_filter( 'manage_farmfactory_posts_columns', 'farmfactory_remove_date_column' );

/**
 * Remove quick edit
 */
function farmfactory_remove_quick_edit( $actions, $post ) {
	if ( 'farmfactory' == $post->post_type ) {
		unset( $actions['inline hide-if-no-js'] );
	}
	return $actions;
}
add_filter( 'post_row_actions', 'farmfactory_remove_quick_edit', 10, 2 );

/**
 * Adds a meta box to post type mcwallet_banner
 */
class FarmFactory_Meta_Box {

	public function __construct() {

		if ( is_admin() ) {
			add_action( 'load-post.php',     array( $this, 'init_metabox' ) );
			add_action( 'load-post-new.php', array( $this, 'init_metabox' ) );
		}

	}

	public function init_metabox() {

		add_action( 'add_meta_boxes',        array( $this, 'add_metabox' )         );
		add_action( 'save_post',             array( $this, 'save_metabox' ), 10, 2 );

	}

	public function add_metabox() {

		add_meta_box(
			'banner_meta',
			esc_html__( 'Farm Factory Details', 'farm' ),
			array( $this, 'render_metabox' ),
			'farmfactory',
			'normal',
			'high'
		);

	}

	public function render_metabox( $post ) {

		/* Add nonce for security and authentication */
		wp_nonce_field( 'farmfactory_meta_action', 'farmfactory_meta_nonce' );

		// Retrieve an existing value from the database.
		$staking_address = get_post_meta( $post->ID, 'staking_address', true );
		$reward_address  = get_post_meta( $post->ID, 'reward_address', true );
		$reward_decimals = get_post_meta( $post->ID, 'reward_decimals', true );
		$reward_duration = get_post_meta( $post->ID, 'reward_duration', true );
		$network_name    = get_post_meta( $post->ID, 'network_name', true );
		$farm_address    = get_post_meta( $post->ID, 'farm_address', true );

		// Set default values.
		if ( empty( $staking_address ) ) $staking_address = '';
		if ( empty( $reward_address ) ) $reward_address   = '';
		if ( empty( $reward_decimals ) ) $reward_decimals = '';
		if ( empty( $reward_duration ) ) $reward_duration = '';
		if ( empty( $network_name ) ) $network_name       = '';
		if ( empty( $farm_address ) ) $farm_address       = '';

		// Form fields.
		echo '<table class="form-table mcwallet-form-table">';

		echo '	<tr>';
		echo '		<th><label>' . esc_html__( 'Staking erc20 Address', 'farm' ) . '</label></th>';
		echo '		<td>';
		echo '			<input type="text" name="staking_address" id="stakingAddress" class="large-text" value="' . esc_attr( $staking_address ) . '">
						<p class="description">' . esc_html__( 'ERC20 address of token\'s contract which users will stake (deposit). Free test tokens https://github.com/bokkypoobah/WeenusTokenFaucet', 'farm' ) . '</p>
					';
		echo '		</td>';
		echo '	</tr>';

		echo '	<tr>';
		echo '		<th><label>' . esc_html__( 'Reward erc20 address', 'farm' ) . '</label></th>';
		echo '		<td>';
		echo '			<div class="farmfactory-form-inline">
						<input type="text" name="reward_address" id="rewarsAddress" class="large-text" value="' . esc_attr( $reward_address ) . '">
						<span>' . esc_html__( '.Decimals', 'farm' ) . '</span>
						<input type="text" name="reward_decimals" id="farmfactory_reward_decimals" class="small-text" value="' . esc_attr( $reward_decimals ) . '">
						</div>
						<p class="description">' . esc_html__( 'ERC20 address of reward token which users will earn. You can use the same as "Staking address".', 'farm' ) . '</p>
					';
		echo '		</td>';
		echo '	</tr>';

		echo '	<tr>';
		echo '		<th><label>' . esc_html__( 'Reward Duration', 'farm' ) . '</label></th>';
		echo '		<td>';
		echo '			<input type="text" name="reward_duration" id="farmfactory_duration" class="large-text" value="' . esc_attr( $reward_duration ) . '">
						<p class="description">' . esc_html__( 'Enter _rewardsDuration - duration of staking round in seconds.', 'farm' ) . '<br>' . esc_html__( '86400 - 1 day, 2592000 - 30 day, 31536000 - 1 year', 'farm' ) . '</p>
						';
		echo '		</td>';
		echo '	</tr>';

		echo '	<tr>';
		echo '		<th><label>' . esc_html__( 'Newtwork', 'farm' ) . '</label></th>';
		echo '		<td>';
		echo '			<select name="network_name">
							<option value="ropsten" ' . selected( $network_name, 'ropsten', false ) . '>ropsten</option>
							<option value="mainnet" ' . selected( $network_name, 'mainnet', false ) . '>mainnet</option>
							<option value="rinkeby" ' . selected( $network_name, 'rinkeby', false ) . '>rinkeby</option>
							<option value="bsc" ' . selected( $network_name, 'bsc', false ) . '>bsc</option>
							<option value="bsc_test" ' . selected( $network_name, 'bsc_test', false ) . '>bsc_test</option>
						</select>';
		echo '			<p class="desctiption">' . esc_html__( 'Ropsten or Mainnet. We recommend to test on testnet with testnet tokens before launch', 'farm' ) . '</p>';
		echo '		</td>';
		echo '	</tr>';

		echo '	<tr>';
		echo '		<th><label>' . esc_html__( 'Farming Address', 'farm' ) . '</label></th>';
		echo '		<td>
						<div class="farmfactory-form-inline">
							<input name="farm_address" id="farmfactory_farmAddress" type="text" class="large-text" value="' . esc_attr( $farm_address ) . '">
							<button class="button button-secondary" id="farmfactory_deploy_button">' . esc_html__( 'Deploy', 'farm' ) . '</button>
						</div>
						<p class="desctiption">' . esc_html__( 'After deployment address will be automatically placed in the field above', 'farm' ) . '</p>
				</td>';
		echo '	</tr>';

		echo '</table>';

?>

<div id="farmfactory_loaderOverlay" class="farmfactory-overlay">
	<div class="farmfactory-loader"></div>
</div>

<style>
.farmfactory-form-inline {
	display: flex;
	align-items: center;
}
.farmfactory-form-inline .large-text {
	flex: 1;
}
.farmfactory-form-inline .small-text {
	flex: 0 0 80px;
	width: 80px;
}
.farmfactory-form-inline span {
	padding-left: 3px;
	padding-right: 3px;
}
.farmfactory-overlay {
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10000;
	background-color: rgb(255 255 255 / 80%);
}
.farmfactory-overlay.visible {
	display: block;
}
.farmfactory-loader {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	width: 40px;
	height: 40px;
	background-color: #313131;
	animation: rectangle 1.5s infinite ease-in-out;
}
@keyframes rectangle {
	0% {
		transform:perspective(12rem) rotateX(0deg) rotateY(0deg)
	}
	50% {
		transform:perspective(12rem) rotateX(-180.1deg) rotateY(0deg)
	}
	100% {
		transform:perspective(12rem) rotateX(-180deg) rotateY(-179.9deg)
	}
}
</style>


<script src="https://farm.wpmix.net/wp-content/plugins/farmfactory/lib/farmdeployer.js?rand=<?php echo rand(1,2222222); ?>"></script>

<script>
	var loaderOverlay = document.getElementById('farmfactory_loaderOverlay');
	var rewardsAddress = document.getElementById('rewarsAddress');
	var stakingAddress = document.getElementById('stakingAddress');
	var duration = document.getElementById('farmfactory_duration');
	var decimal = document.getElementById('farmfactory_reward_decimals');
	var button = document.getElementById('farmfactory_deploy_button');

	var farmAddress = document.getElementById('farmfactory_farmAddress');
	var amount = document.getElementById('amount');
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

	button.addEventListener('click', () => {
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
</script>

<?php

	}

	public function save_metabox( $post_id, $post ) {

		/* Add nonce for security and authentication */
		$nonce_name   = isset( $_POST['farmfactory_meta_nonce'] ) ? $_POST['farmfactory_meta_nonce'] : '';
		$nonce_action = 'farmfactory_meta_action';

		/* Check if a nonce is set */
		if ( ! isset( $nonce_name ) ) {
			return;
		}

		/* Check if a nonce is valid */
		if ( ! wp_verify_nonce( $nonce_name, $nonce_action ) ) {
			return;
		}

		/* Check if the user has permissions to save data */
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		/* Check if it's not an autosave */
		if ( wp_is_post_autosave( $post_id ) ) {
			return;
		}

		$staking_address = get_post_meta( $post->ID, 'staking_address', true );
		$reward_address  = get_post_meta( $post->ID, 'reward_address', true );
		$reward_decimals = get_post_meta( $post->ID, 'reward_decimals', true );
		$reward_duration = get_post_meta( $post->ID, 'reward_duration', true );
		$network_name    = get_post_meta( $post->ID, 'network_name', true );
		$farm_address    = get_post_meta( $post->ID, 'farm_address', true );

		/* Sanitize user input */
		$staking_address = isset( $_POST[ 'staking_address' ] ) ? sanitize_text_field( $_POST[ 'staking_address' ] ) : '';
		$reward_address  = isset( $_POST[ 'reward_address' ] ) ? sanitize_text_field( $_POST[ 'reward_address' ] ) : '';
		$reward_decimals = isset( $_POST[ 'reward_decimals' ] ) ? sanitize_text_field( $_POST[ 'reward_decimals' ] ) : '';
		$reward_duration = isset( $_POST[ 'reward_duration' ] ) ? sanitize_text_field( $_POST[ 'reward_duration' ] ) : '';
		$network_name    = isset( $_POST[ 'network_name' ] ) ? sanitize_text_field( $_POST[ 'network_name' ] ) : '';
		$farm_address    = isset( $_POST[ 'farm_address' ] ) ? sanitize_text_field( $_POST[ 'farm_address' ] ) : '';

		/* Update the meta field in the database */
		update_post_meta( $post_id, 'staking_address', $staking_address );
		update_post_meta( $post_id, 'reward_address', $reward_address );
		update_post_meta( $post_id, 'reward_decimals', $reward_decimals );
		update_post_meta( $post_id, 'reward_duration', $reward_duration );
		update_post_meta( $post_id, 'network_name', $network_name );
		update_post_meta( $post_id, 'farm_address', $farm_address );

	}

}

new FarmFactory_Meta_Box;
