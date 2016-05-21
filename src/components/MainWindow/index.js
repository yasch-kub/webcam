import React, { PropTypes } from 'react'
import ChatRoom from '../ChatRoom'
import SideBar from '../SideBar'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

@connect(
    state => ({
        
    }),
    dispatch => ({
        
    })
)
export default class MainWindow extends React.Component {

    static defaultProps = {
        loadContacts: PropTypes.func.isRequired
    };

    style = {
        padding: 10,
        height: '100%',
        width: '100%'
    };

    render() {
        return (
            <div style = {this.style}>
                <SideBar />
            </div>
        );
    }
}