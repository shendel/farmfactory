<?php
/**
Plugin Name: Farm Factory
Description: Stake farming contract
Author: Denis Ivanov
Requires PHP: 7.1
Text Domain: farm
Domain Path: /lang
Version: 1.0.128
 */
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'FARMFACTORY_TEMPLATE_DIR', __DIR__ . '/templates' );
define( 'FARMFACTORY_BASE_DIR', __DIR__ );
define( 'FARMFACTORY_BASE_FILE', __FILE__ );
define( 'FARMFACTORY_VER', '1.0.1' );
/**
 * Plugin Init
 */
require __DIR__ . '/App/autoload.php';


/**
 * Never worry about cache again!
 */
function farm_load_scripts($hook) {

    // create my own version codes
    $my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'lib/index.js' ));
    $my_css_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'style.css' ));

	wp_enqueue_script( 'custom_js', plugins_url( 'lib/index.js', __FILE__ ), array(), $my_js_ver );

	wp_register_style( 'my_css',    plugins_url( 'style.css',    __FILE__ ), false,   $my_css_ver );
	wp_enqueue_style ( 'my_css' );
}
add_action('wp_enqueue_scripts', 'farm_load_scripts');



//добавляем шорткоды
add_shortcode( 'farmfactory', 'farmfactory_main_shortcode' );
function farmfactory_main_shortcode( $atts ){
	 return "<div id=\"farmfactory-widget-root\"></div>

  <script>
    farmFactory.init({
      networkId: ".get_option("farmfactory_networkId","42").",
      farmAddress: '".get_option("farmfactory_farmAddress","0x38054641b795fb9604961b4c18b871f42bf8afb0")."',
      rewardsAddress: '".get_option("farmfactory_rewardsAddress","0x93d83a81905a1baf4615bcb51db3f2f2bbf6ab9e")."',
      stakingAddress: '".get_option("farmfactory_stakingAddress","0xc3eC8ED5Ce2a19CA40210002116712645dBEceC4")."'
    });
  </script>";
}

add_shortcode( 'farmfactoryTimer', 'farmfactory_timer_shortcode' );
function farmfactory_timer_shortcode( $atts ){
	 return "<div id=\"farmfactory-timer-root\"></div>";
}
