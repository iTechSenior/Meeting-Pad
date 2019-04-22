import axios from 'axios';
import { LOGGED_IN, LOGGIN_FAILED, API, SET_UNIT,LOG_OUT } from '../constants';
import {toastr} from 'react-redux-toastr'

export function login(data){
  return function (dispatch) {
    axios.post(API + '/api/auth/login', data)
    .then((response)=>{
      toastr.success('Login', 'Success!')
      dispatch({type: LOGGED_IN, payload: response.data});
    }).catch((error)=>{
      toastr.error('Login', 'Failed!')
      dispatch({type: LOGGIN_FAILED, payload: error});
    })
  }
}

// export function mockLogin(){
//   return function (dispatch) {
//     dispatch({type: LOGGED_IN, payload: {role: 'ADMIN', token: 'TOKEN'}});
//   }
// }

export function logout(){
  return function (dispatch) {
    toastr.warning('Logged out', '')
    dispatch({type: LOG_OUT});
  }
} 

export function setUnit(data){
  return function (dispatch) {
    toastr.success('Unit', 'Changed!')
    localStorage.removeItem('persist:root')
    dispatch({type: SET_UNIT, payload: data});
  }
}