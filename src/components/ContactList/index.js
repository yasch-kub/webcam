import React, { PropTypes } from "react";

import {
    List,
    TextField,
    FontIcon
} from 'material-ui'

export default class ContactList extends React.Component {

    static propTypes = {
        contacts: PropTypes.object.isRequired,
        search: PropTypes.func.isRequired
    }

    render() {

        this.sortSelected().map((i, index, array) => {
            let contact = this.props.contacts[i],
                nextContact = this.props.contacts[array[index + 1]];
        });

        return (
            <div>
                <List>
                    <TextField
                        onChange={e => this.props.search(e.target.value)}
                        style={{
                            left: 23,
                            width: "85%"
                        }}
                        floatingLabelText={<FontIcon className="material-icons">search</FontIcon>}
                    />

                </List>
                <List>

                </List>
            </div>
        );
    }
}