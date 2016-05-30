import React, { PropTypes } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    loadChatMessages,
    sendMessage,
    receiveMessage
} from '../../actions/chat'

import { Paper } from 'material-ui'

import ChatMessageForm from '../ChatMessageForm'
import ChatMessagesList from '../ChatMessagesList'

@connect(
    state => ({
        messages: state.chat.messages,
        chatID: state.chat.id,
        user: {
            id: state.user.id,
            firstname: state.user.firstname,
            lastname: state.user.lastname,
            avatar: state.user.avatar
        },
        users: state.chat.users,
        socket: state.socket
    }),
    dispatch => ({
        sendMessage: bindActionCreators(sendMessage, dispatch),
        loadMessages: bindActionCreators(loadChatMessages, dispatch),
        receiveMessage: bindActionCreators(receiveMessage, dispatch)
    })
)
export default class ChatRoom extends React.Component {

    static propTypes = {
        chatID: PropTypes.string.isRequired,

        user: PropTypes.shape({
            id: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            avatar: PropTypes.string
        }).isRequired,

        users: PropTypes.arrayOf(PropTypes.shape({
            id: PropTypes.string,
            firstname: PropTypes.string,
            lastname: PropTypes.string,
            avatar: PropTypes.string
        })).isRequired,

        messages: PropTypes.arrayOf(PropTypes.shape({
            author: PropTypes.string,
            text: PropTypes.string
        })).isRequired
    };

    style = {
        padding: 15,
        display: 'inline-block',
        marginLeft: 355,
        marginTop: 15,
        backgroundColor: 'rgba(255, 255, 255, 1)'
    };

    handleSendMessage(text) {
        this.props.socket.emit('chat message send', {
            text,
            chatID: this.props.chatID,
            authorID: this.props.user.id
        })
    }

    componentDidMount() {

        this.props.socket.on("chat message added", this.props.receiveMessage);
    }

    render() {
        let messages = this.props.messages.map(message => {
            let author = this.props.users.find(user => user.id === message.author);
            author = author || this.props.user;
            return {
                author: `${author.firstname} ${author.lastname}`,
                avatar: author.avatar,
                isLeft: message.author === this.props.user.id,
                text: message.text,
                date: message.date
            }
        });

        return (
            <Paper
                zDepth = {1}
                style = {this.style}
            >
                <ChatMessagesList
                    messages = {messages}
                />
                <ChatMessageForm
                    onSubmit = {::this.handleSendMessage}
                />
            </Paper>
        );
    }
}