import React, { PropTypes } from 'react'

import {
    ListItem,
    Avatar
} from 'material-ui'

import {pinkA200, transparent} from 'material-ui/styles/colors'

import ContactMenu from '../ContactMenu'

export default class Contact extends React.Component {

    state = {
        isMenuOpen: false
    };

    static propTypes = {
        fullname: PropTypes.string.isRequired,
        avatar: PropTypes.string.isRequired,
        letter: PropTypes.boolean
    };

    static defaultProps = {
        letter: false
    };

    letterStyle = {
        left: 8
    };

    handleRequestClose() {
        this.setState({
            isMenuOpen: false
        })
    }

    addContact() {
        this.props.addContact(this.props.id)
    }

    letter =
        <Avatar
            color = {pinkA200}
            backgroundColor = {transparent}
            style = {this.letterStyle}
        >
            {this.props.fullname[0].toUpperCase()}
        </Avatar>;

    avatar = <Avatar src={this.props.avatar} />;
    
    handleTouchTap(event) {
        this.props.onClick && this.props.onClick(this.props.chatID);
        this.setState({
            isMenuOpen: true,
            anchorEl: event.currentTarget
        });
    }

    render() {
        return (
            <div>
                <ListItem
                    primaryText={this.props.fullname}
                    rightAvatar={this.avatar}
                    insetChildren={!this.props.letter}
                    leftAvatar={
                        this.props.letter && this.letter
                    }
                    onTouchTap={::this.handleTouchTap}
                />
                <ContactMenu
                    open = {this.state.isMenuOpen}
                    anchorEl = {this.state.anchorEl}
                    handleRequestClose = {::this.handleRequestClose}
                    addContact = {::this.addContact}
                />
            </div>
        );
    }
}