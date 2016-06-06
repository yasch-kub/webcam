import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    changeMuteNotification,
    createTranslation,
    getStream
} from '../../actions/videoconference'

import VideoTranslation from '../VideoTranslation'
import CallControlPanel from '../CallControlPanel'

import {
    Paper
} from 'material-ui'

@connect(
    state => ({
        isMute: state.videoconference.isMute,
        peer: state.videoconference.peer,
        autoplay: state.videoconference.autoplay,
        src: state.videoconference.src,
        contactID: state.chat.contactID,
        stream: state.videoconference.stream,
        interlocutorStream: state.videoconference.interlocutorStream,
        interlocutorStreamSrc: state.videoconference.interlocutorStreamSrc
    }),
    dispatch => ({
        changeMuteNotification: bindActionCreators(changeMuteNotification, dispatch),
        createTranslation: bindActionCreators(createTranslation, dispatch),
        getStream: bindActionCreators(getStream, dispatch)
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

        this.props.peer.on('call', call => {
            call.answer(this.props.stream);
            console.log('call')
            call.on('stream', this.props.getStream);
        })
    }

    streamError(error) {
        alert(error);
    }

    call() {
        let call = this.props.peer.call(this.props.contactID, this.props.stream);
        call.on('stream', this.props.getStream);
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
            </div>
        );
    }
}