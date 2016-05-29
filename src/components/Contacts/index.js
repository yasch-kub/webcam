import React, { PropTypes } from 'react'

import List from 'material-ui'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Search from '../Search'
import ContactList from '../ContactList'

import {
    loadSearchContacts,
    addContact
} from '../../actions/contacts'

import {
    openChat
} from '../../actions/chat'

@connect(
    state => ({
        otherContacts: state.contacts.other,
        contacts: state.contacts.contacts,
        userId: state.user.id,
        searchString: state.contacts.searchString,
        socket: state.socket
    }),
    dispatch => ({
        searchContacts: bindActionCreators(loadSearchContacts, dispatch),
        addContact: bindActionCreators(addContact, dispatch),
        openChat: bindActionCreators(openChat, dispatch)
    })
)
export default class Contacts extends React.Component {

    static childContextTypes = {
        socket: PropTypes.object,
        userID: PropTypes.string
    };

    getChildContext() {
        return {
            socket: this.props.socket,
            userID: this.props.userId
        }
    }

    render() {
        console.log(this.props.contacts);
        return(
            <div>
                <Search search = {this.props.searchContacts}/>
                <ContactList
                    contacts = {this.props.contacts}
                    otherContacts = {this.props.otherContacts}
                    searchString = {this.props.searchString}
                    openChat = {this.props.openChat}
                />
            </div>
        );
    }
}