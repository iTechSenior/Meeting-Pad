/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect, Router } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Sidebar from "components/Sidebar/Sidebar.jsx";

import dashboardRoutes from "routes/dashboard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/bg_navigation.png";
// import logo from "assets/img/imgpsh_fullsize.png";
import logo from "assets/img/logo.png"

// cvoro
import {connect} from 'react-redux';
import history from '../../routes/history'
import PrivateRoute from "../../routes/route";
import LoginRoute from '../../routes/login-route'

let switchRoutes = (
  // <Router history={history}>
    <div>
  <Switch>
    {dashboardRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      if(prop.path === '/login')
        return <LoginRoute path={prop.path} component={prop.component} key={key} />;

      return <PrivateRoute path={prop.path} component={prop.component} key={key} authed={true}></PrivateRoute>;
    })}
  </Switch>
  </div>
  // </Router>
);

// let testRoutes = (
//     <Router history={history}>
//   <Switch>
//     {dashboardRoutes.map((prop, key) => {
//       if (prop.redirect)
//         return <Redirect from={prop.path} to={prop.to} key={key} />;
//       if(prop.path === '/login')
//         return <LoginRoute path={prop.path} component={prop.component} key={key} />;

//       return <PrivateRoute exact path={prop.path} component={prop.component} key={key}></PrivateRoute>;
//     })}
//   </Switch>
//    </Router>
// )
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      loggedIn: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }

  componentWillMount(){
    this.setState({ loggedIn: this.props.loggedIn });
  }
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }

  getLoginRoute() {
    return this.props.location.pathname === "/login";
  }

  getDashBoardRoute() {
    return this.props.location.pathname === "/dashboard";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }

  componentWillReceiveProps(e) {
    // console.log(e)
    this.setState({ loggedIn: e.loggedIn }); // set login property
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={classes.wrapper}>
        {this.state.loggedIn ? <Sidebar // when user is not logged in he wont see left navigation bar
          routes={dashboardRoutes}
          logoText={""}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        /> : null }
        <div className={this.getLoginRoute() ? classes.mainPanelLogin : classes.mainPanel} ref="mainPanel">
        {this.state.loggedIn ? <Header
            routes={dashboardRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          /> : null }
          {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
          {this.getRoute() ? (
            <div className={classes.content}>
              <div className={classes.container}>{switchRoutes}</div>
            </div>
          ) : (
            <div className={classes.map}>{switchRoutes}</div>
          )}
          {this.state.loggedIn && (this.props.role !== 'unit') ? <Footer /> : null}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return{
    loggedIn: state.activeUser.loggedIn,
    role: state.activeUser.role
  }
}

export default connect(mapStateToProps, {})(withStyles(dashboardStyle)(App))
