import {
    AUTH_WAITING,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    SIGNUP,
    SIGNUP_SUCCESS,
    SIGNUP_FAILURE,
} from '../actions/user';

const initialState = {
    firstname:"Denis",
    lastname:"Kublitskiy",
    avatar:"dist/images/Avatar1.png",
    id:"57175febb88c099c0a86bef0",
    isFetching:false,
    error:null,
    _id:"57175febb88c099c0a86bef0",
    email:"deniskublitskiy@gmail.com",
    password:"$2a$10$merhPK3IpkUmInzEu.9VU.XXWH2TZMTYuXcXsvwB9C2SiqTBn9rGC",
    __v:0
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