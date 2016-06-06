import React, {PropTypes} from 'react'

import {
    IconButton,
    Paper
} from 'material-ui'

import {red500, greenA700} from 'material-ui/styles/colors'

export default class CallControlPanel extends React.Component {

    static propTypes = {
        changeMuteNotification: PropTypes.func,
        call: PropTypes.func
    };

    render() {
        return (
            <Paper
                zIndex = {2}
                style={{
                    display: 'block',
                    padding: 5,
                    width: '100%',
                    margin: 10,
                    textAlign: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }}
            >
                <Paper
                    zIndex = {2}
                    circle = {true}
                    style={{
                        display: 'inline-block',
                        margin: 5
                    }}
                >
                    <IconButton
                        iconClassName = "material-icons"
                        iconStyle = {{
                            color: greenA700
                        }}
                        tooltip = "Call"
                        tooltipPosition = "bottom-center"
                        onClick = {this.props.call}
                    >
                        call
                    </IconButton>
                </Paper>
                <Paper
                    zIndex = {2}
                    circle = {true}
                    style={{
                        display: 'inline-block',
                        margin: 5
                    }}
                >
                    <IconButton
                        iconClassName = "material-icons"
                        iconStyle = {{
                            color: red500
                        }}
                        tooltip = "End call"
                        tooltipPosition = "bottom-center"
                    >
                        call_end
                    </IconButton>
                </Paper>
                <IconButton
                    iconClassName = "material-icons"
                    onClick = {this.props.changeMuteNotification}
                    tooltip= {this.props.isMute
                        ? "Unmute"
                        : "Mute"
                    }
                    tooltipPosition="bottom-center"
                >
                    {this.props.isMute
                        ? 'volume_off'
                        : 'volume_up'
                    }
                </IconButton>
                <Paper
                    zIndex = {2}
                    circle = {true}
                    style={{
                        float: 'right',
                        display: 'inline-block',
                        margin: 5
                    }}
                >
                    <IconButton
                        iconClassName = "material-icons"
                        tooltip = "Add to conference"
                        tooltipPosition = "bottom-center"
                    >
                        group_add
                    </IconButton>
                </Paper>
            </Paper>
        );
    }
}