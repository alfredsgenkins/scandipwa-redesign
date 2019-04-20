import { HOME_PAGE } from 'Component/Header';
import {
    CHANGE_HEADER_STATE
} from './Header.action';

const initialState = {
    headerStateName: HOME_PAGE
};

const HeaderReducer = (state = initialState, action) => {
    switch (action.type) {
    case CHANGE_HEADER_STATE:
        const { headerStateName } = action;

        return {
            ...state,
            headerStateName
        };
    default:
        return state;
    }
};

export default HeaderReducer;
