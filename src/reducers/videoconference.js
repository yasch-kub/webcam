import {
    CHANGE_MUTE_NOTIFICATION,
    CREATE_TRANSLATION,
    CREATE_PEER_SUCCESS,
    GET_VIDEO_STREAM,
    INCOMING_CALL_REQUEST,
    INCOMING_CALL_CONFIRM,
    INCOMING_CALL_REJECT,
    SAVE_CALL,
    END_CALL,
    SHOW_CALL_REJECTED,
    HIDE_CALL_REJECTED
} from '../actions/videoconference'

const initialState = {
    isMute: false,
    isCalling: false,
    enabled: true,
    isCallRejectedMessage: false
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
                interlocutorStream: action.stream,
                enabled: true
            }
        }

        case SAVE_CALL:
            return {
                ...state,
                call: action.call
            };

        case END_CALL:
            return {
                ...state,
                call: null,
                enabled: false
            };

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

        case INCOMING_CALL_REJECT:
            return {
                ...state,
                isCalling: false
            };

        case SHOW_CALL_REJECTED:
            return {
                ...state,
                isCallRejectedMessage: true
            };

        case HIDE_CALL_REJECTED:
            return {
                ...state,
                isCallRejectedMessage: false
            };

        default:
            return state
    }
}