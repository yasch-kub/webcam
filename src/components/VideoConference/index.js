import React from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    changeMuteNotification
} from '../../actions/videoconference'

import VideoTranslation from '../VideoTranslation'
import CallControlPanel from '../CallControlPanel'

@connect(
    state => ({
        isMute: state.videoconference.isMute
    }),
    dispatch => ({
        changeMuteNotification: bindActionCreators(changeMuteNotification, dispatch)
    })
)
export default class VideoConference extends React.Component {
    render() {
        return (
            <div
                style = {{
                    width: 640,
                    height: 480,
                    marginLeft: 345
                }}
            >
                <VideoTranslation />
                <CallControlPanel
                    isMute = {this.props.isMute}
                    changeMuteNotification = {this.props.changeMuteNotification}
                />
            </div>
        );
    }
}