import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import {
    List,
    Divider,
    Subheader
} from 'material-ui';

import {TransitionMotion, spring} from 'react-motion'

import ChatMessage from '../ChatMessage'

export default class ChatMessagesList extends React.Component {

    static propTypes = {
        messages: PropTypes.arrayOf(PropTypes.shape({
            text: PropTypes.string,
            author: PropTypes.string,
            avatar: PropTypes.string,
            isLeft: PropTypes.boolean,
            date: PropTypes.string
        })).isRequired
    };

    style = {
        width: 610,
        height: 150,
        overflowY: 'scroll',
        marginBottom: 15
    };

    componentDidUpdate() {
        let dom = ReactDOM.findDOMNode(this);
        dom.scrollTop = dom.scrollHeight;
    };


    render() {

        let messageList = this.props.messages.map((message, i) =>
            <ChatMessage
                key = {i}
                {...message}
                time = {
                    (new Date(message.date)).toLocaleTimeString()
                }
            >
                {message.text}                
            </ChatMessage>
        );
        
        return (
            <div style = {this.style}>
                <List>
                    <Subheader>
                        Today
                    </Subheader>
                    {messageList}
                </List>
            </div>
        );
    }
}
