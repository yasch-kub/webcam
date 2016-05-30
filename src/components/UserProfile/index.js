import React, { PropTypes } from 'react'

import {
    Avatar,
    Paper
} from 'material-ui'

export default class UserProfile extends React.Component {

    static defaultProps = {
        firstname: PropTypes.string.isRequired,
        lastname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired
    };

    style = {
        height: 250,
        width: '100%',
        boxSizing: 'inherit',
        textAlign: 'center',
        padding: 15
    };

    render() {
        return (
            <div
                style = {this.style}
            >
               <Avatar
                        src = {this.props.avatar}
                        size = {150}
                />
                <h2>
                    {`${this.props.firstname} ${this.props.lastname}`}
                </h2>
            </div>
        );
    }
}