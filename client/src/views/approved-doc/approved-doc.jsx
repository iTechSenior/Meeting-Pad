import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";

import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import InputLabel from "@material-ui/core/InputLabel";

// cvoro
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { getDocumentsForUnit } from '../../store/actions/documents';

const style = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};
class ApprovedDoc extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      status: 'approved',
      files: [],
      searchedFiles: [],
      viewElement: "kurac bre",
      pendingRequest: "kkkkkk",
      title: ''
    }
    this.editFile = this.editFile.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
  }

  componentWillMount() {
    //call api
    this.props.getDocumentsForUnit({
      status: this.state.status,
      unit: this.props.unit.toLowerCase()
    })
  }

  editFile(id) {
    this.setState({pendingRequest: id});
    this.props.unpackFileForPSPDFKit(id)
  }

  setFileStatus(id) {

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
    if (event.document && event.document.filename !== undefined && event.document._id === this.state.pendingRequest) {
      this.setState({viewElement: this.state.pendingRequest, title: event.document.filename});
    }
    if (event.files) {
      this.setState({ files: event.files, searchedFiles: event.files })
    }
  }

  render() {
  const { classes } = this.props;
  let files = this.state.searchedFiles.map((element, index)=>{
    return(
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
            <h4 className={classes.cardTitleWhite}>Approved doc</h4>
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

function mapStateToProps(state) {
  return{
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

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(style)(ApprovedDoc))
