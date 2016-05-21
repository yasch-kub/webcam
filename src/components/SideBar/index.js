import React, { PropTypes } from 'react';

import {
    Drawer,
    Tab, Tabs,
    FontIcon
} from 'material-ui';

import UserProfile from '../UserProfile';
import ContactList from '../ContactList';
import RecentCalls from '../RecentCalls';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { changeTab } from '../../actions/sidebar'
import { searchContact, loadContacts, loadUsers } from '../../actions/contacts'

@connect(
    state => ({
        tabIndex: state.sidebar.tabIndex,
        contacts: state.contacts,
        user: state.user
    }),
    dispatch => ({
        changeTab: bindActionCreators(changeTab, dispatch),
        searchContact: bindActionCreators(searchContact, dispatch),
        loadContacts: bindActionCreators(loadContacts, dispatch),
        loadUsers: bindActionCreators(loadUsers, dispatch)
    })
)
export default class SideBar extends React.Component {

    componentWillMount() {
        this.props.loadUsers();
        this.props.loadContacts(this.props.user.id);
    }

    render() {
        return (
            <div>
                <Drawer width = "350px" open = {false} >
                    {/*<UserProfile
                        avatar = {this.props.user.avatar}
                        firstname = {this.props.user.firstname}
                        lastname = {this.props.user.lastname}
                    />*/}
                    <Tabs
                        onChange = {e => console.log('sdfsdfsdf')}
                        value = {this.props.tabIndex}
                    >
                        <Tab
                            icon = {<FontIcon className="material-icons">people</FontIcon>}
                            label = "CONTACTS"
                            value = {0}
                        >
                            <ContactList
                                contacts = {this.props.contacts}
                                search = {this.props.searchContact}
                            />
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