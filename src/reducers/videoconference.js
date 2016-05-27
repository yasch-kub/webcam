import {
    CHANGE_MUTE_NOTIFICATION
} from '../actions/videoconference'

const initialState = {
    isMute: false
};

export default function(state = initialState, action) {
    switch (action.type) {
        case CHANGE_MUTE_NOTIFICATION:
            let { isMute } = state;
            return {
                ...state,
                isMute: !isMute
            }
        default:
            return state
    }
}