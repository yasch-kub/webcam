import React, { PropTypes } from 'react';

import SideBar from './SideBar'
import Registration from './Registration'

export default class App extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
}