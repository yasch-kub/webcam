import {
    LOAD_CONTACTS_SUCCESS,
    LOAD_SEARCH_CONTACTS_SUCCESS,
    ADD_CONTACT_SUCCESS,
    ADD_CONTACT_WITH_REQUEST_SUCCESS,
    CHANGE_SEARCH_STRING,
    CONNECT_CHAT_TO_CONTACT
} from '../actions/contacts';

const initialState = {
    contacts: [],
    other: [],
    searchString: ''
};

export default function (state = initialState, action) {
    switch(action.type) {

        case LOAD_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.contacts
            };

        case LOAD_SEARCH_CONTACTS_SUCCESS:
            if (state.searchString)
                return {
                    ...state,
                    other: action.contacts
                };
            else
                return state;

        case CHANGE_SEARCH_STRING:
            return {
                ...state,
                searchString: action.searchString

            };

        case ADD_CONTACT_WITH_REQUEST_SUCCESS:
        {
            let contacts = state.contacts.slice();

            contacts = contacts.concat(action.contacts);

            return {
                ...state,
                contacts
            };
        }

        case ADD_CONTACT_SUCCESS:
        {
            let contacts = state.contacts.slice();

            contacts = contacts.concat(action.contacts);

            return {
                ...state,
                contacts
            };
        }

        case CONNECT_CHAT_TO_CONTACT: {
            let contacts = state.contacts.slice();
            let contact = contacts.find(contact => contact.id == action.contactID);
            contact.chat = action.chatID;
            console.log(contact, contacts);

            return {
                ...state,
                contacts
            }
        }

        default:
            return state;
    }
}
