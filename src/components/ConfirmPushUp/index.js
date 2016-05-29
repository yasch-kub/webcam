import React, {PropTypes} from 'react'

import {
    Paper,
    RaisedButton
} from 'material-ui'

export default class ConfirmPushUp extends React.Component {

    formStyle = {
        textAlign: 'center',
        display: 'inline-block',
        padding: 10,
        marginLeft: 500,
        right: 15,
        position: 'absolute',
        bottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.15)'
    };

    static defaultProps = {
        visible: true,
        onConfirm: () => {},
        onReject: () => {}
    };

    static propTypes = {
        visible: PropTypes.bool,
        onConfirm: PropTypes.func,
        onReject: PropTypes.func,
        title: PropTypes.string,
        message: PropTypes.string
    };

    render() {
        return (
            this.props.visible &&
            <div>
                <Paper
                    zDepth={1}
                    style={this.formStyle}
                >
                    <h3>
                        {this.props.title.toUpperCase()}
                    </h3>
                    <h4>
                        {this.props.message}
                    </h4>
                    <RaisedButton
                        label = "Yes"
                        primary = {true}
                        onClick = {this.props.onConfirm}
                        style = {{marginRight: 10}}
                    />
                    <RaisedButton
                        label = "No"
                        secondary = {true}
                        onClick = {this.props.onReject}
                    />
                </Paper>
            </div>
        );
    }
}