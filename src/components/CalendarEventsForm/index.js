import React, {PropTypes} from "react"
import CalendarList from "../CalendarEventsList"

import {
    DatePicker,
    Paper,
    TimePicker,
    TextField,
    RaisedButton,
    FontIcon
} from 'material-ui'

export default class CalendarEventsForm extends React.Component {

    static propTypes = {
        submit: PropTypes.func,
        style: PropTypes.object
    };

    static defaultProps = {
        submit: () => {}
    };

    onChangeDate(e, date){
        this.setState({
            date: new Date(date.valueOf())
        });
        console.log(this.state);
    }

    onChangeTime(e, time){
        this.setState({
            time: new Date(time.valueOf())
        })
    }

    onChangeTitle(e, title){
        this.setState({
            title
        })
    }

    handleClick(){
        this.props.submit(this.state);
        this.setState({
            date: null,
            time: null,
            title: null
        })
    }

    state = {
        date: null,
        time: null,
        title: null
    };

    formStyle = {
        ...this.props.style,
        display: 'inline-block',
        padding: 10,
        width: 315,
        textAlign: 'center',
        marginRight: 10
    };

    render() {
        return (
            <Paper
                zDepth = {2}
                style = {this.formStyle}
            >
                <h2
                    style = {{margin: 0}}
                >
                    Event
                </h2>
                <TextField
                    style = {{
                        textAlign: 'left'
                    }}
                    hintText = "Event title"
                    floatingLabelText = "Event title"
                    multiLine = {true}
                    onChange = {::this.onChangeTitle}
                    value = {this.state.title}
                />
                <br />
                <DatePicker
                    hintText="Event date"
                    floatingLabelText = "Event date"
                    onChange = {::this.onChangeDate}
                />
                <TimePicker
                    hintText="Event time"
                    floatingLabelText = "Event Time"
                    onChange = {::this.onChangeTime}
                />
                <RaisedButton
                    label="Add Event"
                    labelPosition="before"
                    primary={true}
                    icon={<FontIcon className="material-icons">add</FontIcon>}
                    onClick = {::this.handleClick}
                    style = {{
                        marginTop: 50
                    }}
                />
            </Paper>
        )
    }
}