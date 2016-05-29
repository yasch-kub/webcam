export const ADD_CONTACT_REQUEST = "ADD_CONTACT_REQUEST";

import { addContactWithRequestSuccess } from './contacts'

export function addContactRequest(user) {
    return dispatch => {
        dispatch(addContactWithRequestSuccess([user]));
        dispatch(addContact(user.id))
    }
}

function addContact(user) {
    return {
        type: ADD_CONTACT_REQUEST,
        userID: user
    }
}

export const ADD_CONTACT_REJECT = "ADD_CONTACT_REJECT";

export function addContactReject() {
    return {
        type: ADD_CONTACT_REJECT
    }
}

    