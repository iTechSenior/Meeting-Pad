import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
// core components
import footerStyle from "assets/jss/material-dashboard-react/components/footerStyle.jsx";

import business from "../../assets/img/unit-icons/business.png";
import fiance from "../../assets/img/unit-icons/fiance.png";
import hr from "../../assets/img/unit-icons/hr.png";
import integradettechnology from "../../assets/img/unit-icons/integrated-technology.png";
import wholesale from "../../assets/img/unit-icons/wholesale.png";

// cvoro
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setUnit } from '../../store/actions/login';

const activeStyle = {
  background: '#00acc1',
  borderRadius: '20px',
  marginTop: '-10px',
  height: '90px'
}

class Footer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeUnit: ''
    }
    
    this.unitActivated = this.unitActivated.bind(this)
  }

  componentWillMount() {
    if(this.props.unit !== undefined) {
      this.setState({activeUnit: this.props.unit})
    }
  }

  unitActivated(unitName) {
    console.log('aktiviran unit: '+unitName)
    this.props.setUnit(unitName)
    this.setState({activeUnit: unitName})
  }
  
  addColorIfActive(unit) {
    return (this.state.activeUnit === unit ? activeStyle : {})
  }
  
  render() {
  const { classes } = this.props;
  return (
    <footer className={classes.footer}>
      <div className={classes.Fcontainer}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem onClick={ () => this.unitActivated('business')} className={classes.inlineBlock}>
              <div className={classes.item} style={this.addColorIfActive('business')}>
                <img src={business}  className={classes.img}></img>
                <span className={classes.caption}>Business</span>
              </div>
            </ListItem>
            <ListItem onClick={ () => this.unitActivated('finance')} className={classes.inlineBlock}>
            <div className={classes.item} style={this.addColorIfActive('finance')}>
                <img src={fiance}  className={classes.img}></img>
                <span className={classes.caption}>Finance</span>
              </div>
            </ListItem>
            <ListItem onClick={ () => this.unitActivated('hr')} className={classes.inlineBlock}>
            <div className={classes.item} style={this.addColorIfActive('hr')}>
                <img src={hr}  className={classes.img}></img>
                <span className={classes.caption}>HR</span>
              </div>
            </ListItem>
            <ListItem onClick={ () => this.unitActivated('it')} className={classes.inlineBlock}>
            <div className={classes.item} style={this.addColorIfActive('it')}>
                <img src={integradettechnology}  className={classes.img}></img>
                <span className={classes.caption}>Intergrated Technology</span>
              </div>
            </ListItem>
            <ListItem onClick={ () => this.unitActivated('wholesale')} className={classes.inlineBlock}>
            <div className={classes.itemNoBorder} style={this.addColorIfActive('wholesale')}>
                <img src={wholesale}  className={classes.img}></img>
                <span className={classes.caption}>Wholesale</span>
              </div>
            </ListItem>
          </List>
        </div>
      </div>
    </footer>
  );
}
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    role: state.activeUser.role,
    unit: state.activeUser.unit,
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    setUnit: setUnit
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(footerStyle)(Footer))


