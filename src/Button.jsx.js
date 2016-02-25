define(function (require) {
    var React = require('react');
    return React.createClass({
        // @override
        getDefaultProps: function () {
            return {
                className: '',
                minWidth: 40,
                width: null,
                type: 'button',
                name: '',
                label: 'Button',
                icon: '',
                value: '',
                skin: '',
                disable: false,
                onClick: function () {}
            };
        },
        // @override
        getInitialState: function () {
            return {active: false};
        },
        // 这样写的原因是：react自动加span把label包了起来，导致css:active在IE中不好使
        mouseDownHandler: function (e) {
            e.stopPropagation();
            this.setState({active: true});
        },
        mouseUpHandler: function (e) {
            e.stopPropagation();
            this.setState({active: false});
        },
        clickHandler: function (e) {
            e.stopPropagation();
            if (this.props.disable) return;
            this.props.onClick({
                target: this,
                value: this.props.value
            });
        },
        render: function () {
            var dom = [];
            var containerProp = {
                className: 'fcui2-button ' + this.props.className,
                style: {minWidth: this.props.minWidth},
                onMouseDown: this.mouseDownHandler,
                onMouseUp: this.mouseUpHandler,
                onClick: this.clickHandler
            };
            var inputProp = {
                type: 'button;submit;reset;'.indexOf(this.props.type + ';') > -1 ? this.props.type : 'button',
                name: this.props.name,
                value: this.props.label,
                key: 'button' 
            };
            if (this.props.disable) {
                containerProp.className += ' fcui2-button-disable';
            }
            else {
                if (this.state.active) {
                    containerProp.className += ' fcui2-button-active';
                }
                if (this.props.skin.length > 0) {
                    containerProp.className += ' fcui2-button-' + this.props.skin;
                }
            }
            if (this.props.width != null) {
                delete containerProp.style.minWidth;
                containerProp.style.width = this.props.width;
            }
            if (this.props.icon.length > 0) {
                inputProp.style = {textAlign: 'left'};
                dom.push(<div className={'font-icon ' + this.props.icon} key="icon"/>);
            }
            dom.push(<input {...inputProp}/>);
            return <div {...containerProp}>{dom}</div>;
        }
    });
});
