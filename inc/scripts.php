<?php
/**
 * Enqueue Scripts
 */

/**
 * Never worry about cache again!
 */
function farm_load_scripts() {
	// create my own version codes.
	$my_js_ver  = gmdate( 'ymd-Gis', filemtime( FARMFACTORY_PATH . 'lib/farmfactory.js' ) );
	$my_css_ver = gmdate( 'ymd-Gis', filemtime( FARMFACTORY_PATH . 'farmfactory.css' ) );

	wp_enqueue_script( 'farmfactory-js', FARMFACTORY_URL . 'lib/farmfactory.js', array(), $my_js_ver, true );

	wp_enqueue_style( 'farmfactory-css', FARMFACTORY_URL . 'farmfactory.css', false, $my_css_ver );

	$farm_factories = array();

	$farm_args = array(
		'post_type'      => 'farmfactory',
		'posts_per_page' => -1,
	);

	$farm_query = new WP_Query( $farm_args );

	if ( $farm_query->have_posts() ) :

		while ( $farm_query->have_posts() ) : $farm_query->the_post();
			$post_id = get_the_ID();
			$farm_factories[ $post_id ]['networkName'] = get_post_field( 'post_name' );
			$farm_factories[ $post_id ]['farmAddress'] = get_post_meta( get_the_ID(), 'farm_address', true );
			$farm_factories[ $post_id ]['rewardsAddress'] = get_post_meta( get_the_ID(), 'reward_address', true );
			$farm_factories[ $post_id ]['rewardsDecimals'] = get_post_meta( get_the_ID(), 'reward_decimals', true );
			$farm_factories[ $post_id ]['rewardsDuration'] = get_post_meta( get_the_ID(), 'reward_duration', true );
			$farm_factories[ $post_id ]['stakingAddress'] = get_post_meta( get_the_ID(), 'staking_address', true );
		endwhile;

	endif;
	wp_reset_postdata();

	/* Translatable string */
	wp_localize_script('farmfactory-js', 'farmfactory',
		array(
			'items' => $farm_factories,
			'nonce' => wp_create_nonce( 'farmfactory-nonce' ),
		)
	);

	$inline_scripts = '
		farmFactory.init({
			networkName: "' . get_option( 'farmfactory_networkName', 'kovan' ) . '",
			farmAddress: "' . get_option( 'farmfactory_farmAddress', '0x38054641b795fb9604961b4c18b871f42bf8afb0' ) . '",
			rewardsAddress: "' . get_option( 'farmfactory_rewardsAddress', '0x93d83a81905a1baf4615bcb51db3f2f2bbf6ab9e' ) . '",
			stakingAddress: "' . get_option( 'farmfactory_stakingAddress', '0xc3eC8ED5Ce2a19CA40210002116712645dBEceC4' ) . '"
		});
	';

	wp_add_inline_script( 'farmfactory-js', $inline_scripts, 'after' );
}
add_action('wp_enqueue_scripts', 'farm_load_scripts');
