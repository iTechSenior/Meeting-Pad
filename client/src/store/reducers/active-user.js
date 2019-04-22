import { LOGGED_IN, LOGGIN_FAILED, SET_UNIT, LOG_OUT } from "../constants";

let logInObject = {
    name: '',
    token: null,
    loggedIn: false,
    role: '',
    unit: ''
}
export default function (state = logInObject, action) {
    switch (action.type) {
        case LOGGED_IN:
            let role = action.payload.role.toLowerCase();
            let unit = action.payload.unit.toLowerCase()
            if(role !== "unit"){
                unit = "business"
            }
            return {...state, loggedIn: true, token: action.payload.token, unit, role};
        case LOGGIN_FAILED: 
            return {...state, loggedIn: false}
        case SET_UNIT:
            return {...state, unit: action.payload}
        case LOG_OUT:
            return {...state, token: null, loggedIn: false, role: null, unit: null}
        default:
            break;
    }
    return state;
}