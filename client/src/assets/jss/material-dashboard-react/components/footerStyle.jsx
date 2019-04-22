import {
  defaultFont,
  container,
  primaryColor
} from "assets/jss/material-dashboard-react.jsx";

const footerStyle = {
  block: {
    color: "inherit",
    padding: "15px 65px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block",
    ...defaultFont,
    fontWeight: "500",
    fontSize: "12px"
  },
  left: {
    // float: "left!important",
    // display: "block",
    // 'padding-left': '25%'
    margin: '0 auto',
    // width: '1000px'
    width: '75vw'
  },
  right: {
    padding: "15px 0",
    margin: "0",
    fontSize: "14px",
    float: "right!important"
  },
  footer: {
    bottom: "0",
    // marginTop: '-180px',
    background: '#2791FE',
    zIndex: '1000000',
    position: 'fixed',
    left: '0',
    right: '0',
    ...defaultFont
  },
  container,
  a: {
    color: primaryColor,
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0",
    cursor: 'pointer'
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  noborder:{
    height: '50px',
    paddingRight: "100px"
  },
  item: {
    'vertical-align': 'top',
    display: 'inline-block',
    'text-align': 'center',
    // width: '200px',
    width: '15vw',
    'padding-top': '20px',
    borderRight: "1.5px solid #00acc1"
  },
  itemNoBorder: {
    'vertical-align': 'top',
    display: 'inline-block',
    'text-align': 'center',
    // width: '200px',
    width: '15vw',
    'padding-top': '20px'
  },
  img: {
    height: '30px'
  },
caption: {
    display: 'block',
    color: 'white'
},
Fcontainer: {
  marginLeft: 'auto',
  paddingLeft: '15px',
  marginRight: 'auto',
  paddingRight: '15px'
}
}

export default footerStyle;
