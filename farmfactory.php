<?php
/**
Plugin Name: Farm Factory
Description: Stake farming contract
Author: Denis Ivanov
Requires PHP: 7.1
Text Domain: farm
Domain Path: /lang
Version: 1.0.114
 */
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'farmfactory_TEMPLATE_DIR', __DIR__ . '/templates' );
define( 'farmfactory_BASE_DIR', __DIR__ );
define( 'farmfactory_BASE_FILE', __FILE__ );
define( 'farmfactory_VER', '1.0.1' );
/**
 * Plugin Init
 */
require __DIR__ . '/App/autoload.php';


/**
 * Never worry about cache again!
 */
function farm_load_scripts($hook) {
 
    // create my own version codes
    $my_js_ver  = date("ymd-Gis", filemtime( plugin_dir_path( __FILE__ ) . 'src/build/app.js' ));
    wp_enqueue_script( 'custom_js', plugins_url( 'lib/index.js', __FILE__ ), array(), $my_js_ver );
 
}
add_action('wp_enqueue_scripts', 'farm_load_scripts');
