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
    openChat,
    loadChatMessages,
    createChat
} from '../../actions/chat'

@connect(
    state => ({
        otherContacts: state.contacts.other,
        contacts: state.contacts.contacts,
        userId: state.user.id,
        searchString: state.contacts.searchString,
        socket: state.socket,
        chatID: state.chat.id
    }),
    dispatch => ({
        loadChatMessages: bindActionCreators(loadChatMessages, dispatch),
        searchContacts: bindActionCreators(loadSearchContacts, dispatch),
        addContact: bindActionCreators(addContact, dispatch),
        openChat: bindActionCreators(openChat, dispatch),
        createChat: bindActionCreators(createChat, dispatch)
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

    openChat(chatID, contactID) {
        if (chatID) {
            console.log('sdfsdf')
            this.props.loadChatMessages(chatID);
            this.props.openChat(chatID);
            this.props.socket.emit('disconnect from chat', {
                chatID: this.props.chatID
            });
            this.props.socket.emit('connect to chat', {
                chatID
            })
        } else {
            this.props.createChat(this.props.userId, contactID)
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
                    openChat = {::this.openChat}
                />
            </div>
        );
    }
}