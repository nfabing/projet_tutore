import {
    PASSWORD_CHANGE_ERROR,
    PASSWORD_CHANGE_IN_PROGRESS,
    PASSWORD_CHANGE_SUCCESS,
} from "./passwordTypes";


const initialState = {
    loading: false,
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
            }
        case PASSWORD_CHANGE_ERROR:
            return {
                ...state,
                loading: false,
                message: action.error,
            }
        default:
            return state
    }
}

export default passwordReducer
