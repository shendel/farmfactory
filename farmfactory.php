<?php
/**
Plugin Name: Farm Factory
Description: Stake farming contract
Author:  Denis Kaiser
Requires PHP: 7.1
Text Domain: farmfactory
Domain Path: /lang
Version: 1.0.1
 */
/* Define Plugin Constants */
defined( 'ABSPATH' ) || exit;
define( 'DEFINANCE_TEMPLATE_DIR', __DIR__ . '/templates' );
define( 'DEFINANCE_BASE_DIR', __DIR__ );
define( 'DEFINANCE_BASE_FILE', __FILE__ );
define( 'DEFINANCE_VER', '1.0.1' );
/**
 * Plugin Init
 */
require __DIR__ . '/App/autoload.php';


