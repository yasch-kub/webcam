const API_KEY = '46r0b1gl6gwx9a4i';

export const CHANGE_MUTE_NOTIFICATION = 'CHANGE_MUTE_NOTIFICATION';

export function changeMuteNotification() {
    return {
        type: CHANGE_MUTE_NOTIFICATION
    }
}

export const CREATE_TRANSLATION = "CREATE_TRANSLATION";

export function createTranslation(stream) {
    return {
        type: CREATE_TRANSLATION,
        src: URL.createObjectURL(stream),
        stream
    }
}

export const CREATE_PEER_SUCCESS = "CREATE_PEER_SUCCESS";

export function createPeer(id) {
    return dispatch => {
        let peer = new Peer(id, {
            key: API_KEY
        });
        dispatch(createPeerSuccess(peer))
    }
}

export function createPeerSuccess(peer)
{
    return {
        type: CREATE_PEER_SUCCESS,
        peer
    }
}

export const GET_VIDEO_STREAM = "GET_VIDEO_STREAM";

export function getStream(stream) {
    return {
        type: GET_VIDEO_STREAM,
        src: URL.createObjectURL(stream),
        stream
    }
}

export const SAVE_CALL = "SAVE_CALL";

export function saveCall(call) {
    return {
        type: SAVE_CALL,
        call
    }
}

export const END_CALL = "END_CALL";

export function endCall() {
    return {
        type: END_CALL
    }
}

export function callRejected() {
    return dispatch => {
        dispatch(showCallRejected());
        setTimeout(() => {
            dispatch(hideCallRejected());
        }, 5000)
    }
}

export const SHOW_CALL_REJECTED = "SHOW_CALL_REJECTED";
export const HIDE_CALL_REJECTED = "HIDE_CALL_REJECTED";

export function showCallRejected() {
    return {
        type: SHOW_CALL_REJECTED
    };
}

export function hideCallRejected() {
    return {
        type: HIDE_CALL_REJECTED
    };
}


export const INCOMING_CALL_REQUEST = "INCOMING_CALL_REQUEST";
export const INCOMING_CALL_CONFIRM = "INCOMING_CALL_CONFIRM";
export const INCOMING_CALL_REJECT = "INCOMING_CALL_REJECT";

export function incomingCallRequest(options) {
    return {
        type: INCOMING_CALL_REQUEST,
        caller: options
    }
}

export function incomingCallConfirm() {
    return {
        type: INCOMING_CALL_CONFIRM
    }
}

export function incomingCallReject() {
    return {
        type: INCOMING_CALL_REJECT
    };
}