import api from '../api'

import { browserHistory } from 'react-router'

export const AUTH_WAITING = 'AUTH_WAITING';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILED';

export function signup(user) {
    return dispatch => {
        console.log(user)
        dispatch(waiting());
        fetch(`${api}/users`, {
            method: 'post',
            body: JSON.stringify(user),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(
                response => (response.status == 200)
                    ? Promise.resolve(response)
                    : Promise.reject(response.statusText)
            )
            .then(response => response.json())
            .then(
                response => setTimeout(
                    () => {
                        dispatch(signupSuccess(response));
                        browserHistory.push('/app');
                    }, 2000)
            )
            .catch(
                error => setTimeout(
                    () => dispatch(signupFailure(error)), 2000)
            );
    }
}

export function signupSuccess(user) {
    return {
        type: SIGNUP_SUCCESS,
        user
    }
}

export function signupFailure(error) {
    return {
        type: SIGNUP_FAILURE,
        error
    }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILED';

export function login(email, password) {
    let creditionals = {
        email,
        password
    };
    
    return dispatch => {
        dispatch(waiting());
        fetch(`${api}/users/login`, {
            method: 'post',
            body: JSON.stringify(creditionals),
            headers: new Headers({
                "Content-Type": "application/json"
            })
        })
            .then(
                response => (response.status == 200)
                    ? Promise.resolve(response)
                    : Promise.reject(response.statusText)
            )
            .then(response => response.json())
            .then(
                response => setTimeout(
                    () => {
                        dispatch(loginSuccess(response));
                        browserHistory.push('/app');
                    }, 2000)
            )
            .catch(
                error => setTimeout(
                    () => dispatch(loginFailure(error)), 2000)
            );
    }
}

function waiting() {
    return {
        type: AUTH_WAITING
    }
}

function loginSuccess(user) {
    return {
        type: LOGIN_SUCCESS,
        user
    }
}

function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error
    }
}