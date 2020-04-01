import {
    RELOGIN_ERROR,
    RELOGIN_IN_PROGRESS, RELOGIN_REQUEST,
    RELOGIN_REQUEST_EMAIL_AUTH,

    RELOGIN_SUCCESS
} from "./CheckLoginTypes";


export const reloginRequest = () => {
    return {
        type: RELOGIN_REQUEST
    }
}

export const reloginEmailRequest = () => {
    return {
        type: RELOGIN_REQUEST_EMAIL_AUTH
    }
}

export const reloginInProgress = () => {
    return {
        type: RELOGIN_IN_PROGRESS
    }
}

export const reloginSuccess = () => {
    return {
        type: RELOGIN_SUCCESS
    }
}

export const reloginError = () => {
    return {
        type: RELOGIN_ERROR
    }
}
