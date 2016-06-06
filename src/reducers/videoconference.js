import {
    CHANGE_MUTE_NOTIFICATION,
    CREATE_TRANSLATION,
    CREATE_PEER_SUCCESS,
    GET_VIDEO_STREAM
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
            };

        case CREATE_TRANSLATION:
            return {
                ...state,
                src: action.src,
                stream: action.stream
            };

        case CREATE_PEER_SUCCESS:
            return {
                ...state,
                peer: action.peer
            };

        case GET_VIDEO_STREAM: {
            return {
                ...state,
                interlocutorStreamSrc: action.src,
                interlocutorStream: action.stream
            }
        }

        default:
            return state
    }
}