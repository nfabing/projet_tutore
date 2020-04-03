// Actions creators
import {
    LOGIN_SUCCESS, RELOGIN_SUCCESS, LOGIN_ERROR, LOGIN_IN_PROGRESS, LOGOUT_SUCCESS,
    LOGIN_PROVIDER_FIRST_TIME
} from "./loginTypes";


export const loginError = (error: string) => {

    let errorMessage;

    if (error === 'auth/email-already-in-use') {
        errorMessage = 'Email déjà utilisée'
    }
    if (error === 'auth/weak-password') {
        errorMessage = 'Le mot de passe doit être au moins de 6 caratères'
    }
    if (error === 'auth/user-not-found') {
        errorMessage = 'Utilisateur inexistant'
    }
    if (error === 'auth/wrong-password') {
        errorMessage = 'Mot de passe incorrect'
    }
    if (error === 'auth/account-exists-with-different-credential') {
        errorMessage = 'L\'email liée à ce compte est déjà utilisé'
    }
    if (error === 'auth/invalid-credential') {
        errorMessage = 'Erreur d\'identification'
    }
    if (error === 'auth/popup-closed-by-user') {
        errorMessage = 'La popup a été fermée'
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

// LoginScreen avec provider google/github pour la première fois
export const loginProviderFirstTime = () => {
    return {
        type: LOGIN_PROVIDER_FIRST_TIME,
    }
}



