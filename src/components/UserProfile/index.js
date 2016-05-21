import React, { PropTypes } from 'react'

import {
    Avatar,
    Paper
} from 'material-ui'

export default class UserProfile extends React.Component {

    static defaultProps = {
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        avatar: PropTypes.string
    };

    style = {
        height: 400,
        width: 400,
        padding: 15
    };

    render() {
        return (
            <div
                style = {this.style}
            >
                <Paper
                    zDepth = {2}
                    circle = {true}
                >
                    <Avatar
                        src = {this.props.avatar}
                        size = {100}
                    />
                </Paper>
            </div>
        );
    }
}