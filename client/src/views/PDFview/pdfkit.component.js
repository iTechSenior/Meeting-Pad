import React, { Component } from "react";
import PSPDFKitWeb from "pspdfkit";
import Button from "components/CustomButtons/Button.jsx";

// cvoro
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { saveDocument, closeDocumentEdit  } from '../../store/actions/documents';
import {toastr} from 'react-redux-toastr'

class PSPDFKit extends Component {
  constructor(props, context) {
    super(props, context);
    this._instance = null;
    this._container = null;

    this.onRef = this.onRef.bind(this);
    this.load = this.load.bind(this);
    this.unload = this.unload.bind(this);
    this.upload = this.upload.bind(this)
    this.savePDF = this.savePDF.bind(this)
  }

  onRef(container) {
    this._container = container;
  }

  async load(props) {
    this.unload();
    if(props.pdfUrl != "") {
      console.log(`Loading ${props.pdfUrl}`);
      this._instance = await PSPDFKitWeb.load({
        pdf: props.pdfUrl,
        container: this._container,
        licenseKey: props.licenseKey,
        baseUrl: props.baseUrl  
      });
      console.log("Successfully mounted PSPDFKit", this._instance);
    }

  }

  savePDF() {
    this._instance.exportPDF().then((buffer) => {
        let a = document.createElement("a");
        let blob = new Blob([buffer], { type: "application/pdf" });
        let formData = new FormData();
        formData.append('file', blob, this.props.file.filename);
        this.upload(formData)
      });
  }

  cancelPdf() {
    toastr.warning('Document', 'Edit canceled')
    this.props.closeDocumentEdit()
  }

  upload(data) {
    this.props.saveDocument(this.props.file._id, data)
  }

  unload() {
    PSPDFKitWeb.unload(this._instance || this._container);
    this._instance = null;
  }

  componentDidMount() {
    this.load(this.props);
  }

  componentDidUpdate(prevProps) {
    const nextProps = this.props;
    // We only want to reload the document when the pdfUrl prop changes.
    if (nextProps.pdfUrl !== prevProps.pdfUrl) {
      this.unload();
      this.load(nextProps);
    }
  }

  componentWillUnmount() {
    this.unload();
  }

  render() {
    return (
    <div>
        
      <div
        ref={this.onRef}
        style={{ width: "100%", height: "100%", position: "absolute" }}
      />
      <div style={{ paddingTop: '92vh'}} >
        <Button color="success" onClick={() => this.savePDF()} >Save</Button>
      <Button color="warning" onClick={() => this.cancelPdf()} >Cancel</Button>
      </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return{
    loggedIn: state.activeUser.loggedIn
  }
}

function matchDispatchToProps(dispatch) {
return bindActionCreators({
  saveDocument: saveDocument,
  closeDocumentEdit: closeDocumentEdit
}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(PSPDFKit)