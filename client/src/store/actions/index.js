import axios from 'axios';

export function videoByDate(date){
  return function (dispatch) {
    // axios.post('http://localhost:3001/api/videoDate', {date})
    // .then((response)=>{
    //   dispatch({type:'FETCH_VIDEOS_DATE_FULFILLED', payload: response.data});
    // }).catch((error)=>{
    //   dispatch({type:'FETCH_VIDEOS_DATE_REJECTED', payload: error});
    // })
  }
}