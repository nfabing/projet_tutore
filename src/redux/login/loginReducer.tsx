import {
    LOGIN_ERROR,
    LOGIN_IN_PROGRESS,
    LOGIN_PROVIDER_FIRST_TIME,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    CHANGE_USER_TO_SUPPLIER,
    LOGIN_PROVIDER_STAY_USER,
} from "./loginTypes";

const initialState = {
    loading: false,
    logged: false,
    providerSignUp: false,
    user: [],
    error: '',
}

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                logged: true,
                user: action.user
            }
        case LOGIN_IN_PROGRESS:
            return {
                ...state,
                loading: true,
            }
        case 'LOGIN_GOOGLE':
            return {
                ...state,
                loading: true
            }
        case 'LOGIN_GITHUB':
            return {
                ...state,
                loading: true
            }
        case LOGIN_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                logged: false,
                user: [],
            }
        case LOGIN_PROVIDER_FIRST_TIME:
            return {
                ...state,
                providerSignUp: true,
            }
        case CHANGE_USER_TO_SUPPLIER:
            return {
                ...state,
                providerSignUp: false
            }
        case LOGIN_PROVIDER_STAY_USER:
            return {
                ...state,
                providerSignUp: false
            }
        default:
            return state;
    }
}

export default loginReducer
