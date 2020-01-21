import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';

import {createBrowserHistory} from 'history';

const history = createBrowserHistory();

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export const createReducer = (injectedReducers = {}) =>
    combineReducers({
        router: connectRouter(history),
        ...injectedReducers,
    });
