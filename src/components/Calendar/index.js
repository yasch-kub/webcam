import React, {PropTypes} from 'React'

import CalendarEventsForm from '../CalendarEventsForm'
import CalendarEventsList from '../CalendarEventsList'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
    addEvent
} from '../../actions/calendar'

@connect(
    state => ({
        events: state.calendar.events,
        user: state.user
    }),

    dispatch => ({
        addEvent: bindActionCreators(addEvent, dispatch)
    })
)
export default class Calendar extends React.Component {
    style = {
        ...this.props.style,
        display: 'inline-block'
    };

    addEvent(event) {
        this.props.addEvent(this.props.user.id, event)
    }

    render() {
        return (
            <div style = {this.style}>
                <CalendarEventsForm
                    submit = {::this.addEvent}
                />
                <CalendarEventsList
                    events = {this.props.events}
                    style = {{
                        top: 100,
                        position: 'absolute'
                    }}
                />
            </div>
        );
    }
}