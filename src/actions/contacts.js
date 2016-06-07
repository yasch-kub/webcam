import api from '../api'

export const LOAD_CONTACTS_SUCCESS = "LOAD_CONTACTS_SUCCESS";

export function loadContacts(userID) {
    return dispatch => fetch(`${api}/users/${userID}/contacts`)
        .then(response => response.json())
        .then(contacts => dispatch(loadContactsSuccess(contacts)))
        .catch(error => console.log(error));

}

export function loadContactsSuccess(contacts) {
    return {
        type: LOAD_CONTACTS_SUCCESS,
        contacts
    }
}

export const LOAD_SEARCH_CONTACTS_SUCCESS = "LOAD_SEARCH_CONTACTS_SUCCESS";
export const LOAD_SEARCH_CONTACTS_FAIL = "LOAD_SEARCH_CONTACTS_FAIL";

export function loadSearchContactsSuccess(contacts) {
    console.log('contacts',contacts);
    return {
        type: LOAD_SEARCH_CONTACTS_SUCCESS,
        contacts
    }
}

export function loadSearchContactsFail(error) {
    return {
        type: LOAD_SEARCH_CONTACTS_FAIL
    }
}

export function loadSearchContacts(searchString) {
    return dispatch => {
        searchString = searchString.trim();
        searchString.length != 0
            ? fetch(`${api}/users?search=${searchString}`)
                    .then(response => response.json())
                    .then(contacts => dispatch(loadSearchContactsSuccess(contacts)))
                    .catch(error => dispatch(loadSearchContactsFail(error)))
            : dispatch(loadSearchContactsSuccess([]));
        dispatch(changeSearchString(searchString));
    }
}

export const ADD_CONTACT_SUCCESS = "ADD_CONTACT_SUCCESS";
export const ADD_CONTACT_WITH_REQUEST_SUCCESS = "ADD_CONTACT_WITH_REQUEST_SUCCESS";

export function addContact(userId, contactId) {
    return dispatch =>
        fetch(`${api}/users/${userId}/contacts`, {
            method: 'post',
            body: JSON.stringify({
                id: contactId
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(response => response.json())
            .then(contacts => dispatch(addContactSuccess(contacts)))
            .catch(error => console.log(error))
}

export function addContactSuccess(contacts) {
    return {
        type: ADD_CONTACT_SUCCESS,
        contacts
    }
}

export function addContactWithRequestSuccess(contacts) {
    return {
        type: ADD_CONTACT_WITH_REQUEST_SUCCESS,
        contacts
    }
}

export const CHANGE_SEARCH_STRING = "CHANGE_SEARCH_STRING";

export function changeSearchString(searchString) {
    return {
        type: CHANGE_SEARCH_STRING,
        searchString
    }
}

export const CONNECT_CHAT_TO_CONTACT = "CONNECT_CHAT_TO_CONTACT";

export function connectChatToContact(chatID, contactID) {
    return {
        type: CONNECT_CHAT_TO_CONTACT,
        contactID,
        chatID
    }
}