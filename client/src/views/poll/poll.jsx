import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InputLabel from "@material-ui/core/InputLabel";

// cvoro
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getDocumentsForUnit, unpackFileForPSPDFKit } from '../../store/actions/documents';
import * as poll from "./poll.css";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class Poll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      files: [],
      viewElement: "kurac bre",
      pendingRequest: "kkkkkk",
      title: ''
    }
  }

  componentWillMount() {

  }

  editFile(id) {
  }

  setFileStatus(id) {

  }

  componentWillReceiveProps(event) {

  }
  render() {
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Poll</h4>
              <p className={classes.cardCategoryWhite}>
              </p>
            </CardHeader>
            <CardBody>
              <div class="form-group">
                {/* <input type="text" required="required" ></input> */}
                <h1>Your feeling about meeting pad</h1>
                {/* <label for="input" class="control-label">Textfield</label><i class="bar"></i> */}
              </div>
              <div class="form-radio">
                <div class="radio">
                  <label>
                    <input type="radio" name="radio" checked="checked"></input><i class="helper"></i>I love meeting pad APP
                  </label>
                </div>
                <div class="radio">
                  <label>
                    <input type="radio" name="radio"></input><i class="helper"></i>I choose first option
                  </label>
                </div>
              </div>
              <Button color="success" >Vote</Button>
              <Button color="warning">Reset</Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}
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
    getDocumentsForUnit: getDocumentsForUnit,
    unpackFileForPSPDFKit: unpackFileForPSPDFKit
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Poll))
