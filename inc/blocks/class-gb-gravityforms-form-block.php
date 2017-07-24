<?php

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


/**
 * Class GB_Gravity_Forms_Form_Block
 * Renders the output for the actual selected Gravity Form.
 */
class GB_Gravity_Forms_Form_Block {


	public function __construct() {

		add_action( 'init', array( $this, 'on_init' ) );

	}


	public function on_init() {
		register_block_type( 'gutenberg-gravityforms/single-form', array(
			'render' => array( $this, 'on_render_block' )
		) );
	}


	public function on_render_block( $attributes ) {
		$form_id = is_array( $attributes ) && isset( $attributes['form_id'] ) ? $attributes['form_id'] : false;

		if ( $form_id ) {
			return '[gravityform id="' . $form_id . '" /]';
		}

	}


}
