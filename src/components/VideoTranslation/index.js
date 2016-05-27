import React from 'react'

import {
    Paper
} from 'material-ui'

export default class VideoTranslation extends React.Component {
    render() {
        return (
            <Paper
                zIndex = {2}
                style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    margin: 10,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }}
            >
            </Paper>
        );
    }
}