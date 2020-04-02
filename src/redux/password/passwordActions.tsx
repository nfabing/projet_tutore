import {
    PASSWORD_CHANGE_IN_PROGRESS,
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_SUCCESS,
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
    let errorMessage
    if (error === 'auth/requires-recent-login') {
        errorMessage = 'Une vérification est requise pour effectuer cette action'
    } else {
        errorMessage = 'Une erreur est survenue'
    }

    return {
        type: PASSWORD_CHANGE_ERROR,
        error: errorMessage
    }
}
