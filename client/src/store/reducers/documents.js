import { FETCH_FILES_SUCCESS, STATUS_TO_CHANGED, FETCH_FILES_FAILED, FILE_UNZIPED, FILE_UPLOADED, FILE_UPLOAD_FAILED, CLOSE_DOCUMENT_EDIT } from "../constants";

// "state = null" is set so that we don't throw an error when app first boots up

let documents = {
    files: [],
    unit: '',
    document: {},
    success: null,
    closeDocument: false
}
export default function (state = documents, action) {
    switch (action.type) {
        case FETCH_FILES_SUCCESS:
            return {...state, files: action.payload.documents, unit: action.payload.unit};
        case FETCH_FILES_FAILED: 
            return {...state, files: [], unit: ''}
        case FILE_UNZIPED:
            return {...state, document: action.payload, closeDocument: false}
        case FILE_UPLOADED:
            return {...state, success: true}
        case FILE_UPLOAD_FAILED:
            return {...state, success: false}
        case CLOSE_DOCUMENT_EDIT:
            return {...state, closeDocument: true}
        case STATUS_TO_CHANGED:
            let files = state.files.filter(element => element._id != action.payload)
            return {...state, files}
        default:
            break;
    }
    return state;
}