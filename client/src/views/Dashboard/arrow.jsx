import React, { Component } from "react";

class ArrowCarousel extends Component {
    constructor(props, context) {
      super(props, context);
    }
  
    render() {
      return (
            <h1>{this.props.arrow}</h1>
      );
    }
  }
  
  export default ArrowCarousel;