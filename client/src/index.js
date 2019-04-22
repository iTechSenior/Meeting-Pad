import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import ReduxToastr from 'react-redux-toastr'

import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";

// cvoro
import {Provider} from 'react-redux';
// import store from './store/store';
import { PersistGate } from 'redux-persist/integration/react'

import { store, persistor } from './store/storePersistor'

const hist = createBrowserHistory();


ReactDOM.render(
  <Provider store={store}>
  <PersistGate loading={null} persistor={persistor}>
  <Router history={hist}>
    <Switch>
      {indexRoutes.map((prop, key) => {
          return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </Router>
  <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-right"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick/>
  </PersistGate>
  </Provider>,
  document.getElementById("root")
);
