import {
    LOAD_CONTACTS_SUCCESS,
    LOAD_SEARCH_CONTACTS_SUCCESS,
    ADD_CONTACT_SUCCESS,
    CHANGE_SEARCH_STRING
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

        case ADD_CONTACT_SUCCESS:
            return {
                ...state,
                contacts: action.contacts
            };
        default:
            return state;
    }
}
