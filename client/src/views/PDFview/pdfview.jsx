import React, { Component} from "react";
import PSPDFKit from "./pdfkit.component.js";
import "./App.css";

const LICENSE_KEY ='UaH3yUxXbg8Wi03EbkOJ3ls8x5PgESFP4_YppNUJ5on_ONozNcHoXQeVZ-gyYcuoSTrYjR3QMjmyoLdqkaMn5HQ3I850QyjNnzhsuZV6-luYuSzXF5u9ovjJsWdSihOe9zlFbB68LRCCNdX3z_FNNbteUbH7zh197GdN5aUVcMGIDOzJ7XAzDaBAVY0xip4wXbZODWweNLalzsM21SroNgFNxz11JPArf7X8JLyFtTr7DKDcpY2mhKdvgtt6dRS_JsMIdbNcMBZYLmuUMNQ14gJckfIWQEwnEGs4rU6Qsm9-HGXvjMRClQkGCc2OMFRbeqmjjgG3evQ2MVkkCVKiMt0abqBYgzXqt3iRsDtQ4qdz1Ode7SiZ-m8_VhWtjYPOSsWXu9i6CDDxNpRF7Za8jwtSmblIO5Iy1DbqkerbEL8pndQ8cMckPIA_yzs5AorF'

if (!LICENSE_KEY || LICENSE_KEY === "YOUR_LICENSE_KEY_GOES_HERE") {
  throw new Error(`No or invalid PSPDFKit license key found.
Please open package.json and assign it to REACT_APP_PSPDFKIT_LICENSE_KEY.
To request a trial license, please go to:
  https://pspdfkit.com/try/.
After requesting a trial license, you can find your license key by opening the
link in the email and going to:
  https://pspdfkit.com/guides/web/current/standalone/integration/#toc_example-application`);
} else if (LICENSE_KEY.length < 120) {
  throw new Error(`The supplied PSPDFKit license key is too short.
This usually happens when using the NPM_KEY instead of the LICENSE_KEY.
After requesting a trial license, you can find your license key by opening the
link in the email and going to:
  https://pspdfkit.com/guides/web/current/standalone/integration/#toc_example-application`);
}

const baseUrl = `${window.location.protocol}//${window.location.host}/`;
// const baseUrl = 'http://localhost:3001/'

class Pdfview extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      pdf: "bogi.pdf"
    };
    // this.child = React.createRef();
    this.child;
    this.openAnother = this.openAnother.bind(this);
  }

  openAnother() {
    this.setState({
      pdf: "example.pdf"
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-viewer">
          <PSPDFKit
           ref={this.child}
            pdfUrl={this.props.pdf}
            file={this.props.file}
            licenseKey={LICENSE_KEY}
            baseUrl={baseUrl}
          />
        </div>

      </div>
    );
  }
}

export default Pdfview;