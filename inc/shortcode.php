<?php
/**
 * Shortcodes
 *
 * @package Farm Factory
 */

/**
 * Main Shortcode
 */
function farmfactory_main_shortcode( $atts ) {

	$atts = shortcode_atts( array(
		'id' => null,
	), $atts );

	$id = $atts['id'];

	if ( ! $id ) {
		return;
	}

	$post = get_post( $id );

	if ( ! $post ) {
		return;
	}

	$inline_scripts = '
	const widget' . esc_js( $id ) . ' = new farmFactory.Widget({
		selector: "ff-widget-' . esc_js( $id ) . '",
		farmAddress: "' . get_post_meta( $id, 'farm_address', true ) . '",
		rewardsAddress: "' . get_post_meta( $id, 'reward_address', true ) . '",
		stakingAddress: "' . get_post_meta( $id, 'staking_address', true ) . '",
		rewardsTokenIcon: "' . get_the_post_thumbnail_url( $id, 'medium' ) . '",
	});
	';

	wp_add_inline_script( 'farmfactory-js', $inline_scripts, 'after' );

	return '<div id="ff-widget-' . esc_attr( $id ) . '"></div>';
}
add_shortcode( 'farmfactory', 'farmfactory_main_shortcode' );

/**
 * Timer Shortcode
 */
function farmfactory_timer_shortcode() {
	return '<div id="farmfactory-timer-root"></div>';
}
add_shortcode( 'farmfactoryTimer', 'farmfactory_timer_shortcode' );
