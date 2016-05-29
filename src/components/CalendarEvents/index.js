import React from "react"

import {
    DatePicker
} from 'material-ui'

export default class CalendarEvent extends React.Component {

    onTouchTap(e) {
        console.log(e);
    }

    render() {
        return (
            <DatePicker 
                container = "inline"
                style = {{

                }}
                onTouchTap = {::this.onTouchTap}
            />
        )
    }
}