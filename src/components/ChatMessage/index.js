import React, { PropTypes } from 'react'

import { 
    ListItem,
    Divider,
    Avatar
} from 'material-ui'

export default class ChatMessage extends React.Component {

    static propTypes = {
        author: PropTypes.string,
        avatar: PropTypes.string,
        children: PropTypes.string,
        time: PropTypes.string,
        isLeft: PropTypes.bool
    };

    static defaultProps = {
        isLeft: true
    };

    timeStyle = {
        fontSize: 13,
        top: 10
    };

    isLeft = this.props.isLeft;

    leftStyle = {
        textAlign: this.isLeft ? 'left' : 'right',
        margin: this.isLeft ? 0 : '0 15px'
    };

    time =
        <p style = {this.timeStyle}>
            {this.props.time}
        </p>;

    avatar = <Avatar src = {this.props.avatar} />;

    author =
        <p style = {{...this.leftStyle}}>
            <b>
                {this.props.author}
            </b>
        </p>;

    text =
        <p style = {{...this.leftStyle, whiteSpace: 'pre'}}>
            {this.props.children}
        </p>;

    render() {
        return (
            <ListItem
                leftAvatar = {this.isLeft ? this.avatar : this.time}
                rightAvatar = {this.isLeft ? this.time : this.avatar}
                primaryText = {this.author}
                secondaryText = {this.text}
            />
        );
    }
}