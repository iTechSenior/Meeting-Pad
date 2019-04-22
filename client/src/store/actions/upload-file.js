import axios from 'axios';
import { API, FILE_UPLOADED, FILE_UPLOAD_FAILED } from '../constants';
import {store} from '../storePersistor';
import {toastr} from 'react-redux-toastr'

export function uploadFile(data){
  return function (dispatch) {
    axios.defaults.headers.common['Authorization'] = store.getState().activeUser.token;
    axios.post(API + '/api/documents', data, )
    .then((response)=>{
      toastr.success('File', 'Uploaded!')
      dispatch({type: FILE_UPLOADED, payload: response.data});
    }).catch((error)=>{
      toastr.error('File', 'Upload failed!')
      dispatch({type: FILE_UPLOAD_FAILED, payload: error});
    })
  }
}
