import React, { PropTypes } from 'react'

import List from 'material-ui'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Search from '../Search'
import ContactList from '../ContactList'

import { loadSearchContacts } from '../../actions/contacts'

@connect(
    state => ({
        contacts: state.contacts.contacts
    }),
    dispatch => ({
        searchContacts: bindActionCreators(loadSearchContacts, dispatch)
    })
)
export default class Contacts extends React.Component {
    render() {
        return(
            <div>
                <Search search = {this.props.searchContacts}/>
                <ContactList contacts = {this.props.contacts}/>
            </div>
        );
    }
}