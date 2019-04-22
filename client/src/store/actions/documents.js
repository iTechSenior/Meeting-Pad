import axios from 'axios';
import { API, FETCH_FILES_SUCCESS, FETCH_FILES_FAILED, FILE_UNZIPED, FILE_UNZIP_FAILED, STATUS_TO_INFO_CHANGED, STATUS_TO_INFO_FAILED, STATUS_TO_CHANGED, STATUS_CHANGE_FAILED, MINUTES_OF_MEETING_ADDED, MINUTES_OF_MEETING_FAILED, UNIT_DASHBOARD_RECEIVED, UNIT_DASHBOARD_FAILED, FILE_UPDATED, FILE_UPDATE_FAILED, ORGANIZER_DASHBOARD_RECEIVED, ORGANIZER_DASHBOARD_FAILED, BUSINESS_CHART_ARIVED, IT_CHART_ARIVED, HR_CHART_ARIVED, WHOLESALE_CHART_ARIVED, FINANCE_CHART_ARIVED, DASHBOARD_CHART_UNIT_FAILED, CLOSE_DOCUMENT_EDIT } from '../constants';
// cvoro
import { store } from '../storePersistor';
import { toastr } from 'react-redux-toastr'

export function getDocumentsForUnit(data) {
  return function (dispatch) {
    axios.get(API + '/api/units/' + data.unit + '/' + data.status, { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        dispatch({ type: FETCH_FILES_SUCCESS, payload: { documents: response.data, unit: data.unit } });
      }).catch((error) => {
        dispatch({ type: FETCH_FILES_FAILED, payload: error });
      })
  }
}

export function unpackFileForPSPDFKit(id) {
  return function (dispatch) {
    // axios.get(API + '/api/documents/' + id,  {headers: {"Authorization" : store.getState().activeUser.token}})
    // .then((response)=>{
    //   dispatch({type: FILE_UNZIPED, payload: response.data});
    // }).catch((error)=>{
    //   dispatch({type: FILE_UNZIP_FAILED, payload: error});
    // })
    fetch(API + '/api/documents/' + id, { headers: { "Authorization": store.getState().activeUser.token } })
      .then(response => response.json())
      .then(
        data =>
          dispatch({ type: FILE_UNZIPED, payload: data })
      )
      .catch(error => dispatch({ type: FILE_UNZIP_FAILED, payload: error }));
  }
}


// document actions
export function changeStatusToInfo(id) {
  return function (dispatch) {
    axios.put(API + '/api/documents/info', { _id: id }, { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        toastr.success('Document', 'Status to info changed!')
        dispatch({ type: STATUS_TO_INFO_CHANGED, payload: response.data });
      }).catch((error) => {
        toastr.error('Document', 'Status to info failed!')
        dispatch({ type: STATUS_TO_INFO_FAILED, payload: error });
      })
  }
}

export function closeDocumentEdit() {
  return function (dispatch) {
    dispatch({ type: CLOSE_DOCUMENT_EDIT, payload: null });
  }
}

export function setStatusToDocument(id, status) {
  return function (dispatch) {
    axios.put(API + '/api/documents/' + id, { status: status }, { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        toastr.success('Document', 'Status changed to' + status +'!')
        dispatch({ type: STATUS_TO_CHANGED, payload: id });
      }).catch((error) => {
        toastr.error('Document', 'Status change failed!')
        dispatch({ type: STATUS_CHANGE_FAILED, payload: error });
      })
  }
}

export function addMinutesOfMeeting(id, minutes) {
  return function (dispatch) {
    axios.post(API + '/api/documents/minuts', { minutes: minutes, _id: id }, { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        toastr.success('Minuts of meeting', 'Added!')
        dispatch({ type: MINUTES_OF_MEETING_ADDED, payload: response.data });
      }).catch((error) => {
        toastr.error('Minuts of meeting', 'Add failed!')
        dispatch({ type: MINUTES_OF_MEETING_FAILED, payload: error });
      })
  }
}


// dashboard per unit
export function getUnitDashboardValues(unit) {
  return function (dispatch) {
    axios.get(API + '/api/units/' + unit, { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        dispatch({ type: UNIT_DASHBOARD_RECEIVED, payload: response.data });
      }).catch((error) => {
        dispatch({ type: UNIT_DASHBOARD_FAILED, payload: error });
      })
  }
}

// chart per unit
export function getChartValuePerUnit(unit) {
  return function (dispatch) {
    axios.get(API + '/api/units/week/' + unit, { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        switch (unit) {
          case 'business':
            dispatch({ type: BUSINESS_CHART_ARIVED, payload: { data: response.data, unit: unit } });
            break;
          case 'it':
            dispatch({ type: IT_CHART_ARIVED, payload: { data: response.data, unit: unit } });
            break;
          case 'hr':
            dispatch({ type: HR_CHART_ARIVED, payload: { data: response.data, unit: unit } });
            break;
          case 'wholesale':
            dispatch({ type: WHOLESALE_CHART_ARIVED, payload: { data: response.data, unit: unit } });
            break;
          case 'finance':
            dispatch({ type: FINANCE_CHART_ARIVED, payload: { data: response.data, unit: unit } });
            break;
          default:
            break;
        }
      }).catch((error) => {
        toastr.error('Dashboard', 'Fetching charts failed!')
        dispatch({ type: DASHBOARD_CHART_UNIT_FAILED, payload: error });
      })
  }
}

// dashboard for organizer and presenter
export function getDashboardValues() {
  return function (dispatch) {
    axios.get(API + '/api/dashboard', { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        dispatch({ type: ORGANIZER_DASHBOARD_RECEIVED, payload: response.data });
      }).catch((error) => {
        dispatch({ type: ORGANIZER_DASHBOARD_FAILED, payload: error });
      })
  }
}

// document save
export function saveDocument(id, file) {
  return function (dispatch) {
    axios.put(API + '/api/documents/save/' + id, file, { headers: { "Authorization": store.getState().activeUser.token } })
      .then((response) => {
        toastr.success('Document', 'Saved!')
        dispatch({ type: FILE_UPDATED, payload: response.data });
      }).catch((error) => {
        toastr.error('Document', 'Failed!')
        dispatch({ type: FILE_UPDATE_FAILED, payload: error });
      })
  }
}