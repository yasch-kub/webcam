import React, { PropTypes } from 'react'

import {
    FontIcon,
    Menu,
    MenuItem
} from 'material-ui'

import {
    Popover,
    PopoverAnimationVertical
} from 'material-ui/Popover'

export default class ContactMenu extends React.Component {
    handleTouchTap() {
        this.props.handleRequestClose();
        this.props.addContact();
    }

    render() {
        return (
            <Popover
                anchorEl = {this.props.anchorEl}
                open = {this.props.open}
                anchorOrigin = {{"horizontal":"right","vertical":"top"}}
                onRequestClose={this.props.handleRequestClose}
                animation={PopoverAnimationVertical}
            >
                <Menu>
                    <MenuItem
                        primaryText = "Add to friends"
                        rightIcon = {<FontIcon className="material-icons">person_add</FontIcon>}
                        onTouchTap = {::this.handleTouchTap}
                    />
                </Menu>
            </Popover>
        );
    }
}