import {EMAIL_CHANGE_ERROR, EMAIL_CHANGE_IN_PROGRESS, EMAIL_CHANGE_SUCCESS} from "./emailTypes";


export const emailChangeInprogress = () => {
    return {
        type: EMAIL_CHANGE_IN_PROGRESS
    }
}

export const emailChangeSuccess = () => {
    return {
        type: EMAIL_CHANGE_SUCCESS
    }
}

export const emailChangeError = (error: string) => {
    let errorMessage
    if (error === 'auth/requires-recent-login') {
        errorMessage = 'Une vérification est requise pour effectué cette action'
    } else {
        errorMessage = 'Une erreur est survenue'
    }

    return {
        type: EMAIL_CHANGE_ERROR,
        error: errorMessage
    }
}
