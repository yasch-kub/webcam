import React from 'react'

import {IconButton} from 'material-ui'

export default class ChatAttachments extends React.Component {
    render() {
        return (
            <div>
                <IconButton
                    iconClassName="material-icons"
                    tooltip="Attach file"
                >
                    attach_file
                </IconButton>
                <IconButton
                    iconClassName="material-icons"
                    tooltip="Add photo"
                >
                    photo_camera
                </IconButton>
                <IconButton
                    iconClassName="material-icons"
                    tooltip="Add quiz"
                >
                    assessment
                </IconButton>
            </div>
        );
    }
}