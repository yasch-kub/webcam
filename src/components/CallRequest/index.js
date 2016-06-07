import React, {PropTypes} from 'React';

import {
    Paper,
    FontIcon,
    RaisedButton,
    Avatar
} from 'material-ui'

export default class CallRequest extends React.Component {

    static propTypes = {
        takeUpHandle: PropTypes.func,
        rejectCallHandle: PropTypes.func,
        header: PropTypes.string,
        avatar: PropTypes.string,
        text: PropTypes.string,
        style: PropTypes.object
    };

    iconStyle = {
        margin: 'auto'
    };

    formStyle = {
        padding: 10,
        textAlign: 'center',
        ...this.props.style
    };

    buttonStyle = {
        marginRight: 10
    };

    headerStyle = {
        textTransform: 'uppercase'
    };

    render() {
        return (
            <div
                zIndex = {2}
                style = {this.formStyle}
            >
                <Avatar
                    src = {this.props.avatar}
                    size = {100}
                />
                <h2 style = {this.headerStyle}>
                    {this.props.header}
                </h2>
                <h3>
                    {this.props.text}
                </h3>
                <RaisedButton
                    label = "Take up"
                    labelPosition = "before"
                    primary = {true}
                    icon = {<FontIcon className = "material-icons">call</FontIcon>}
                    style = {this.buttonStyle}
                    onClick = {this.props.takeUpHandle}
                />
                <RaisedButton
                    label="Reject"
                    labelPosition = "before"
                    secondary = {true}
                    icon = {<FontIcon className = "material-icons">call_end</FontIcon>}
                    onClick = {this.props.rejectCallHandle}
                />
            </div>
        );
    }
}