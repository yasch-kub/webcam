import React from 'react'

import {
    Paper,
    List,
    ListItem
} from 'material-ui'

export default class CalendarList extends React.Component{

    static propTypes = {
      events: React.PropTypes.array
    };

    listStyle = {
        marginTop: 50,
        display: 'inline-block',
        padding: 10,
        width: 350
    };
    
    render(){
        let options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timezone: 'UTC',
            hour: 'numeric',
            minute: 'numeric'
        };

        let events = this.props.events
            .map(event => {
                let date = new Date(event.date.getFullYear(), event.date.getMonth(), event.date.getDay(), event.time.getHours(), event.time.getMinutes(), event.time.getSeconds());
                return (<ListItem  primaryText={
                    `${event.title} ${date.toLocaleString("en-US", options)}`
                }
                />)
            });

        return(
            <Paper
                zDepth = {2}
                style = {this.listStyle}
            >
                <h1 
                    style={{
                        margin: 0,
                        textAlign: 'center'
                    }}
                >
                    Events List
                </h1>
                <List
                >
                    {events}
                </List>
            </Paper>
        )
    }
}