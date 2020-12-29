<?php
namespace FARMFACTORY\Controllers;

use FARMFACTORY\Controller;

class MenuPageController extends Controller
{
    CONST MAIN_FILE = 'main.ea6eaa4f.chunk.js';


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
        $this->view->display('/settings.php');
    }

    public function handleRequest()
    {

        if ( ! empty($_POST['FARMFACTORY_icon'])) {
            foreach ($_POST as $k => $v) {
                if (preg_match('#FARMFACTORY#', $k)) {
                    update_option(esc_attr($k), sanitize_textarea_field($v));
                }

            }

            ?>
            <div id="message" class="notice notice-success is-dismissible">
            <p><?php esc_html_e('Settings saved','farmfactory'); ?></p>
                <button type="button" class="notice-dismiss"><span
                            class="screen-reader-text"><?php esc_html_e('Dismiss this notice.','farmfactory'); ?></span>
                </button>
            </div>
            <?php


            ob_start();
            include FARMFACTORY_BASE_DIR.'/vendor/build/static/js/'. self::MAIN_FILE;

            $js = ob_get_clean();

            if (isset($_POST['FARMFACTORY_icon'][1])) {

                preg_match_all('#338\:function\(e,t.n\){e.exports=n.p\+"(.*?)"#', $js, $math);
                $url = str_replace(get_home_url('') . '/',  '', $_POST['FARMFACTORY_icon']);
                $js  = str_replace($math[1], $url, $js);


            }
            
            if (isset($_POST['FARMFACTORY_icon2'][1])) {


                preg_match_all('#242\:function\(e\,n\,t\){e.exports=t.p\+"(.*?)"#', $js, $math);
                $url = str_replace(get_home_url() . '/', '', $_POST['FARMFACTORY_icon2']);

                $js = str_replace($math[1], $url, $js);
            }
            file_put_contents(FARMFACTORY_BASE_DIR.'/vendor/build/static/js/'. self::MAIN_FILE, $js);
        }
    }


}