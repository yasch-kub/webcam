import React, { PropTypes } from "react";

import {
    Divider,
    List,
    TextField,
    FontIcon,
    Subheader
} from 'material-ui'

import Contact from '../Contact'

export default class ContactList extends React.Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired,
        otherContacts: PropTypes.array.isRequired,
        searchString: PropTypes.string.isRequired
    };

    render() {
        let search = this.props.searchString.toLowerCase().split(' ');
        let contacts = this.props.contacts
            .sort((a, b) => a.fullname.localeCompare(b.fullname))
            .map(
                (contact, i) => <Contact
                    key = {i}
                    fullname = {contact.fullname}
                    avatar = {contact.avatar}
                    id = {contact.id}
                    chatID = {contact.chatID}
                    onClick = {this.props.openChat}
                />
            );

        let otherContacts = this.props.otherContacts
            .sort((a, b) => a.fullname.localeCompare(b.fullname))
            .map(
                (contact, i) => <Contact
                    key = {i}
                    fullname = {contact.fullname}
                    avatar = {contact.avatar}
                    addContact = {this.props.addContact}
                    id = {contact.id}
                />
            );
        
        return(
            <div>
                <List>
                    {contacts}
                </List>
                {
                    otherContacts.length != 0 &&
                    <List>
                        <Subheader> All </Subheader>
                        {otherContacts}
                    </List>
                }
            </div>
        );
    }
}