import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import {store} from '../store/storePersistor';

const LoginRoute = ({ component: Component}) => (
    <Route render={() => (
        !store.getState().activeUser.loggedIn
          ? <Component />
          : <Redirect to='/dashboard' />
      )} />
);

export default LoginRoute;