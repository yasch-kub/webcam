import React, { PropTypes } from 'react'
import ChatRoom from '../ChatRoom'
import SideBar from '../SideBar'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import VideoConference from '../VideoConference'

export default class MainWindow extends React.Component {

    style = {
        height: '100%',
        width: '100%'
    };

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