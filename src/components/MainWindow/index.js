import React, { PropTypes } from 'react'
import ChatRoom from '../ChatRoom'
import SideBar from '../SideBar'

import io from 'socket.io-client'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import VideoConference from '../VideoConference'

@connect(
    state => ({
        user: state.user
    }),

    dispatch => ({

    })
)
export default class MainWindow extends React.Component {

    style = {
        height: '100%',
        width: '100%'
    };

    componentDidMount() {
        const socket = io('localhost:3333', { query: `userID=${this.props.user.id}` });
        socket.emit('add contact', {
            userID: this.props.user.id,
            contactID: 'dfgdfgdfgdf'
        });
        socket.on('add contact confirm', user => {

        })
    }

    render() {
        return (
            <div style = {this.style}>
                <SideBar />
                <VideoConference />
                <ChatRoom />
            </div>
        );
    }
}