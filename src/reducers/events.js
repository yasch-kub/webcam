import {
    ADD_CONTACT_REQUEST,
    ADD_CONTACT_REJECT
} from '../actions/events';

const initialState = {
    addContact: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case ADD_CONTACT_REQUEST:
            return {
                ...state,
                addContact: action.user
            };

        case ADD_CONTACT_REJECT:
            return {
                ...state,
                addContact: null
            };

        default: return state;
    }
}