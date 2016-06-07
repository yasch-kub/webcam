import React, { PropTypes } from 'React';

import {
    IconButton,
    Paper
} from 'material-ui'

export default class UserPanel extends React.Component {
    static propTypes = {
        isCalendarOpen: PropTypes.bool,
        calendarClickHandle: PropTypes.func
    };

    static defaultProps = {
        calendarClickHandle: () => {}
    };

    panelStyle = {
        textAlign: 'center'
    };

    buttonStyle = {
        margin: 5,
        display: 'inline-block'
    };

    render() {
        return (
            <div style = {this.panelStyle}>
                <Paper style = {this.buttonStyle}>
                    <IconButton
                        onClick = {this.props.calendarClickHandle}
                        iconClassName = "material-icons"
                        tooltip= {this.props.isCalendarOpen
                            ? "Close calendar"
                            : "Open calendar"
                        }
                        tooltipPosition="top-center"
                    >
                        event_note
                    </IconButton>
                </Paper>
            </div>
        );
    }
}