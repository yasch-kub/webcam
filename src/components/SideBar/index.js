import React, { PropTypes } from 'react';

import {
    Drawer,
    Tab, Tabs,
    FontIcon
} from 'material-ui';

import UserProfile from '../UserProfile';
import Contacts from '../Contacts';
import RecentCalls from '../RecentCalls';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { changeTab } from '../../actions/sidebar'

@connect(
    state => ({
        tabIndex: state.sidebar.tabIndex,
        user: state.user
    }),
    dispatch => ({
        changeTab: bindActionCreators(changeTab, dispatch)
    })
)
export default class SideBar extends React.Component {
    render() {
        return (
            <div>
                <Drawer width = "350px" open = {false} >
                    <UserProfile
                        avatar = {this.props.user.avatar}
                        firstname = {this.props.user.firstname}
                        lastname = {this.props.user.lastname}
                    />
                    <Tabs
                        value = {this.props.tabIndex}
                    >
                        <Tab
                            icon = {<FontIcon className="material-icons">people</FontIcon>}
                            label = "CONTACTS"
                            value = {0}
                        >
                            
                            <Contacts />
                        </Tab>
                        <Tab
                            icon = {<FontIcon className="material-icons">phone</FontIcon>}
                            label = "RECENTS"
                            value = {1}
                        >
                            <RecentCalls />
                        </Tab>
                    </Tabs>
                </Drawer>
            </div>
        );
    }
}