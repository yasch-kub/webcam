import React from 'react'
import ReactDOM from 'react-dom'
import {
    Router,
    Route,
    IndexRoute,
    browserHistory,
} from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme'

injectTapEventPlugin();

import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const store = configureStore();

import App from './components/App'
import Container from './components/Container'
import Registration from './components/Registration'
import Login from './components/Login'

ReactDOM.render(
    <Provider store = {store}>
        <MuiThemeProvider muiTheme = {getMuiTheme(lightBaseTheme)}>
            <Router history = {browserHistory}>
                <Route path = "/" component = {App}>
                    <IndexRoute component = {Container} />
                    <Route path = "app" component = {Container} />
                    <Route path = "login" component = {Login} />
                    <Route path = "registration" component = {Registration} />
                </Route>
            </Router>
        </MuiThemeProvider>
    </Provider>,
    
    document.getElementById('container')
);