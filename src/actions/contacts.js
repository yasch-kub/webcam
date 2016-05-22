export const LOAD_CONTACTS_SUCCESS = "LOAD_CONTACTS_SUCCESS";

export function loadContactsSuccess(contacts) {
    return {
        type: LOAD_CONTACTS_SUCCESS,
        contacts
    }
}

export const LOAD_SEARCH_CONTACTS_SUCCESS = "LOAD_SEARCH_CONTACTS_SUCCESS";
export const LOAD_SEARCH_CONTACTS_FAIL = "LOAD_SEARCH_CONTACTS_FAIL";

export function loadSearchContactsSuccess(contacts) {
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

    return searchString.trim().length != 0
        ? dispatch =>
            fetch(`/users?search=${searchString}`)
                .then(response => response.json())
                .then(contacts => dispatch(loadSearchContactsSuccess(contacts)))
                .catch(error => dispatch(loadSearchContactsFail(error)))
        : dispatch =>
        fetch(`/users`)
            .then(response => response.json())
            .then(contacts => dispatch(loadContactsSuccess(contacts)))
            .catch(error => console.log(error))
}