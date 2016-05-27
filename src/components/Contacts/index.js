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
        searchString: state.contacts.searchString
    }),
    dispatch => ({
        searchContacts: bindActionCreators(loadSearchContacts, dispatch),
        addContact: bindActionCreators(addContact, dispatch),
        openChat: bindActionCreators(openChat, dispatch)
    })
)
export default class Contacts extends React.Component {
    addContact(contactId) {
        this.props.addContact(this.props.userId, contactId)
    }

    render() {
        console.log(this.props.contacts);
        return(
            <div>
                <Search search = {this.props.searchContacts}/>
                <ContactList
                    contacts = {this.props.contacts}
                    otherContacts = {this.props.otherContacts}
                    addContact = {::this.addContact}
                    searchString = {this.props.searchString}
                    openChat = {this.props.openChat}
                />
            </div>
        );
    }
}