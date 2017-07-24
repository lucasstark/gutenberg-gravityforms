/**
 * The gravity form block
 */



(function (blocks, i18n, element) {
    var el = element.createElement;
    var __ = i18n.__;

    var __ = wp.i18n.__; // The __() for internationalization.
    var el = wp.element.createElement; // The wp.element.createElement() function to create elements.
    var InspectorControls = wp.blocks.InspectorControls;
    var SelectControl = wp.blocks.InspectorControls.SelectControl;
    var Editable = wp.blocks.Editable; // Editable component of React.
    var children = wp.blocks.query.children; // The children() function to extract child nodes from a paragraph of rich text.


    var blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px'
    };

    blocks.registerBlockType('gutenberg-gravityforms/single-form', {
        title: __('Gravity Form', 'gutenberg-gravityforms'),
        icon: 'media-spreadsheet',
        category: 'layout',

        defaultAttributes: {
            form_id: '',
        },

        edit: function (props) {
            var focus = props.focus;

            return [
                !!focus && el(
                    InspectorControls,
                    {key: 'inspector'},
                    el(
                        SelectControl,
                        {
                            label: 'Gravity Form',
                            selected: parseInt(props.attributes.form_id),
                            instanceId: 'gravity-form-selector',
                            onBlur: function (value) {
                                props.setAttributes({form_id: value});
                            },
                            onChange: function (event) {
                                props.setAttributes({form_id: event.target.value});
                            },
                            options: gb_gravityforms_block_params.forms
                        }
                    )
                ),
                el('div', {}, i18n.__('Form'))
            ];
        },
        save: function () {
            return null
        },
    });
})(
    window.wp.blocks,
    window.wp.i18n,
    window.wp.element
);