import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      rest.logedin// TODO change this to loggedIn state 
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

function mapStateToProps(state) {
  return{
    logedin: state.activeUser.loggedIn
  }
}

export default connect(mapStateToProps,{})(PrivateRoute);

// export default PrivateRoute;