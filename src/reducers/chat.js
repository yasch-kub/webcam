import {
    RECEIVE_CHAT_MESSAGE,
    LOAD_CHAT_MESSAGES_SUCCESS,
    OPEN_CHAT,
    CREATE_CHAT_SUCCESS
} from '../actions/chat'

const initialState = {
    id: "57481ab2ec1485f013d07248",
    messages: [],
    users: [
        {
            id: '5717634673f759b8155a75d6',
            firstname: 'Sergiy',
            lastname: 'Yaschuk',
            avatar: 'dist/images/Avatar3.png'
        },
        {
            id: '5717635b73f759b8155a75d7',
            firstname: 'Sergiy',
            lastname: 'Krasnikov',
            avatar: 'dist/images/Avatar2.png'
        },
        {
            id: '57175febb88c099c0a86bef0',
            firstname: 'Denis',
            lastname: 'Kublitskiy',
            avatar: 'dist/images/Avatar1.png'
        }
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CHAT_MESSAGE:
            let messages = state.messages.slice();
            messages.push({
                text: action.message.text,
                author: action.message.authorID,
                date: action.message.date
            });

            return {
                ...state,
                messages
            };

        case LOAD_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                messages: action.messages
            };

        case OPEN_CHAT:
            return {
                ...state,
                id: action.chatID,
                contactID: action.contactID
            };

        case CREATE_CHAT_SUCCESS:
            return {
                ...state,
                ...action.chat
            };

        default:
            return state;
    }
}