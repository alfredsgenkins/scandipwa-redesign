import {
    createStore, combineReducers
} from 'redux';

import { HeaderReducer } from 'Store/Header';

const reducers = combineReducers({
    HeaderReducer
});

const store = createStore(
    reducers,
    ( // enable Redux dev-tools only in development
        process.env.NODE_ENV === 'development'
        && window.__REDUX_DEVTOOLS_EXTENSION__
    ) && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
