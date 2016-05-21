import React, { PropTypes } from 'react'

import { Link } from "react-router"

import {
    CircularProgress,
    Paper,
    RaisedButton,
    FlatButton,
    TextField,
    FontIcon,
    IconButton,
    Toggle
} from 'material-ui'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login } from '../../actions/user'

import { FormsyText } from 'formsy-material-ui'
import Formsy from 'formsy-react'

@connect(
    state => ({
        isFetching: state.user.isFetching
    }),
    dispatch => ({
        login: bindActionCreators(login, dispatch)
    })
)
export default class Login extends React.Component {

    static defaultProps = {
        login: PropTypes.func.isRequired,
        isFetching: PropTypes.bool.isRequired
    };

    state = {
        email: {
            value: null,
            error: null
        },
        password: {
            value: null,
            error: null
        }
    };

    formStyle = {
        padding: 10,
        textAlign: 'center',
        margin: 'auto',
        display: 'inline-block'
    };

    buttonStyle = {
        marginTop: 30
    };

    toggleStyle = {
        marginTop: 30,
        textAlign: 'left'
    };

    handleInputChange(e) {
        let name = e.target.name,
            value = e.target.value;

        this.setState({
            [name]: {
                value
            }
        })
    }

    handleSubmit() {
        this.props.login(this.state.email.value, this.state.password.value);
    }

    render() {
        return (
            <center>
                <Paper zDepth = {1} style = {this.formStyle}>
                    <Formsy.Form onValidSubmit = {::this.handleSubmit}>
                        <h1>
                            LOGIN
                            {this.props.isFetching && <CircularProgress size = {0.5} style = {{bottom: -12}} />}

                        </h1>
                        <FormsyText
                            type = "email"
                            hintText = "Email"
                            floatingLabelText = "Email"
                            onChange = {::this.handleInputChange}
                            name = "email"
                            required
                            validations = "isEmail"
                            validationError = "This is not a valid email"
                        />
                        <br />
                        <FormsyText
                            type = "password"
                            hintText = "Password"
                            floatingLabelText = "Password"
                            onChange = {::this.handleInputChange}
                            name = "password"
                            required
                            validations = "minLength:8"
                            validationError = "Too short. Min length is 8"
                        />
                        <br />
                        <Toggle
                            label = "Remind me"
                            style = {this.toggleStyle}
                        />
                        <br />

                            <RaisedButton
                                type = "submit"
                                style = {this.buttonStyle}
                                secondary = {true}
                                label = "Login"
                            />

                        <Link to = "/registration">
                            <FlatButton
                                label = "Registration"
                            />
                        </Link>
                    </Formsy.Form>
                </Paper>
            </center>
        );
    }
}