import {LOGIN} from "./loginTypes";

const initialState = {
    loading: false,
    user: [],
    token: '',
    error: ''
}

const loginReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                loading: !state.loading
            }

        default:
            return state;
    }
}

export default loginReducer
