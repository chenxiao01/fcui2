define(function (require) {


    var React = require('react');
    var Button = require('fcui/Button.jsx');
    var Form = require('fcui/Form.jsx');
    var TextBox = require('fcui/TextBox.jsx');
    var NumberBox = require('fcui/NumberBox.jsx');
    var TextArea = require('fcui/TextArea.jsx');


    return React.createClass({
        // @override
        getDefaultProps: function () {
            return {};
        },
        getInitialState: function () {
            return {
                message: ''
            };
        },
        formFieldChange: function (state) {
            this.setState({
                message: JSON.stringify(state)
            });
        },
        render: function () {
            var containerProp = {
                className: 'demo-content demo-item',
                style: {
                    display: this.props.demo === 'Form' ? 'block' : 'none'
                }
            };
            var nameValid = {
                required: true,
                maxLength: 4
            };
            var ageValid = {
                required: true,
                min: function (v) {
                    return v < 18 ? '不能小于18岁': true;
                }
            };
            var introValid = {
                required: true,
                maxByteLength: 40
            };
            var formValid = {
                hehe: function (values) {
                    if (values.age > 20 && values.name.indexOf('a') < 0) {
                        return '大于20岁的人姓名里必须含有a';
                    }
                    return true;
                }
            };
            return (
                <div {...containerProp}>
                    <h3>Normal Form</h3>
                    <Form className="demo-form">
                        姓名：<TextBox name="name"/><br/>
                        年龄：<NumberBox /><br/>
                        简介：<TextArea className="form-textarea"/>
                    </Form>
                    <h3>Form With Validation</h3>
                    <div className="props">{this.state.message}</div>
                    <Form className="demo-form"
                        onFieldChange={this.formFieldChange} onSubmit={this.formFieldChange}
                        validations={formValid}
                    >
                        姓名：<TextBox name="name" validations={nameValid}/><br/>
                        年龄：<NumberBox name="age" validations={ageValid}/><br/>
                        简介：<TextArea name="intro" className="form-textarea" validations={introValid}/>
                        <Button type="submit" label="提交" skin="important"/>
                    </Form>
                </div>
            );
        }
    });
});