import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
    setConnection
} from '../../actions/socket'

import {
    loadContacts
} from '../../actions/contacts'

import {
    createPeer
} from '../../actions/videoconference'

import MainWindow from '../MainWindow'

@connect(
    state => ({
        user: state.user,
        socket: state.socket
    }),

    dispatch => ({
        loadContacts: bindActionCreators(loadContacts, dispatch),
        setConnection: bindActionCreators(setConnection, dispatch),
        createPeer: bindActionCreators(createPeer, dispatch)
    })
)
export default class Container extends React.Component {

    componentWillMount() {
        this.props.setConnection(this.props.user.id);
        this.props.createPeer(this.props.user.id);
        this.props.loadContacts(this.props.user.id);
    }

    render() {
        return (
            <MainWindow />
        );
    }
}