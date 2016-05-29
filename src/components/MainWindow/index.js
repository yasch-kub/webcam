import React, { PropTypes } from 'react'
import ChatRoom from '../ChatRoom'
import SideBar from '../SideBar'
import VideoConference from '../VideoConference'
import CalendarEvents from '../CalendarEvents'
import CalendarList from '../CalendarEventsList'

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
        userWhoAdd: state.events.addContact ? state.contacts.contacts.find(user => user.id == state.events.addContact.userID) : null,
        user: state.user,
        socket: state.socket,
        event: state.events.addContact
    }),

    dispatch => ({
        addContactRequest: bindActionCreators(addContactRequest, dispatch),
        addContactReject: bindActionCreators(addContactReject, dispatch),
        addContactConfirm: bindActionCreators(addContact, dispatch)
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
        }
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
                            this.props.addContactConfirm(this.props.user.id, this.props.userWhoAdd.id);
                            this.props.addContactReject();
                        }}
                    />
                }
                <CalendarList events = {[
                {
                    date: new Date(),
                    title: 'Heloo',
                    time: new Date()
                },
                {
                    date: new Date(),
                    title: 'Heloo43',
                    time: new Date()
                }
                ]}/>
            </div>
        );
    }
}