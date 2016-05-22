import React, { PropTypes } from "react";

import {
    List,
    TextField,
    FontIcon
} from 'material-ui'

import Contact from '../COntact'

export default class ContactList extends React.Component {

    static propTypes = {
        contacts: PropTypes.array.isRequired
    };

    render() {
        
        let contacts = this.props.contacts.map(
            (contact, i) => <Contact
                key = {i}
                fullname = {contact.fullname}
                avatar = {contact.avatar}
            />
        );
        
        return(
            <div>
                {contacts}
            </div>
        );
    }
}