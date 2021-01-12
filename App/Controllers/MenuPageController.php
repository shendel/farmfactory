<?php
namespace FARMFACTORY\Controllers;

use FARMFACTORY\Controller;

class MenuPageController extends Controller
{

    /**
     *
     */
    public function handle()
    {
        add_action('admin_menu', array($this, 'menu'));


    }

    public function menu()
    {
        add_menu_page(
            esc_html__('Farm Factory', 'farmfactory'),
            esc_html__('Farm Factory', 'farmfactory'),
            'manage_options',
            'FARMFACTORY',
            [$this, 'page'],
            'dashicons-admin-site-alt3',
            81
        );
    }

    public function page()
    {
        $this->handleRequest();
     var_dump(   $this->view->display('/settings.php'));

    }

    public function handleRequest()
    {

        if ( ! empty($_POST['farmfactory_stakingAddress'])) update_option("farmfactory_stakingAddress",$_POST['farmfactory_stakingAddress']);
		if ( ! empty($_POST['farmfactory_networkName'])) update_option("farmfactory_networkName",$_POST['farmfactory_networkName']);
		if ( ! empty($_POST['farmfactory_rewardsAddress'])) update_option("farmfactory_rewardsAddress",$_POST['farmfactory_rewardsAddress']);
		if ( ! empty($_POST['farmfactory_farmAddress'])) update_option("farmfactory_farmAddress",$_POST['farmfactory_farmAddress']);


		if (!empty($_POST)) {
            ?>
            <div id="message" class="notice notice-success is-dismissible">
            <p><?php esc_html_e('Settings saved','farmfactory'); ?></p>
                <button type="button" class="notice-dismiss"><span
                            class="screen-reader-text"><?php esc_html_e('Dismiss this notice.','farmfactory'); ?></span>
                </button>
            </div>
            <?php
		}

    }


}
