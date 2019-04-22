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
import { getDocumentsForUnit, unpackFileForPSPDFKit, setStatusToDocument, changeStatusToInfo, addMinutesOfMeeting } from '../../store/actions/documents';
import Pdfview from "../PDFview/pdfview";

// import * as css from '../upload-file/test.css'

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
  },
  buttonImgSize: {
    width: '40px',
    height: '40px',
    cursor: 'pointer',
    margin: '.3125rem 1px'
  }
};

class NewDocuments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'pending',
      files: [],
      searchedFiles: [],
      viewElement: "kurac bre",
      pendingRequest: "kkkkkk",
      showMinutesOfMeetig: '',
      title: '',
      minutes: ''
    }
    this.editFile = this.editFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.searchHandler = this.searchHandler.bind(this)
  }

  componentWillMount() {
    this.props.getDocumentsForUnit({
      status: this.state.status,
      unit: this.props.unit.toLowerCase()
    })
  }

  editFile(id) {
    this.props.unpackFileForPSPDFKit(id)
    this.setState({ pendingRequest: id, viewElement: '' });
  }

  setFileStatus(id) {

  }

  openMinutesOfMeetingEdit(id) {
    this.setState({ showMinutesOfMeetig: id, viewElement: '' })
  }

  acceptFile(id) {
    // accept file with id
    console.log(id)
    this.props.setStatusToDocument(id, 'approved')
  }

  rejectFile(id) {
    // reject file with id
    console.log(id)
    this.props.setStatusToDocument(id, 'rejected')
  }

  saveForMeeting(id) {
    // save file for meeting
    console.log(id)
  }

  askForMoreInfo(id) {
    // ask for more info
    console.log(id)
    this.props.changeStatusToInfo(id)
  }

  saveMinutesOfMeeting(id) {
    // save minutes of meeting
    this.props.addMinutesOfMeeting(id, this.state.minutes)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
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
      this.setState({ viewElement: this.state.pendingRequest, title: event.document.filename, showMinutesOfMeetig: '' })
    }
    if (event.closeDocument) {
      this.setState({ viewElement: 'random string' })
    }
    if (event.files) {
      this.setState({ files: event.files, searchedFiles: event.files })
    }
  }
  render() {
    const { classes } = this.props;
    let files = this.state.searchedFiles.map((element, index) => {
      return (
        <GridContainer key={index}>
          <GridItem xs={12} sm={12} md={2}>
            <br></br>
            <span>{element.title}</span>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <br></br>
            <InputLabel>{element.summary}</InputLabel>
          </GridItem>
          <GridItem xs={12} sm={12} md={1}>
            {/* <Button color="info" onClick={() => this.editFile(element._id)}>Anotate</Button> */}
            <div>
              <img className={classes.buttonImgSize} title="Annotate" onClick={() => this.editFile(element._id)} src={'/annotate.png'}></img>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={1} style={{ display: this.props.role === "presenter" ? 'inline' : 'none' }}>
            {/* <Button color="success" onClick={() => this.acceptFile(element._id)} >Accept</Button> */}
            <div>
              <img className={classes.buttonImgSize} title="Approve" onClick={() => this.acceptFile(element._id)} src={'/approved.png'}></img>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={1} style={{ display: this.props.role === "presenter" ? 'inline' : 'none' }}>
            {/* <Button color="danger" onClick={() => this.rejectFile(element._id)} >Reject</Button> */}
            <div>
              <img className={classes.buttonImgSize} title="Reject" onClick={() => this.rejectFile(element._id)} src={'/reject.png'}></img>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={1} style={{ display: this.props.role === "presenter" ? 'inline' : 'none' }}>
            {/* <Button color="warning" onClick={() => this.openMinutesOfMeetingEdit(element._id)} >Minutes of meeting</Button> */}
            <div>
              <img className={classes.buttonImgSize} title="Add minutes of meeting" onClick={() => this.openMinutesOfMeetingEdit(element._id)} src={'/minutesofmeeting.png'}></img>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={1} style={{ display: this.props.role === "organizer" ? 'inline' : 'none' }}>
            {/* <Button color="success" onClick={() => this.saveForMeeting(element._id)} >Save for meeting</Button> */}
            <div>
              <img className={classes.buttonImgSize} title="Save for meeting" onClick={() => this.saveForMeeting(element._id)} src={'/save-for-meeting.png'}></img>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={1} style={{ display: this.props.role === "organizer" ? 'inline' : 'none' }}>
            {/* <Button color="warning" onClick={() => this.askForMoreInfo(element._id)} >Ask for more info</Button> */}
            <div>
              <img className={classes.buttonImgSize} title="Additional info" onClick={() => this.askForMoreInfo(element._id)} src={'/additional-info.png'}></img>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ display: this.state.viewElement === element._id ? 'inline' : 'none' }}>
            <Pdfview pdf={this.state.viewElement === element._id ? this.state.title : ''} file={element} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12} style={{ display: this.state.showMinutesOfMeetig === element._id ? 'inline' : 'none' }}>
            <textarea
              id="minutes"
              name="minutes"
              onChange={this.handleChange}
              placeholder="Write minutes of meeting"
              rows="4" cols="50">
            </textarea>
            <Button color="success" onClick={() => this.saveMinutesOfMeeting(element._id)} >Save</Button>
          </GridItem>
        </GridContainer>
      )
    })
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>New documents</h4>
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
  return {
    role: state.activeUser.role,
    unit: state.activeUser.unit,
    document: state.documents.document,
    files: state.documents.files,
    closeDocument: state.documents.closeDocument
  }
}

function matchDispatchToProps(dispatch) {
  return bindActionCreators({
    getDocumentsForUnit: getDocumentsForUnit,
    unpackFileForPSPDFKit: unpackFileForPSPDFKit,
    setStatusToDocument: setStatusToDocument,
    changeStatusToInfo: changeStatusToInfo,
    addMinutesOfMeeting: addMinutesOfMeeting
  }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(NewDocuments))
