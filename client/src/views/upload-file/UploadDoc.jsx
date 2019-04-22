import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import avatar from "assets/img/faces/marc.jpg";
// cvoro
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { uploadFile  } from '../../store/actions/upload-file';
import {toastr} from 'react-redux-toastr'
import * as css from './test.css'

const styles = {
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
  },
  firstInputWraper: {
    
  },
  secondInputWraper: {

  },
  
};

class UploadDoc extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      summary: '',
      file: null
    }
    this.chooseFile = this.chooseFile.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.setFileInstate = this.setFileInstate.bind(this);
  }

  chooseFile() {
    document.getElementById('file-btn').click();
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  uploadFile() {
    console.log('file uploaded')
    if(this.state.file !== null){
      let file = this.state.file[0];
      let formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('title', this.state.title);
      formData.append('summary', this.state.summary);
  
      this.props.uploadFile(formData)
    } else {
      window.alert("Select file first")
    }
  }

  setFileInstate(event) {
    console.log(event.target.files)
    this.setState({file: event.target.files});
  }

  componentWillReceiveProps(event) {
    // if(event.uploaded === true){
    //   toastr.success('File', 'Uploaded!')
    // }
    // if(event.uploaded === false){
    //   toastr.error('File', 'Upload failed!')
    // }
  }

  render() {
  const { classes } = this.props;
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Upload file</h4>
              <p className={classes.cardCategoryWhite}>Choose (doc, ppt or pdf) file and upload</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <br></br>
                    <input placeholder="Title" type="text"  id="title" name="title" onChange={this.handleChange}></input>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
              <textarea  
                  id="summary"
                  name="summary"
                  onChange={this.handleChange}
                  placeholder="Write document sumary"
                    rows="4" cols="50">
                </textarea>
            </GridItem>
            <GridItem xs={12} sm={12} md={3}>
                <br></br>
                <Button color="info" onClick={ () => this.chooseFile()}>Choose file</Button>
                <input id="file-btn" onChange={ ($event) => this.setFileInstate($event)} type="file" hidden></input>
                </GridItem>
                <GridItem xs={12} sm={12} md={9}>
                <br></br>
                {this.state.file != null ? <p>{this.state.file[0].name}</p> : <p>No file attached</p>}
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="info"  onClick={ () => this.uploadFile()}>Upload</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
}

function mapStateToProps(state) {
  return{
    loggedIn: state.activeUser.loggedIn,
    uploaded: state.documents.success
  }
}

function matchDispatchToProps(dispatch) {
return bindActionCreators({
  uploadFile: uploadFile,
}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(UploadDoc))

