import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';

const middleware = [thunk]

const initialState = {};

const store = createStore(
    allReducers,
    initialState,
    compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;