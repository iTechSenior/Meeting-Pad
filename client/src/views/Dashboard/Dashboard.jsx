import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Tasks from "components/Tasks/Tasks.jsx";
import CustomTabs from "components/CustomTabs/CustomTabs.jsx";
import Danger from "components/Typography/Danger.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardIcon from "components/Card/CardIcon.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import { bugs, website, server } from "variables/general.jsx";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import { Button } from "@material-ui/core";

// cvoro
import { withRouter } from 'react-router-dom'
import { getDashboardValues, getUnitDashboardValues, getChartValuePerUnit } from '../../store/actions/documents'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toastr } from 'react-redux-toastr'

import ItemsCarousel from 'react-items-carousel';

import ArrowCarousel from './arrow'
import Charts from './charts'

class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      it: true,
      business: true,
      wholesale: true,
      hr: true,
      finance: true,
    }
  }


  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndexIcons: 0,
      activeItemIndexCharts: 0
    });
    this.props.getChartValuePerUnit('business')
    this.props.getChartValuePerUnit('wholesale')
    this.props.getChartValuePerUnit('it')
    this.props.getChartValuePerUnit('hr')
    this.props.getChartValuePerUnit('finance')
    if (this.props.role === 'unit') {
      // here goes logic for unit dashboards
      this.props.getUnitDashboardValues(this.props.unit)
    } else {
      // here goes logic for organizer and presenter dashboards
      this.props.getDashboardValues()
    }
  }
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  changeActiveItemIcons = (activeItemIndexIcons) => this.setState({ activeItemIndexIcons });
  changeActiveItemCharts = (activeItemIndexCharts) => this.setState({ activeItemIndexCharts });

  convertUnitName(unit) {
    switch (unit) {
      case 'Finance':
        return 'finance'
      case 'HR':
        return 'hr'
      case 'Business':
        return 'business'
      case 'Integrated Technology':
        return 'it'
      case 'Wholesale':
        return 'wholesale'
      default:
        return 'business'
    }
  }

  setStateForUnit(unit, value) {
    this.setState({ [unit]: value })
    // console.log(this.state)
  }

  componentWillReceiveProps(props) {
    if (this.props.role === 'unit') {
      // here goes logic for unit dashboards
    } else {
      // here goes logic for organizer and presenter dashboards
    }
  }

  render() {
    const { classes } = this.props;
    let organizerDashboards;
    let charts;
    if (this.props.organizeUnitCards.length > 0) {
      // map units
      organizerDashboards = this.props.organizeUnitCards.map((element, index) => {
        return (
          <GridItem xs={12} sm={12} md={12} key={index}>
            <Card>
              <CardHeader color="info" stats icon>
                <div>
                  <img className={classes.unitIcon} src={'/' + index + '.png'}></img>
                </div>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={8}>
                    <div style={{ paddingTop: '15px', fontSize: '1.25em' }}>
                      Approved
                  </div>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <h4 className={classes.fileCounterG}>{element.count.approved}</h4>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={6} md={8}>
                    <div style={{ paddingTop: '15px', fontSize: '1.25em' }}>
                      Rejected
                  </div>
                  </GridItem>
                  <GridItem xs={12} sm={6} md={4}>
                    <h4 className={classes.fileCounterR}>{element.count.rejected}</h4>
                  </GridItem>
                </GridContainer>
              </CardBody>
              <div style={{ borderTop: '1px solid #eee', padding: '5px' }}></div>
              <GridContainer>
                <GridItem xs={12} sm={6} md={1}>
                  <div>
                    <img className={classes.unitImg} src={'/' + element.unit + '.png'}></img>
                  </div>
                </GridItem>
                <GridItem xs={12} sm={6} md={10}>
                  <div style={{ marginLeft: '10px' }}>
                    {element.unit}
                  </div>
                </GridItem>
              </GridContainer>
            </Card>
          </GridItem>
        )
      })
      // map charts
        charts = this.props.organizeUnitCards.map((element, index) => {
          // console.log(element.unit)
          let color = this.state[this.convertUnitName(element.unit)] ? 'success' : 'danger';
          return (
            <GridItem xs={12} sm={12} md={12} key={index}>
              <Card chart>
                <CardHeader color={color}>
                  <ChartistGraph
                    className="ct-chart"
                    data={this.state[this.convertUnitName(element.unit)] ? this.props.unitCharts[this.convertUnitName(element.unit)]['approved'] : this.props.unitCharts[this.convertUnitName(element.unit)]['approved']}
                    type="Line"
                    options={dailySalesChart.options}
                    listener={dailySalesChart.animation}
                  />
                </CardHeader>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={6} md={window.innerWidth < 1500 ? 7 : 8}>
                      <div style={{ paddingTop: '15px', fontSize: '1.25em', color: 'greed', cursor: 'pointer' }} onClick={() => this.setStateForUnit(this.convertUnitName(element.unit), true)}>
                        Approved
                  </div>
                    </GridItem>
                    <GridItem xs={12} sm={6} md={window.innerWidth < 1500 ? 5 : 4}>
                      <div style={{ paddingTop: '15px', fontSize: '1.25em', color: 'red', cursor: 'pointer' }} onClick={() => this.setStateForUnit(this.convertUnitName(element.unit), false)}>
                        Rejected
                  </div>
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter chart>
                  {element.unit}
                </CardFooter>
              </Card>
            </GridItem>
          )
        })
    }
    const {
      activeItemIndexCharts,
      activeItemIndexIcons,
      children,
    } = this.state
    return (
      <div>
        {this.props.role != 'unit' ?
          <div>
            {this.props.organizeUnitCards.length > 0 ?
            <div>
            {/* SWIPE ICONS */}
              <ItemsCarousel
                // Placeholder configurations
                enablePlaceholder
                numberOfPlaceholderItems={5}
                minimumPlaceholderTime={1000}
                placeholderItem={<GridContainer />}

                // Carousel configurations
                numberOfCards={window.innerWidth < 1500 ? 3 : 4}
                gutter={20}
                showSlither={true}
                firstAndLastGutter={true}
                freeScrolling={false}

                // Active item configurations
                requestToChangeActive={this.changeActiveItemIcons}
                activeItemIndex={activeItemIndexIcons}
                activePosition={'center'}

                chevronWidth={24}
                rightChevron={<ArrowCarousel arrow={'>'} />}
                leftChevron={<ArrowCarousel arrow={'<'} />}
                outsideChevron={false}
              >
                {organizerDashboards}
              </ItemsCarousel> 

            {/* SWIPE CHARTS */}
              <ItemsCarousel
                // Placeholder configurations
                enablePlaceholder
                numberOfPlaceholderItems={5}
                minimumPlaceholderTime={1000}
                placeholderItem={<GridContainer />}

                // Carousel configurations
                numberOfCards={3}
                gutter={20}
                showSlither={true}
                firstAndLastGutter={true}
                freeScrolling={false}

                // Active item configurations
                requestToChangeActive={this.changeActiveItemCharts}
                activeItemIndex={activeItemIndexCharts}
                activePosition={'center'}

                chevronWidth={24}
                rightChevron={<ArrowCarousel arrow={'>'} />}
                leftChevron={<ArrowCarousel arrow={'<'} />}
                outsideChevron={false}
              >
                {charts}
              </ItemsCarousel> </div> : null}
          </div> :
          // ########### UNIT DASHBOARD ##########
          <div>
            <GridContainer>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="success" icon>
                    <CardIcon color="success">
                      {/* <Icon>credit_card</Icon> */}
                      <div style={{ width: '150px', height: '150px' }}>
                        <img style={{ width: '100px', height: '100px', marginLeft: '18%', marginTop: '10%' }} src={'/document-icon.png'}></img>
                      </div>
                    </CardIcon>
                    {/* <p className={classes.cardCategory}>Accepted</p> */}
                    <div className={classes.cardRow}>
                      <div style={{ marginLeft: '25%' }} className={classes.inline}>
                        <h3 className={classes.textAlignRight}>This Month  </h3>
                      </div>
                      <div className={classes.inline}>
                        <h4 className={classes.fileCounterG}>{this.props.dashboard.unitMonthly.approved}</h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                    {/* <div className={classes.cardRow}>
                      <div className={classes.inline}>
                        <h3 className={classes.textAlignRight}>This Month  </h3>
                      </div>
                      <div className={classes.inline}>
                        <h4 className={classes.fileCounterG}>{this.props.dashboard.unitMonthly.approved}</h4>
                      </div>
                    </div> */}
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <h3>Approved Docs </h3>
                    </div>
                    <div style={{ background: 'green', color: 'white', paddingLeft: '8px', paddingRight: '8px' }}>
                      {this.props.dashboard.unitTotal.approved}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={6} md={4}>
                <Card>
                  <CardHeader color="danger" icon>
                    <CardIcon color="danger">
                      <div style={{ width: '150px', height: '150px' }}>
                        <img style={{ width: '100px', height: '100px', marginLeft: '18%', marginTop: '10%' }} src={'/document-icon.png'}></img>
                      </div>
                    </CardIcon>
                    <div className={classes.cardRow}>
                      <div style={{ marginLeft: '25%' }} className={classes.inline}>
                        <h3 className={classes.textAlignRight}>This Month  </h3>
                      </div>
                      <div className={classes.inline}>
                        <h4 className={classes.fileCounterR}>{this.props.dashboard.unitMonthly.rejected}</h4>
                      </div>
                    </div>
                  </CardHeader>
                  <CardBody>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      <h3>Rejected Docs  </h3>
                    </div>
                    <div style={{ background: 'red', color: 'white', paddingLeft: '8px', paddingRight: '8px' }}>
                      {this.props.dashboard.unitTotal.rejected}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
            {/* CHARTS #################################################################### */}
            <GridContainer>
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="success">
                    <ChartistGraph
                      className="ct-chart"
                      data={this.props.unitCharts[this.convertUnitName(this.props.unit)]['approved'] }
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 style={{ color: 'green' }} className={classes.cardTitle}>Approved</h4>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      {this.props.unit.toUpperCase()}
                    </div>
                    <div style={{ background: 'green', color: 'white', paddingLeft: '8px', paddingRight: '8px' }}>
                      {this.props.dashboard.unitTotal.approved}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
              {/* <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <ChartistGraph
                      className="ct-chart"
                      data={emailsSubscriptionChart.data}
                      type="Bar"
                      options={emailsSubscriptionChart.options}
                      responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                      listener={emailsSubscriptionChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4  style={{color: 'red'}} className={classes.cardTitle}>Rejected</h4>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      {this.props.unit.toUpperCase()}
                    </div>
                    <div  style={{background: 'red', color: 'white', paddingLeft: '8px', paddingRight: '8px'}}>
                      {this.props.dashboard.unitMonthly.rejected}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem> */}
              <GridItem xs={12} sm={12} md={4}>
                <Card chart>
                  <CardHeader color="danger">
                    <ChartistGraph
                      className="ct-chart"
                      data={this.props.unitCharts[this.convertUnitName(this.props.unit)]['rejected']}
                      type="Line"
                      options={dailySalesChart.options}
                      listener={dailySalesChart.animation}
                    />
                  </CardHeader>
                  <CardBody>
                    <h4 style={{ color: 'red' }} className={classes.cardTitle}>Rejected</h4>
                  </CardBody>
                  <CardFooter chart>
                    <div className={classes.stats}>
                      {this.props.unit.toUpperCase()}
                    </div>
                    <div style={{ background: 'red', color: 'white', paddingLeft: '8px', paddingRight: '8px' }}>
                      {this.props.dashboard.unitTotal.rejected}
                    </div>
                  </CardFooter>
                </Card>
              </GridItem>
            </GridContainer>
          </div>}
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    role: state.activeUser.role,
    unit: state.activeUser.unit,
    dashboard: state.dashboard,
    organizeUnitCards: state.dashboard.organizerUnits,
    unitCharts: state.dashboard.unitCharts,
    loggedIn: state.activeUser.loggedIn
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getDashboardValues: getDashboardValues,
    getUnitDashboardValues: getUnitDashboardValues,
    getChartValuePerUnit: getChartValuePerUnit
  }, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(withStyles(dashboardStyle)(Dashboard)))
