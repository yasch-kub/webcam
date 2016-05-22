import React, { PropTypes } from 'react'

import {
    List,
    ListItem,
    Avatar
} from 'material-ui'

import {pinkA200, transparent} from 'material-ui/styles/colors';

export default class Contact extends React.Component {

    propTypes = {
        fullname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        letter: PropTypes.boolean
    };

    defaultProps = {
        letter: false
    };

    letterStyle = {
        left: 8
    };

    letter =
        <Avatar
            color = {pinkA200}
            backgroundColor = {transparent}
            style = {this.letterStyle}
        >
            {this.props.fullname[0].toUpperCase()}
        </Avatar>

    avatar = <Avatar src={this.props.avatar} />

    render() {
        console.log(this.props.avatar);
        return (
            <List>
                <ListItem
                    primaryText={this.props.fullname}
                    rightAvatar={this.avatar}
                    insetChildren={!this.props.letter}
                    leftAvatar={
                        this.props.letter && this.letter
                    }
                />
            </List>
        );
    }
}