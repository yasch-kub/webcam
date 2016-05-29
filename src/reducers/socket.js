import {
    CONNECTION
} from '../actions/socket';

const initialState = null;

export default function(state = initialState, action) {
    switch (action.type) {
        case CONNECTION:
            return action.socket;
        default: return state;
    }
}