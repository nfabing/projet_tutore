import {
    PASSWORD_CHANGE_IN_PROGRESS,
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_SUCCESS,
    PASSWORD_CHANGE_NEED_RELOGIN,
    PASSWORD_CHANGE_NEED_RELOGIN_SUCCESS
} from "./passwordTypes";


export const passwordChangeInprogress = () => {
    return {
        type: PASSWORD_CHANGE_IN_PROGRESS
    }
}

export const passwordChangeSuccess = () => {
    return {
        type: PASSWORD_CHANGE_SUCCESS
    }
}

export const passwordChangeError = (error: string) => {
    return {
        type: PASSWORD_CHANGE_ERROR,
        error: error
    }
}
// si besoin de reconnexion
export const passwordChangeNeedAuth = () => {
    return {
        type: PASSWORD_CHANGE_NEED_RELOGIN
    }
}
// si reconnexion réussite
export const passwordChangeNeedAuthSuccess = () => {
    return {
        type: PASSWORD_CHANGE_NEED_RELOGIN_SUCCESS
    }

}
