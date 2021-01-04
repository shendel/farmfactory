<?php
namespace FARMFACTORY\Controllers;

use FARMFACTORY\Controller;


class HomePageController extends Controller {


	/**
	 *
	 */
	public function handle() {
		add_action( 'template_include', array( $this, 'template' ) );


	}

	public function template($template) {
		/*
        if ( is_front_page() || is_home() ) {

            return FARMFACTORY_TEMPLATE_DIR  .'/home.php';
        }
		*/

        return $template;
	}





}