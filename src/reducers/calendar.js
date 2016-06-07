import {
    OPEN_CLOSE_CALENDAR,
    LOAD_EVENTS_SUCCESS,
    ADD_EVENT_SUCCESS
} from '../actions/calendar';

const initialState = {
    isOpen: false,
    events: []
};

export default function(state = initialState, action) {
    switch (action.type) {
        case OPEN_CLOSE_CALENDAR:
            return {
                ...state,
                isOpen: !state.isOpen
            };

        case LOAD_EVENTS_SUCCESS:
            return {
                ...state,
                events: action.events
            };

        case ADD_EVENT_SUCCESS:
            let events = state.events.slice();
            events.push(action.event);
            return {
                ...state,
                events
            };

        default:
            return state;
    }
}

