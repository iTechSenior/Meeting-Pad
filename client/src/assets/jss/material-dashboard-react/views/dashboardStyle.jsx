import { successColor } from "assets/jss/material-dashboard-react.jsx";

const dashboardStyle = {
  successText: {
    color: successColor
  },
  upArrowCardCategory: {
    width: "16px",
    height: "16px"
  },
  stats: {
    color: "#999999",
    display: "inline-flex",
    fontSize: "12px",
    lineHeight: "22px",
    "& svg": {
      top: "4px",
      width: "16px",
      height: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    },
    "& .fab,& .fas,& .far,& .fal,& .material-icons": {
      top: "4px",
      fontSize: "16px",
      position: "relative",
      marginRight: "3px",
      marginLeft: "3px"
    }
  },
  cardCategory: {
    color: "#999999",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    paddingTop: "10px",
    marginBottom: "0"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitle: {
    color: "#3C4858",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
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
      fontWeight: "400",
      lineHeight: "1"
    }
  },

  // custom classes
  textAlignRight: {
    color: "#3C4858",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    display: 'inline-block', 
    "& small": {
      color: "#777",
      fontWeight: "400",
      lineHeight: "1"
    }
  },

  fileCounterR: {
    // border: '2px solid red',
    background: 'red',
    color: 'white',
    'font-weight': '500',
    margin: '10px',
    padding: '5px 5px 1px 5px',
  },

  fileCounterG: {
    // border: '2px solid green',
    background: 'green',
    color: 'white',
    'font-weight': '500',
    margin: '10px',
    padding: '5px 5px 1px 5px',
  },

  cardRow: {
    // 'text-align': 'right'
  },

  inline: {
    display: 'inline-block'
  },
  inlineRight: {
    display: 'inline-block',
    float: 'right'
  },
  textCenter: {
    // 'margin-left': '25%',
    color: "#999999"
  },

  monthlyChart: {
    color: 'black',
    'text-align': 'center',
    'font-size': '25px',
    'font-weight': '400'
  },
  unitImg: {
    width: '20px', height: '20px', background: 'blue', marginLeft: '10px'
  },
  unitIcon: {
    width: '100px',
    height: '100px',
    'margin-top': '-20px'
  }
};

export default dashboardStyle;
