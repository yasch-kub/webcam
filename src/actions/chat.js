import {
    connectChatToContact
} from './contacts'

import api from '../api'

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
    return dispatch => fetch(`${api}/chats/${chatID}/messages`)
        .then(response => response.json())
        .then(response => dispatch(loadChatMessagesSuccess(response)))
        .catch(error => console.log(error))
}

export function loadChatMessagesSuccess(messages) {
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

export const OPEN_CHAT = "OPEN_CHAT";

export function openChat(chatID, contactID) {
    return {
        type: OPEN_CHAT,
        chatID,
        contactID
    }
}

export function loadUserChats(userID) {
    return dispatch => fetch(`${api}/users/${userID}/chats`)
        .then(response => response.json())
        .then(chat => dispatch(loadChatsSuccess))
}


export function createChat(userID, contactID) {
    return dispatch => fetch(`${api}/chats?users[]=${userID}&users[]=${contactID}`, {
        method: 'post',
        body: JSON.stringify({
            users: [userID, contactID]
        }),
        headers: new Headers({
            "Content-Type": "application/json"
        })
    })
        .then(response => response.json())
        .then(response => {
            dispatch(createChatSuccess(response));
            dispatch(connectChatToContact(response.id, contactID))
        })
        .catch(error => console.log(error));
}

export const CREATE_CHAT_SUCCESS = "CREATE_CHAT_SUCCESS";

function createChatSuccess(chat) {
    return {
        type: CREATE_CHAT_SUCCESS,
        chat
    }
}