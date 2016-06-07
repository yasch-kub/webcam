import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    changeMuteNotification,
    createTranslation,
    getStream,
    incomingCallRequest,
    incomingCallConfirm
} from '../../actions/videoconference'

import CallRequest from '../CallRequest';
import VideoTranslation from '../VideoTranslation'
import CallControlPanel from '../CallControlPanel'

import {
    Paper
} from 'material-ui'

@connect(
    state => ({
        isCalling: state.videoconference.isCalling,
        caller: state.videoconference.caller,
        isMute: state.videoconference.isMute,
        peer: state.videoconference.peer,
        socket: state.socket,
        autoplay: state.videoconference.autoplay,
        src: state.videoconference.src,
        contactID: state.chat.contactID,
        stream: state.videoconference.stream,
        interlocutorStream: state.videoconference.interlocutorStream,
        interlocutorStreamSrc: state.videoconference.interlocutorStreamSrc,
        userID: state.user.id
    }),
    dispatch => ({
        changeMuteNotification: bindActionCreators(changeMuteNotification, dispatch),
        createTranslation: bindActionCreators(createTranslation, dispatch),
        getStream: bindActionCreators(getStream, dispatch),
        incomingCallRequest: bindActionCreators(incomingCallRequest, dispatch),
        incomingCallConfirm: bindActionCreators(incomingCallConfirm, dispatch)
    })
)
export default class VideoConference extends React.Component {

    componentDidMount() {
        navigator.getUserMedia =
            navigator.getUserMedia
            || navigator.webkitGetUserMedia
            || navigator.mozGetUserMedia
            || navigator.msGetUserMedia;

        navigator.getUserMedia(
            {audio: true, video: true},
            this.props.createTranslation,
            ::this.streamError
        );

        let socket = this.props.socket;
        if (socket != null) {
            socket.on('call request confirm', ::this.makeCall);
            socket.on('call request', this.props.incomingCallRequest)
        }

        this.props.peer.on('call', call => {
            call.answer(this.props.stream);
            console.log('call');
            call.on('stream', this.props.getStream);
        })
    }

    streamError(error) {
        alert(error);
    }

    takeUpIncomingCall() {
        this.props.socket.emit('call request confirm', {
            callerID: this.props.caller.id
        });
        this.props.incomingCallConfirm();
    }

    makeCall() {
        let call = this.props.peer.call(this.props.contactID, this.props.stream);
        call.on('stream', this.props.getStream);
    }

    call() {
        this.props.socket.emit('call request', {
            callerID: this.props.userID,
            receiverID: this.props.contactID
        });
    }

    render() {
        return (
            <div
                style = {{
                    width: 640,
                    height: 480,
                    marginLeft: 345
                }}
            >
                <VideoTranslation
                    selfSrc = {this.props.src}
                    interlocutorStreamSrc = {this.props.interlocutorStreamSrc}
                    muted = {this.props.isMute}
                />

                <CallControlPanel
                    isMute = {this.props.isMute}
                    changeMuteNotification = {this.props.changeMuteNotification}
                    call = {::this.call}
                />
                {
                    this.props.isCalling &&
                    <CallRequest
                        style = {{
                            marginTop: -530
                        }}
                        header = "Incoming call..."
                        avatar = {this.props.caller.avatar}
                        text = {this.props.caller.fullname}
                        takeUpHandle = {::this.takeUpIncomingCall}
                    />
                }
            </div>
        );
    }
}