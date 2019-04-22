import {combineReducers} from 'redux';
import ActiveUserReducer from './active-user';
import Documents from './documents';
import dashboard from './dashboard'
import {reducer as toastrReducer} from 'react-redux-toastr'


/*
 * We combine all reducers into a single object before updated data is dispatched (sent) to store
 * Your entire applications state (store) is just whatever gets returned from all your reducers
 * */

const allReducers = combineReducers({
    activeUser: ActiveUserReducer,
    documents: Documents,
    dashboard: dashboard,
    toastr: toastrReducer
});

export default allReducers;