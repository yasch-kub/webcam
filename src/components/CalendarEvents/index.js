import React from "react"
import CalendarList from "../CalendarEventsList"

import {
    DatePicker,
    Paper,
    TimePicker,
    TextField,
    RaisedButton
} from 'material-ui'
import ContentAdd from 'material-ui/svg-icons/content/add';

export default class CalendarEvent extends React.Component {

    static propTypes ={
        submit: React.PropTypes.func
    } ;

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

    handleClick(e){
        this.props.submit(this.state);
    }

    state = {
        date: null,
        time: null,
        title: null
    };

    formStyle = {
        display: 'inline-block',
        padding: 10,
        width: 350,
        textAlign: 'center' 
    };

    render() {
        return (
            <div>
                <Paper
                    zDepth = {2}
                    style = {this.formStyle}
                >
                    <h1
                        style = {{margin: 0}}
                    >
                        Event
                    </h1>
                    <TextField
                        style = {{
                            textAlign: 'left'
                        }}
                        hintText = "Enter event name"
                        floatingLabelText = "Enter event name"
                        multiLine = {true}
                        onChange = {::this.onChangeTitle}
                    /><br />
                    <DatePicker
                        hintText="Please select event Date"
                        floatingLabelText = "Please select event Date"
                        onChange = {::this.onChangeDate}
                    />
                    <TimePicker
                        hintText="Please select event Time"
                        floatingLabelText = "Please select event Time"
                        onChange = {::this.onChangeTime}
                    />
                    <RaisedButton
                        label="Add Event"
                        labelPosition="before"
                        primary={true}
                        icon={<ContentAdd />}
                        onClick = {::this.handleClick}
                    />
                    
                </Paper>
                <br/>
            </div>
            
        )
    }
}