import {SIDEBAR_CHANGE_TAB} from '../actions/sidebar';

const initialState = {
    tabIndex: 0
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SIDEBAR_CHANGE_TAB:
            return { 
                ...state, 
                tabIndex:  action.tabIndex
            };
        default:
            return state
    }
} 