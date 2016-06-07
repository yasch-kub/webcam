import React, { PropTypes } from 'react'
import ChatRoom from '../ChatRoom'
import SideBar from '../SideBar'
import VideoConference from '../VideoConference'
import Calendar from '../Calendar'
import CallRequest from '../CallRequest'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ConfirmPushUp from '../ConfirmPushUp'

import {
    addContact
} from '../../actions/contacts'

import {
    addContactRequest,
    addContactReject
} from '../../actions/events'

@connect(
    state => ({
        userWhoAdd: state.events.addContact,
        user: state.user,
        socket: state.socket,
        event: state.events.addContact,
        isCalendarOpen: state.calendar.isOpen
    }),

    dispatch => ({
        addContactRequest: bindActionCreators(addContactRequest, dispatch),
        addContactReject: bindActionCreators(addContactReject, dispatch),
        addContact: bindActionCreators(addContact, dispatch)
    })
)
export default class MainWindow extends React.Component {

    style = {
        height: '100%',
        width: '100%'
    };

    componentDidMount() {
        let socket = this.props.socket;
        if (socket != null) {
            socket.on('add contact request', this.props.addContactRequest);
            socket.on('con', e => console.log(e));
            socket.on('add contact request confirm', this.props.addContact)
        }
    }

    addContactConfirm() {
        this.props.socket.emit('add contact request confirm', {
            userID: this.props.user.id,
            contactID: this.props.userWhoAdd.id
        });
        this.props.addContact(this.props.user.id, this.props.userWhoAdd.id);
    }

    render() {
        return (
            <div style = {this.style}>
                <SideBar />
                {
                    this.props.event &&
                    <ConfirmPushUp
                        title = "Notification"
                        message = {`${this.props.userWhoAdd.fullname} want to add your as a friend`}
                        onReject = {this.props.addContactReject}
                        onConfirm = {() => {
                            this.addContactConfirm();
                            this.props.addContactReject();
                        }}
                    />
                }
                <VideoConference />
                <ChatRoom />
                {
                    this.props.isCalendarOpen &&
                    <Calendar
                        style={{
                        position: 'relative',
                        marginTop: 10,
                        marginLeft: 355
                    }}
                    />
                }
            </div>
        );
    }
}