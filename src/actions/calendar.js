export const OPEN_CLOSE_CALENDAR = "OPEN_CLOSE_CALENDAR";

export function openOrCloseCalendar() {
    return {
        type: OPEN_CLOSE_CALENDAR
    }
}

export function loadEvents(userID) {
    return dispatch => fetch(`/users/${userID}/events`)
        .then(response => response.json())
        .then(events => dispatch(loadEventsSuccess(events)))
        .catch(error => console.log(error));
}

export const LOAD_EVENTS_SUCCESS = "LOAD_EVENTS_SUCCESS";

export function loadEventsSuccess(events) {
    return {
        type: LOAD_EVENTS_SUCCESS,
        events
    }
}

export const ADD_EVENT_SUCCESS = "ADD_EVENT_SUCCESS";

export function addEvent(userID, event) {
    return dispatch => fetch(`/users/${userID}/events`, {
            method: 'post',
            body: JSON.stringify(event),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
        .then(response => response.json())
        .then(event => dispatch(addEventSuccess(event)))
        .catch(error => console.log(error));
}

export function addEventSuccess(event) {
    return {
        type: ADD_EVENT_SUCCESS,
        event
    }
}