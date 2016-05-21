import {
    RECEIVE_CHAT_MESSAGE
} from '../actions/chat'

const initialState = {
    id: "571768b7201b86900c268e92",
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
        }
    ]
};

export default function (state = initialState, action) {
    switch (action.type) {
        case RECEIVE_CHAT_MESSAGE:
            let messages = state.messages.slice();
            messages.push({
                text: action.message.text,
                authorID: action.message.authorID,
                date: action.message.date
            });

            return {
                ...state,
                messages
            };
        default:
            return state;
    }
}