import React, { PropTypes } from 'react'

import {
    Paper
} from 'material-ui'

export default class VideoTranslation extends React.Component {

    static propTypes = {
        streamSrc: PropTypes.string,
        selfSrc: PropTypes.string,
        interlocutorStreamSrc: PropTypes.string,
        muted: PropTypes.bool,
        enabled: PropTypes.bool
    };

    paperStyle = {
        padding: 5,
        display: 'block',
        width: '100%',
        height: '100%',
        margin: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        position: 'relative',
        textAlign: 'center'
    };

    streamVideoStyle = {
        height: '100%',
        width: '100%'
    };

    selfVideoStyle = {
        width: '100%',
        height: 'auto'
    };

    selfPaperStyle = {
        width: 200,
        display: 'block',
        padding: '5px 5px 0px 5px',
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 15,
        right: 15
    };

    render() {
        return (
            <Paper
                zIndex = {2}
                style = {this.paperStyle}
            >
                <video
                    style = {this.streamVideoStyle}
                    autoPlay
                    src = {this.props.interlocutorStreamSrc}
                    muted = {this.props.muted}
                    hidden = {!this.props.enabled}
                />

                <Paper
                    zIndex = {4}
                    style = {this.selfPaperStyle}
                >
                    <video
                        style = {this.selfVideoStyle}
                        autoPlay
                        src = {this.props.selfSrc}
                        muted
                    />
                </Paper>
            </Paper>
        );
    }
}