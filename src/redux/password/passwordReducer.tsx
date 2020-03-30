import {
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_IN_PROGRESS,
    PASSWORD_CHANGE_NEED_RELOGIN, PASSWORD_CHANGE_NEED_RELOGIN_SUCCESS,
    PASSWORD_CHANGE_SUCCESS
} from "./passwordTypes";


const initialState = {
    loading: false,
    needRelogin: false,
    message: '',
}

const passwordReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case PASSWORD_CHANGE_IN_PROGRESS:
            return {
                ...state,
                loading: true,
                message: ''
            }
        case PASSWORD_CHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'Mot de passe changé avec succès !',
                needRelogin: false,
            }
        case PASSWORD_CHANGE_ERROR:
            return {
                ...state,
                loading: false,
                message: action.error.message,
                needRelogin: false,
            }
        case PASSWORD_CHANGE_NEED_RELOGIN:
            return {
                ...state,
                loading: false,
                needRelogin: true,
            }
        case PASSWORD_CHANGE_NEED_RELOGIN_SUCCESS:
            return {
                ...state,
                needRelogin: false
            }

        default:
            return state
    }
}

export default passwordReducer
