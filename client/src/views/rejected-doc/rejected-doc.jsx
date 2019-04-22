import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import Button from "components/CustomButtons/Button.jsx";
import InputLabel from "@material-ui/core/InputLabel";

import iconsStyle from "assets/jss/material-dashboard-react/views/iconsStyle.jsx";

// cvoro
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDocumentsForUnit } from '../../store/actions/documents';

class RejectedDoc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'rejected',
      files: [],
      searchedFiles: []
    }
    this.searchHandler = this.searchHandler.bind(this)
  }
  searchHandler(event) {
    let searcjQery = event.target.value.toLowerCase()
    let files = this.state.files.filter((el) => {
      let searchValue = el.title.toLowerCase();
      return searchValue.indexOf(searcjQery) !== -1;
    })
    this.setState({
      searchedFiles: files
    })
  }
  componentWillReceiveProps(event) {
    if (event.files) {
      this.setState({ files: event.files, searchedFiles: event.files })
    }
  }
  render() {
    const { classes } = this.props;
    let files = this.state.searchedFiles.map((element, index) => {
      return (
        <GridContainer key={index}>
          <GridItem xs={12} sm={12} md={4}>
            <br></br>
            <span>{element.title}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={8}>
            <br></br>
            <InputLabel>{element.summary}</InputLabel>
          </GridItem>
        </GridContainer>
      )
    })
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Rejected doc</h4>
              <p className={classes.cardCategoryWhite}>
          </p>
            </CardHeader>
            <CardBody>
            <GridContainer key={0}>
                <GridItem xs={12} sm={12} md={12}>
                  <input placeholder="Search documents" onChange={this.searchHandler}></input>
                </GridItem>
              </GridContainer>
              <br></br>
              {
                this.props.files.length <= 0 ?
                  <GridItem xs={12} sm={12} md={5}>
                    <span>No files in this category</span>
                  </GridItem> : files
              }
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

RejectedDoc.propTypes = {
  classes: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    role: state.activeUser.role,
    unit: state.activeUser.unit,
    document: state.documents.document,
    files: state.documents.files
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getDocumentsForUnit: getDocumentsForUnit
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(iconsStyle)(RejectedDoc))

