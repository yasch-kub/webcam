import {
    CHANGE_MUTE_NOTIFICATION,
    CREATE_TRANSLATION,
    CREATE_PEER_SUCCESS,
    GET_VIDEO_STREAM,
    INCOMING_CALL_REQUEST,
    INCOMING_CALL_CONFIRM
} from '../actions/videoconference'

const initialState = {
    isMute: false,
    isCalling: false
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

        case INCOMING_CALL_REQUEST:
            return {
                ...state,
                caller: action.caller,
                isCalling: true
            };

        case INCOMING_CALL_CONFIRM:
            return {
                ...state,
                isCalling: false
            };

        default:
            return state
    }
}