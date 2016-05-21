import { normalize, Schema, arrayOf } from 'normalizr'

export const SEARCH_CONTACT = 'SEARCH_CONTACT';
export const LOAD_CONTACTS_SUCCESS = 'LOAD_CONTACTS_SUCCESS';
export const LOAD_CONTACTS_FAILURE = 'LOAD_CONTACT_FAILURE';

export function searchContact(searchString) {
    return {
        type: SEARCH_CONTACT,
        searchString
    }
}

export function loadContacts(userID) {
    return dispatch => fetch(`/users/${userID}/contacts`)
        .then(response => response.json())
        .then(response => {
            console.log(response);

            const user = new Schema('user');
            user.define({
                   
            });

            normalize(response );

            dispatch(loadContactsSuccess(response))
        })
        .catch(error => dispatch(loadContactsFailure(error)))
}

export function loadContactsSuccess(contacts) {
    return {
        type: LOAD_CONTACTS_SUCCESS,
        contacts
    }
}
export function loadContactsFailure(error) {
    return {
        type: LOAD_CONTACTS_FAILURE,
        error
    }
}

const LOAD_USERS_SUCCESS = "LOAD_USERS_SUCCESS";
const LOAD_USERS_FAILURE = "LOAD_USERS_FAILURE";

export function loadUsers() {
    return dispatch => fetch(`/users`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            dispatch(loadUsersSuccess(response))
        })
        .catch(error => dispatch(loadUsersFailure(error)))
}

export function loadUsersSuccess(users) {
    return {
        type: LOAD_CONTACTS_SUCCESS,
        users
    }

}

export function loadUsersFailure(error) {
    return {
        type: LOAD_CONTACTS_FAILURE,
        error
    }
}