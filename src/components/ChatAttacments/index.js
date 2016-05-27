import React from 'react'

import {
    IconButton
} from 'material-ui'
import { white, black} from 'material-ui/styles/colors'

export default class ChatAttachments extends React.Component {

    style = {
        color: black
    };

    render() {
        return (
            <div>
                <IconButton
                    iconClassName = "material-icons"
                    tooltip = "Attach file"
                    iconStyle = {this.style}
                >
                    attach_file
                </IconButton>
                <IconButton
                    iconClassName = "material-icons"
                    tooltip = "Add photo"
                    iconStyle = {this.style}
                >
                    photo_camera
                </IconButton>
                <IconButton
                    iconClassName = "material-icons"
                    tooltip = "Add quiz"
                    iconStyle = {this.style}
                >
                    assessment
                </IconButton>
            </div>
        );
    }
}