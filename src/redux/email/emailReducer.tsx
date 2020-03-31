import {EMAIL_CHANGE_ERROR, EMAIL_CHANGE_IN_PROGRESS, EMAIL_CHANGE_SUCCESS} from "./emailTypes";

const initialState = {
    loading: false,
    message: '',
}

const emailReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case EMAIL_CHANGE_IN_PROGRESS:
            return {
                ...state,
                loading: true,
                message: ''
            }
        case EMAIL_CHANGE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'Mot de passe changé avec succès !',
            }
        case EMAIL_CHANGE_ERROR:
            return {
                ...state,
                loading: false,
                message: action.error,
            }
        default:
            return state
    }
}

export default emailReducer
