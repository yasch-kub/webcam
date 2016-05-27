export const SEND_MESSAGE_SUCCESS = 'SEND_MESSAGE_SUCCESS';

export function sendMessage(text, chatID, authorID) {
    return dispatch => {
        socket.emit('save chat message', {
            text,
            chatID,
            authorID
        });
        dispatch(sendMessageSuccess(text));
    }
}

export function sendMessageSuccess(message) {
    return {
        type: SEND_MESSAGE_SUCCESS,
        message
    }
}

export const LOAD_CHAT_MESSAGES_SUCCESS = "LOAD_CHAT_MESSAGES_SUCCESS";

export function loadChatMessages(chatID) {
    return dispatch => fetch(`/chats/${chatID}/messages`)
        .then(response => response.json())
        .then(response => dispatch(loadChatMessagesSuccess(response)))
        .catch(error => console.log(error))
}

export function loadChatMessagesSuccess(messages) {
    console.log('messages', messages)
    return {
        type: LOAD_CHAT_MESSAGES_SUCCESS,
        messages
    }
}

export const RECEIVE_CHAT_MESSAGE = 'RECEIVE_CHAT_MESSAGE';

export function receiveMessage(message) {
    return {
        type: RECEIVE_CHAT_MESSAGE,
        message
    }
}

export const OPEN_CHAT = "OPEN_CHAT"

export function openChat(chatID) {
    console.log(chatID);
    return {
        type: OPEN_CHAT,
        chatID
    }
}