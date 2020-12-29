<div class="wrap">
    <div class="welcome-panel">
        <h2><?php echo esc_html(get_admin_page_title()); ?></h2>
        <h2 class="nav-tab-wrapper farmfactory-nav-tabs wp-clearfix">
            <a href="#farmfactory-tab-1" class="nav-tab nav-tab-active">
                <?php esc_html_e('Main Setting', 'farmfactory'); ?>
            </a>
        </h2>

        <div class="welcome-panel-column-container farmfactory-panel-tab panel-tab-active" id="farmfactory-tab-1">
            <div class="farmfactory-shortcode-panel-row">
                <form action="#" method="post" class="wp-farmfactory-widget-form">

                    <table class="form-table">
                        <tbody>
                        <tr>
                            <th scope="row">
                                <label><?php esc_html_e('Logo url 1', 'farmfactory'); ?></label>
                            </th>
                            <td>
                                <div class="farmfactory-form-inline">
                                    <input value="<?php echo esc_attr(get_option('farmfactory_icon')); ?>"
                                           name="farmfactory_icon" type="text" class="large-text js-farmfactory-load-icon ">
                                    <button class="button button-secondary farmfactory-input-icon"><?php esc_html_e('Upload icon',
                                            'farmfactory'); ?></button>

                                </div>
                            </td>
                        </tr>
<!--                        <tr>-->
<!--                            <th scope="row">-->
<!--                                <label>--><?php //esc_html_e('Logo url 2', 'farmfactory'); ?><!--</label>-->
<!--                            </th>-->
<!--                            <td>-->
<!--                                <div class="farmfactory-form-inline">-->
<!--                                    <input value="--><?php //echo esc_attr(get_option('farmfactory_icon2')); ?><!--"-->
<!--                                           name="farmfactory_icon2"-->
<!--                                           type="text" class="large-text js-farmfactory-load-icon2 ">-->
<!--                                    <button class="button button-secondary farmfactory-input-icon2">-->
<!--                                        --><?php //esc_html_e('Upload icon', 'farmfactory'); ?>
<!--                                    </button>-->
<!---->
<!--                                </div>-->
<!--                            </td>-->
<!--                        </tr>-->
                        <tr>
                            <th scope="row"></th>
                            <td>
                                <input type="submit" name="mcwallet-add-token"
                                       class="button button-primary mcwallet-add-token"
                                       value="<?php esc_attr_e('Save', 'farmfactory'); ?>">
                                <span class="spinner"></span>
                            </td>
                        </tr>
                        </tbody>
                    </table>


                </form>

            </div>
        </div>
    </div>

</div>