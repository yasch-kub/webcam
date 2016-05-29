import React from 'react'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
    setConnection
} from '../../actions/socket'

import MainWindow from '../MainWindow'

@connect(
    state => ({
        user: state.user,
        socket: state.socket
    }),

    dispatch => ({
        setConnection: bindActionCreators(setConnection, dispatch),
    })
)
export default class Container extends React.Component {

    componentWillMount() {
        this.props.setConnection(this.props.user.id)
    }

    render() {
        return (
            <MainWindow />
        );
    }
}