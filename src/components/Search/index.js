import React, { PropTypes } from 'react'

import {
    FontIcon,
    TextField
} from 'material-ui'

export default class Search extends React.Component {

    render() {
        return(
            <TextField
                onChange = {e => this.props.search(e.target.value)}
                style = {{
                    left: 23,
                    width: "85%"
                }}
                floatingLabelText = {<FontIcon className="material-icons">search</FontIcon>}
            />
        )
    }
}
