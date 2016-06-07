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

export const INCOMING_CALL_REQUEST = "INCOMING_CALL_REQUEST";
export const INCOMING_CALL_CONFIRM = "INCOMING_CALL_CONFIRM";
export const INCOMING_CALL_REJECT = "INCOMING_CALL_REJECT";

export function incomingCallRequest(options) {
    console.log(options)
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

}