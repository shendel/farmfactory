<?php
/**
 * Farm Factory Init
 *
 * @package Farm Factory
 */

/**
 * Init
 */
require FARMFACTORY_PATH . 'App/autoload.php';

/**
 * Functions
 */
require FARMFACTORY_PATH . 'inc/functions.php';

/**
 * Load pro functions if exists
 */
$farmfactory_pro_path = FARMFACTORY_PATH . 'pro/init-pro.php';
if ( file_exists( $farmfactory_pro_path ) ) {
	require FARMFACTORY_PATH . 'pro/init-pro.php';
}

/**
 * Enqueue Scripts
 */
require FARMFACTORY_PATH . 'inc/scripts.php';

/**
 * Shortcodes
 */
require FARMFACTORY_PATH . 'inc/shortcode.php';

/**
 * MetaBox
 */
require FARMFACTORY_PATH . 'inc/metabox.php';

/**
 * Post Type
 */
require FARMFACTORY_PATH . 'inc/post-type.php';
