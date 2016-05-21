import React, { PropTypes } from 'react'

import {
    TextField,
    FontIcon,
    RaisedButton,
} from 'material-ui'

import ChatAttachments from '../ChatAttacments'

export default class MessageForm extends React.Component {

    state = {
        text: ''
    };

    static propTypes = {
        onSubmit: PropTypes.func
    };

    resetForm() {
        this.setState({
            text: ''
        })
    }

    handleChange(e) {
        this.setState({
            text: e.target.value
        })
    }

    handleSubmit() {
        if (!this.state.text)
            return;

        this.resetForm();
        this.props.onSubmit(this.state.text);
    }

    sendButtonStyle = {
        marginLeft: 15,
        verticalAlign: 'top'
    };

    render() {
        return (
            <div>
                <div style = {this.formStyle}>
                    <TextField
                        hintText = "Message"
                        multiLine = {true}
                        rows = {1}
                        rowsMax = {4}
                        underlineShow = {true}
                        onChange = {::this.handleChange}
                        value = {this.state.text}
                    />
                    <RaisedButton
                        label = "Send"
                        style = {this.sendButtonStyle}
                        primary = {true}
                        icon = {<FontIcon className="material-icons">send</FontIcon>}
                        labelPosition = "before"
                        onClick = {::this.handleSubmit}
                    />
                </div>
                <ChatAttachments />
            </div>
        );
    }
}