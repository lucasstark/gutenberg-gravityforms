<?php
/**
 * Plugin Name: Gutenberg Gravity Form Selector
 * Plugin URI: https://github.com/lucasstark/gutenberg-gravityforms
 * Description: Shows how to build a Editor Block which represents a shortcode, specific example shown here is to render a Gravity Form
 * Author: lucasstark
 * Author URI: https://elementstark.com/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package GB
 */

// Exit if accessed directly.
if ( !defined( 'ABSPATH' ) ) {
	exit;
}


class GB_Gravity_Forms {

	/**
	 * @var GB_Gravity_Forms
	 */
	private static $instance;


	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( self::$instance == null ) {
			self::$instance = new GB_Gravity_Forms();
		}
	}


	/**
	 * @var string The plugin base directory path ( without trailing slash )
	 */
	private $_dir;

	/**
	 * @var string The plugin base URL path ( without trailing slash )
	 */
	private $_url;

	/**
	 * @var string Asset version string
	 */
	private $_assets_version;

	/**
	 * @var GB_Gravity_Forms_Form_Block
	 */
	private $_form_block_output;


	private function __construct() {
		$this->_dir = untrailingslashit( plugin_dir_path( __FILE__ ) );
		$this->_url = untrailingslashit( plugins_url( '/', __FILE__ ) );

		$this->assets_version = '1.0.0';


		add_action( 'enqueue_block_editor_assets', array( $this, 'on_enqueue_block_editor_assets' ) );
		add_action( 'plugins_loaded', array( $this, 'on_plugins_loaded' ) );
	}


	public function on_plugins_loaded() {
		require $this->_dir . '/inc/blocks/class-gb-gravityforms-form-block.php';
		$this->_form_block_output = new GB_Gravity_Forms_Form_Block();
	}


	public function on_enqueue_block_editor_assets() {

		// Scripts.
		wp_enqueue_script(
			'gb-gravityforms-block', // Handle.
			$this->_url . '/assets/js/block.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
			$this->assets_version
		);

		// Styles.
		wp_enqueue_style(
			'gb-gravityforms-block', // Handle.
			$this->_url . '/assets/css/editor.css',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies, defined above.
			$this->assets_version );


		$forms    = array();
		$formmeta = array();
		foreach ( GFAPI::get_forms() as $form ) {
			$forms[] = array(
				'value' => $form['id'],
				'label' => $form['title']
			);

			$formmeta[ $form['id'] ] = array( 'title' => $form['title'] );

		}

		wp_localize_script( 'gb-gravityforms-block', 'gb_gravityforms_block_params', array(
			'forms'    => $forms,
			'formMeta' => $formmeta
		) );


	}

}

GB_Gravity_Forms::register();