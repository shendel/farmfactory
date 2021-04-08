<?php
/**
Plugin Name: Farm Factory
Description: Stake farming contract
Author: Denis Ivanov
Requires PHP: 7.1
Text Domain: farm
Domain Path: /lang
Version: 2.0.2
 */
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'FARMFACTORY_TEMPLATE_DIR', __DIR__ . '/templates' );
define( 'FARMFACTORY_BASE_DIR', __DIR__ );
define( 'FARMFACTORY_BASE_FILE', __FILE__ );
define( 'FARMFACTORY_PATH', plugin_dir_path( __FILE__ ) );
define( 'FARMFACTORY_URL', plugin_dir_url( __FILE__ ) );
define( 'FARMFACTORY_VER', '1.0.19');
/**
 * Plugin Init
 */
require __DIR__ . '/App/autoload.php';

/**
 * Plugin Init
 */
require FARMFACTORY_PATH . 'inc/init.php';
