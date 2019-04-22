import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import logo from "assets/img/logo.png";

// cvoro
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import { mockLogin, login  } from '../../store/actions/login';
import { withRouter } from 'react-router-dom';
import {toastr} from 'react-redux-toastr'
import { getDashboardValues, getUnitDashboardValues, getChartValuePerUnit } from '../../store/actions/documents'

const styles = theme => ({
  main: {
    width: 'auto',
    // marginTop: '-100px',
    top: '-100px',
    position: 'relative',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      // marginLeft: 'calc((100% - 460px) / 2.9)',
      // marginRight: 'auto',
      margin:'0 auto'
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    backgroundColor: 'transparent',
    boxShadow: 'unset'
  },
  title: {
    fontSize: '34px',
    fontWeight: 'bold',
    color: '#726c6c',
    // marginBottom: theme.spacing.unit * 8
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    borderRadius: '50px',
    marginTop: theme.spacing.unit * 8,
    padding: '2px',
    boxShadow: '0 14px 54px 0 rgba(18,0,40,.18)',
    backgroundImage: 'linear-gradient(180deg,#ff9c00 21%,#a98732 43%,#08618f)',
    '&:hover': {
      marginTop: theme.spacing.unit * 8.2,
      transition: '.2s ease-in',
    }
  },
  submitBtn: {
    backgroundColor: 'white',
    borderRadius: '30px',
    padding: '21px 50px',
    width: '135px',
    height: '60px',
    color: '#726c6c',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: '16px',
    transition: '.2s ease-out',
      '&:hover': {
        width: '131px',
        height: '56px',
        backgroundColor: 'white',
        padding: '20px 49px',
        transition: '.2s ease-in',
      }
  }
});

class Login extends React.Component {
  // const { classes } = props;
  constructor(props) {
    super(props);
    this.state = {
      userid: '',
      password: ''
    }
    this.login = this.login.bind(this);
    this.handleChange = this.handleChange.bind(this)
  }
  // componentWillMount() {
  //   this.props.getChartValuePerUnit('business')
  //   this.props.getChartValuePerUnit('wholesale')
  //   this.props.getChartValuePerUnit('it')
  //   this.props.getChartValuePerUnit('hr')
  //   this.props.getChartValuePerUnit('finance')
  // }

  login() {
    if(this.state.userid === '' || this.state.password === '') {
      toastr.warning('Login', 'Enter username and password!')
    }
    this.props.login({
      email: this.state.userid,
      password: this.state.password
    });
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  componentWillReceiveProps(props) {
    if(props.loggedIn) {
      toastr.success('Login', 'Success!')
    } else {
      toastr.error('Login', 'Failed!')
    }
  }

  render() {
    const { classes } = this.props;
  return (
    <main className={classes.main}>
      <Paper className={classes.paper}>
        <Grid container spacing={24}>
          <Grid item xs={12} className={classes.logo}>
            <img src={logo} alt="MeetingPad logo" />
          </Grid>
          <Grid item xs={12}>
            <Typography component="h1" className={classes.title} align="center"> Login </Typography>
          </Grid>
        </Grid>

        <form className={classes.form}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="userid">User ID</InputLabel>
            <Input id="userid" name="userid" autoComplete="userid" autoFocus value={this.state.value} onChange={this.handleChange}  />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" value={this.state.value} onChange={this.handleChange}/>
          </FormControl>
          <Grid container spacing={24} alignItems="center" justify="center">
            <div className={classes.submit}>
              <Button type="button" className={classes.submitBtn} onClick={ () => this.login()}> Login </Button>
            </div>
          </Grid>
        </form>
      </Paper>
    </main>
  );
}
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return{
    loggedIn: state.activeUser.loggedIn
  }
}

function matchDispatchToProps(dispatch) {
return bindActionCreators({
  login: login,
  // getChartValuePerUnit: getChartValuePerUnit
}, dispatch)
}

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(withStyles(styles)(Login)))