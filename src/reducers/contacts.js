import {
    LOAD_CONTACTS_SUCCESS,
    LOAD_SEARCH_CONTACTS_SUCCESS
} from '../actions/contacts';

const initialState = {
    contacts: []
};

export default function (state = initialState, action) {
    switch(action.type) {
        case LOAD_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: []
            };
        case LOAD_SEARCH_CONTACTS_SUCCESS:
            return {
                ...state,
                contacts: action.contacts
            };
        default:
            return state;
    }
}
