import {
    RELOGIN_ERROR,
    RELOGIN_IN_PROGRESS,
    RELOGIN_REQUEST, RELOGIN_REQUEST_EMAIL_AUTH,
    RELOGIN_SUCCESS
} from "./CheckLoginTypes";


const initialState = {

    needRelogin: undefined,
    needReloginEmail: false,
    loading: false
}

const reloginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case RELOGIN_REQUEST:
            return {
                ...state,
                needRelogin: true
            }
        case RELOGIN_REQUEST_EMAIL_AUTH:
            return {
                ...state,
                needReloginEmail: true
            }
        case RELOGIN_IN_PROGRESS:
            return {
                ...state,
                loading: true
            }
        case RELOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                needRelogin: undefined,
                needReloginEmail: false
            }
        case RELOGIN_ERROR:
            return {
                ...state,
                loading: false,
                needRelogin: undefined,
                needReloginEmail: false
            }
        default: return state
    }
}

export default reloginReducer
