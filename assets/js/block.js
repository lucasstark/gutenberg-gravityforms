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
    var ToggleControl = wp.blocks.InspectorControls.ToggleControl;


    var blockStyle = {
        backgroundColor: '#900',
        color: '#fff',
        padding: '20px'
    };

    blocks.registerBlockType('gutenberg-gravityforms/single-form', {
        title: __('Gravity Form', 'gutenberg-gravityforms'),
        icon: 'media-spreadsheet',
        category: 'layout',

        attributes: {
            form_id: {
                type : 'string'
            },
            displayFormTitle : {
                type: 'bool',
                default : true
            },
            displayFormDescription : {
                type : 'bool',
                default : true
            },
            enableAjax : {
                type : 'bool',
                default : false
            }

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
                            label:  __('Gravity Form', 'gutenberg-gravityforms'),
                            value: parseInt(props.attributes.form_id),
                            instanceId: 'gravity-form-selector',
                            onChange: function (value) {
                                props.setAttributes({form_id: value});
                            },
                            options: gb_gravityforms_block_params.forms,
                        }
                    ),
                    el(
                        'div',
                        {
                            'style': {
                                'padding': '8px 0 0 0',
                                'font-size': '11px',
                                'font-style': 'italic',
                                'color': '#5A5A5A',
                                'margin-top': '-22px'
                            },
                        },
                        'Cant find your form? Make sure it is active.'
                    ),
                    el(
                        ToggleControl,
                        {
                            label: 'Display form title',
                            checked: props.attributes.displayFormTitle,
                            instanceId: 'gravity-form-display-form-title',
                            onChange: function (event) {
                                props.setAttributes({displayFormTitle: !props.attributes.displayFormTitle});
                            }
                        }
                    ),
                    el(
                        ToggleControl,
                        {
                            label: 'Display form description',
                            checked: props.attributes.displayFormDescription,
                            instanceId: 'gravity-form-display-form-description',
                            onChange: function (event) {
                                props.setAttributes({displayFormDescription: !props.attributes.displayFormDescription});
                            }
                        }
                    ),
                    el(
                        ToggleControl,
                        {
                            label: 'Enable Ajax',
                            checked: props.attributes.enableAjax,
                            instanceId: 'gravity-form-display-enable-ajax',
                            onChange: function (event) {
                                props.setAttributes({enableAjax: !props.attributes.enableAjax});
                            }
                        }
                    )
                ),
                el('div', {}, __('Gravity Form: ') + gb_gravityforms_block_params.formMeta[ props.attributes.form_id ].title)
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