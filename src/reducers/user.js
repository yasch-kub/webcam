import {
    AUTH_WAITING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
} from '../actions/user';

const initialState = {
    firstname: null,
    lastname: null,
    avatar: null,
    id: null,
    isFetching: false,
    error: null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SIGNUP_SUCCESS:
            return {
                ...state,
                ...action.user,
                isFetching: false
            };

        case SIGNUP_FAILURE:
            return {
                ...state,
                user: null,
                error: action.error,
                isFetching: false
            };

        case AUTH_WAITING:
            return {
                ...state,
                isFetching: true
            };

        case LOGIN_SUCCESS:
            return {
                ...state,
                ...action.user,
                isFetching: false
            };

        case LOGIN_FAILURE:
            return {
                ...state,
                error: action.error,
                isFetching: false
            };

        default:
            return state;
    }
}