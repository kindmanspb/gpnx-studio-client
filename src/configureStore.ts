/**
 * Create the store with dynamic reducers
 */

import {applyMiddleware, compose, createStore} from 'redux';
import {routerMiddleware} from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import {createReducer} from "./reducers";
import {History} from "history";
import LocationState = History.LocationState;

declare interface IWindow extends Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any; // redux-dev-tools definitions not needed
}

declare const window: IWindow;

export default function configureStore(initialState = {}, history: History<LocationState>) {
    let composeEnhancers = compose;
    // const reduxSagaMonitorOptions = {};

    // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
        /* eslint-disable no-underscore-dangle */
        if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
            composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});
        }
    }

    const sagaMiddleware = createSagaMiddleware();

    // Create the store with two middlewares
    // 1. sagaMiddleware: Makes redux-sagas work
    // 2. routerMiddleware: Syncs the location/URL path to the state
    const middlewares = [sagaMiddleware, routerMiddleware(history)];

    const enhancers = [applyMiddleware(...middlewares)];

    const store = createStore(
        createReducer(),
        initialState,
        composeEnhancers(...enhancers),
    );

    // @ts-ignore
    if (module['hot']) {
        // @ts-ignore
        module['hot'].accept('./reducers', () => {
            // store.replaceReducer(createReducer(store.injectedReducers));
        });
    }

    return store;
}
