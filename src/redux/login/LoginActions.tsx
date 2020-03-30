// Actions creators
import {
    LOGIN_SUCCESS, RELOGIN_SUCCESS, LOGIN_ERROR, LOGIN_IN_PROGRESS, LOGOUT_SUCCESS,
    LOGIN_PROVIDER_FIRST_TIME
} from "./loginTypes";


export const loginError = (error: string) => {

    let errorMessage;

    if (error === 'auth/email-already-in-use') {
        errorMessage = 'Email déja utilisée !'
    }
    if (error === 'auth/weak-password') {
        errorMessage = 'Le mot de passe doit être au moins de 6 caratères !'
    }
    if (error === 'auth/user-not-found') {
        errorMessage = 'Utilisateur non existant !'
    }
    if (error === 'auth/wrong-password') {
        errorMessage = 'Mot de passe incorrect !'
    }

    return {
        type: LOGIN_ERROR,
        error: errorMessage
    }
}

export const loginInProgress = () => {
    return {
        type: LOGIN_IN_PROGRESS,
    }
}

export const loginSuccess = (user: any) => {
    return {
        type: LOGIN_SUCCESS,
        user: user,

    }
}

export const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS,
    }
}

export const reLoginSuccess = () => {
    return {
        type: RELOGIN_SUCCESS,
    }
}

// Login avec provider google/github pour la première fois
export const loginProviderFirstTime = () => {
    return {
        type: LOGIN_PROVIDER_FIRST_TIME,
    }
}



