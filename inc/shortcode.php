<?php
/**
 * Shortcodes
 */

function farmfactory_main_shortcode() {

	$inline_scripts = '
		farmFactory.init({
			networkName: "' . get_option( 'farmfactory_networkName', 'kovan' ) . '",
			farmAddress: "' . get_option( 'farmfactory_farmAddress', '0x38054641b795fb9604961b4c18b871f42bf8afb0' ) . '",
			rewardsAddress: "' . get_option( 'farmfactory_rewardsAddress', '0x93d83a81905a1baf4615bcb51db3f2f2bbf6ab9e' ) . '",
			stakingAddress: "' . get_option( 'farmfactory_stakingAddress', '0xc3eC8ED5Ce2a19CA40210002116712645dBEceC4' ) . '"
		});
	';

	wp_add_inline_script( 'farmfactory-js', $inline_scripts, 'after' );

	return '<div id="farmfactory-widget-root"></div>';
}
add_shortcode( 'farmfactory', 'farmfactory_main_shortcode' );

function farmfactory_timer_shortcode() {
	return '<div id="farmfactory-timer-root"></div>';
}
add_shortcode( 'farmfactoryTimer', 'farmfactory_timer_shortcode' );
