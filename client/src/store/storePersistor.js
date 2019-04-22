// import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web and AsyncStorage for react-native

import rootReducer from './reducers'

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

const middleware = [thunk]

const initialState = {};

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
    persistedReducer,
    initialState,
    compose(
    applyMiddleware(...middleware),
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ))
export const persistor = persistStore(store)
