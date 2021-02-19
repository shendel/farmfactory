<?php
/**
Plugin Name: Farm Factory
Description: Stake farming contract
Author: Denis Ivanov
Requires PHP: 7.1
Text Domain: farm
Domain Path: /lang
Version: 1.1.2
 */
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'FARMFACTORY_TEMPLATE_DIR', __DIR__ . '/templates' );
define( 'FARMFACTORY_BASE_DIR', __DIR__ );
define( 'FARMFACTORY_BASE_FILE', __FILE__ );
define( 'FARMFACTORY_VER', "1.0.19");
/**
 * Plugin Init
 */
require __DIR__ . '/App/autoload.php';


/**
 * Never worry about cache again!
 */
function farm_load_scripts($hook) {

    // create my own version codes
    $my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'lib/farmfactory.js' ));
    $my_css_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'farmfactory.css' ));

	wp_enqueue_script( 'farmfactory-js', plugins_url( 'lib/farmfactory.js', __FILE__ ), array(), $my_js_ver );

	wp_register_style( 'farmfactory-css',    plugins_url( 'farmfactory.css',    __FILE__ ), false,   $my_css_ver );
	wp_enqueue_style ( 'farmfactory-css' );
}
add_action('wp_enqueue_scripts', 'farm_load_scripts');


add_shortcode( 'farmfactory', 'farmfactory_main_shortcode' );
function farmfactory_main_shortcode( $atts ){
	return "<div id=\"farmfactory-widget-root\"></div>

  <script type=\"text/javascript\" src=\"https://unpkg.com/web3@1.2.11/dist/web3.min.js\"></script>
  <script type=\"text/javascript\" src=\"https://unpkg.com/web3modal@1.9.0/dist/index.js\"></script>
  <script type=\"text/javascript\" src=\"https://cdnjs.cloudflare.com/ajax/libs/bignumber.js/8.0.2/bignumber.min.js\"></script>
  <script type=\"text/javascript\" src=\"https://unpkg.com/@walletconnect/web3-provider@1.2.1/dist/umd/index.min.js\"></script>
  <script type=\"text/javascript\" src=\"https://unpkg.com/fortmatic@2.0.6/dist/fortmatic.js\"></script>

  <script>
    farmFactory.init({
      widget: {
        networkName: '".get_option("farmfactory_networkName","kovan")."',
        farmAddress: '".get_option("farmfactory_farmAddress","0x38054641b795fb9604961b4c18b871f42bf8afb0")."',
        rewardsAddress: '".get_option("farmfactory_rewardsAddress","0x93d83a81905a1baf4615bcb51db3f2f2bbf6ab9e")."',
        stakingAddress: '".get_option("farmfactory_stakingAddress","0xc3eC8ED5Ce2a19CA40210002116712645dBEceC4")."'
      },
      wallet: {
        providerOptions: {
          walletconnect: {
            package: window.WalletConnectProvider.default,
            options: {
              // Mikko's test key - don't copy as your mileage may vary
              infuraId: '8043bb2cf99347b1bfadfb233c5325c0',
            },
          },
          fortmatic: {
            package: window.Fortmatic,
            options: {
              // Mikko's TESTNET api key
              key: 'pk_test_391E26A3B43A3350',
            },
          },
        },
      },
    });
  </script>";
}

add_shortcode( 'farmfactoryTimer', 'farmfactory_timer_shortcode' );
function farmfactory_timer_shortcode( $atts ){
	 return "<div id=\"farmfactory-timer-root\"></div>";
}
