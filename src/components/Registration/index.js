import React, { PropTypes } from 'react'

import { Link } from "react-router"

import {
    CircularProgress,
    Paper,
    RaisedButton,
    FlatButton,
    TextField,
    FontIcon,
    IconButton
} from 'material-ui'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { signup } from '../../actions/user'

import { FormsyText } from 'formsy-material-ui'
import Formsy from 'formsy-react'

@connect(
    state => ({}),
    dispatch => ({
        signup: bindActionCreators(signup, dispatch)
    })
)
export default class Registration extends React.Component {

    static propTypes = {
        signup: PropTypes.func
    };

    formStyle = {
        padding: 10,
        textAlign: 'center',
        margin: 'auto',
        display: 'inline-block'
    };

    buttonStyle = {
        marginTop: 50
    };

    state = {
        firstname: {
            value: null,
            error: null
        },
        lastname: {
            value: null,
            error: null
        },
        email: {
            value: null,
            error: null
        },
        password: {
            value: null,
            error: null
        }
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
        this.props.signup(this.state);
    }

    render() {
        return (
            <center>
                <Paper zDepth = {1} style = {this.formStyle}>
                    <Formsy.Form onValidSubmit = {::this.handleSubmit}>
                        <h1>
                            SIGN UP
                            {this.props.isFetching && <CircularProgress size = {0.5} style = {{bottom: -12}} />}
                        </h1>
                        <FormsyText
                            hintText = "Firstname"
                            floatingLabelText = "Firstname"
                            onChange = {::this.handleInputChange}
                            required
                            name = "firstname"
                        />
                        <br />
                        <FormsyText
                            hintText = "Lastname"
                            floatingLabelText = "Lastname"
                            onChange = {::this.handleInputChange}
                            required
                            name = "lastname"
                        />
                        <br />
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
                        <RaisedButton
                            type = "submit"
                            style = {this.buttonStyle}
                            secondary = {true}
                            label = "Sign Up"
                        />
                        <Link to = "/login">
                            <FlatButton
                                label = "login"
                            />
                        </Link>
                    </Formsy.Form>
                </Paper>
            </center>
        );
    }
}