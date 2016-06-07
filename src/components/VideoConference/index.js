import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    changeMuteNotification,
    createTranslation,
    getStream,
    incomingCallRequest,
    incomingCallConfirm,
    incomingCallReject,
    saveCall,
    endCall,
    callRejected
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
        call: state.videoconference.call,
        socket: state.socket,
        enabled: state.videoconference.enabled,
        autoplay: state.videoconference.autoplay,
        src: state.videoconference.src,
        contactID: state.chat.contactID,
        stream: state.videoconference.stream,
        interlocutorStream: state.videoconference.interlocutorStream,
        interlocutorStreamSrc: state.videoconference.interlocutorStreamSrc,
        userID: state.user.id,
        isCallRejectedMessage: state.videoconference.isCallRejectedMessage
    }),
    dispatch => ({
        changeMuteNotification: bindActionCreators(changeMuteNotification, dispatch),
        createTranslation: bindActionCreators(createTranslation, dispatch),
        getStream: bindActionCreators(getStream, dispatch),
        incomingCallRequest: bindActionCreators(incomingCallRequest, dispatch),
        incomingCallConfirm: bindActionCreators(incomingCallConfirm, dispatch),
        incomingCallReject: bindActionCreators(incomingCallReject, dispatch),
        saveCall: bindActionCreators(saveCall, dispatch),
        endCall: bindActionCreators(endCall, dispatch),
        showMessageCallRejected: bindActionCreators(callRejected, dispatch)
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
            socket.on('call request reject', this.props.showMessageCallRejected);
            socket.on('call request', this.props.incomingCallRequest)
        }

        this.props.peer.on('call', call => {
            call.answer(this.props.stream);
            this.props.saveCall(call);
            call.on('stream', this.props.getStream);
            call.on('close', this.props.endCall)
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

    rejectIncomingCall() {
        this.props.socket.emit('call request reject', {
            callerID: this.props.caller.id
        });
        this.props.incomingCallReject();
    }

    makeCall() {
        let call = this.props.peer.call(this.props.contactID, this.props.stream);
        call.on('stream', this.props.getStream);
        call.on('close', this.props.endCall);
        this.props.saveCall(call);
    }

    call() {
        this.props.socket.emit('call request', {
            callerID: this.props.userID,
            receiverID: this.props.contactID
        });
    }

    endCall() {
        this.props.call.close();
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
                    enabled = {this.props.enabled}
                />

                <CallControlPanel
                    isMute = {this.props.isMute}
                    changeMuteNotification = {this.props.changeMuteNotification}
                    call = {::this.call}
                    endCall = {::this.endCall}
                />

                {
                    this.props.isCallRejectedMessage &&
                    <h2 style = {{
                        marginTop: -350
                    }}>
                        User has refused to accept the call
                    </h2>
                }

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
                        rejectCallHandle = {::this.rejectIncomingCall}
                    />
                }
            </div>
        );
    }
}