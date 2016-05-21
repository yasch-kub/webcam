import {
    SEARCH_CONTACT,
    LOAD_CONTACTS_SUCCESS
} from '../actions/contacts';

const initialState = {
    selected: [],
    favourites: [],
    other: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SEARCH_CONTACT:
            let selected = [],
                searchString = action.searchString.toLowerCase();
            for (let key in initialState)
                if (!isNaN(parseInt(key))) {
                    let fullname = `${initialState[key].firstname} ${initialState[key].lastname}`.toLowerCase();

                    if (fullname.indexOf(searchString) == 0)
                        selected.push(parseInt(key));
                }
            return ({
                ...state,
                selected
            });

        case LOAD_CONTACTS_SUCCESS:
            return {
                ...state,
                ...action.users
            };

        default:
            return state;
    }
}
