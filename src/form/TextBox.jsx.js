/**
 * @file TextBox.jsx.js
 * @author Hu Jian <hujian02@baidu.com>
 */

define(function (require) {

    var React = require('react');
    var mixins = require('./mixins');

    return React.createClass({
        mixins: [mixins],

        getDefaultProps: function () {
            return {
                width: 200
            };
        },

        focus: function (caret) {
            var focusNode = this.refs.focusNode;
            focusNode.focus();
            if (caret != null) {
                focusNode.selectionStart = focusNode.selectionEnd = caret;
            }
        },

        render: function () {
            var containerProps = {
                className: 'fcui2-form-textbox',
                style: {width: this.props.width}
            };
            if (this.props.disable) {
                containerProps.className += ' fcui2-form-textbox-disable';
            }

            if (!this.state.isValid) {
                containerProps.className += ' fcui2-form-textbox-reject';
            }

            if (this.state.externalValidationError && this.state.externalValidationError.length > 0) {
                containerProps.className += ' fcui2-form-textbox-external-error';
            }

            var placeholderProps = {
                className: 'fcui2-form-textbox-placeholder',
                style: {visibility: (this.props.value && this.props.value.length) ? 'hidden' : 'visible'}
            };

            var {
                type,
                width,
                placeholder,
                ...inputProps
            } = this.props;

            return (
                <div {...containerProps}>
                    <div {...placeholderProps}>{this.props.placeholder}</div>
                    <input {...inputProps} style={{width: this.props.width - 20}} type='text' ref="focusNode" />
                    {
                        (() => {
                            if (!this.props.validationLabel) {
                                return <div className='fcui2-form-textbox-validation-label'>{this.getErrorMessage()}</div>
                            }
                        })()
                    }
                </div>
            );
        }
    });
});
