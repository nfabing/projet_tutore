import {LOGIN_SUCCESS} from "./loginTypes";

const initialState = {
    loading: false,
    user: [],
    token: '',
    error: ''
}

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                token: action.token,
            }

        default:
            return state;
    }
}

export default loginReducer
