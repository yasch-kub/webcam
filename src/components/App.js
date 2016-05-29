import React, { PropTypes } from 'react';

import SideBar from './SideBar'
import Registration from './Registration'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
    setConnection
} from '../actions/socket';

export default class App extends React.Component {

    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}