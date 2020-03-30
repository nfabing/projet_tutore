import {SYNC_PROFIL, CHANGE_PROFIL_PICTURE} from "./profilTypes";
import {LOGOUT_SUCCESS} from "../login/loginTypes";


const initialState = {
    profil: {},
    loading: false,
}

const profilReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SYNC_PROFIL:
            return {
                ...state,
                profil: action.profil,
                loading: false
            }
        case CHANGE_PROFIL_PICTURE:
            return {
                ...state,
                loading: true
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
              profil: [],
              loading: false,
            }
        default: return state
    }
}

export default profilReducer
