import {
    GET_CONFIRM_OK_RESERVATION,
    SYNC_RESERVATIONS, SYNC_RESERVATIONS_REQUEST, SYNC_RESERVATIONS_ERROR
} from './ReservationType';
import {LOGOUT_SUCCESS} from "../login/loginTypes";

const initialState = {
    reservations: [],
    loading: false,
    getConfirmReservation: [],
    error: ''
}

export const ReservationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_CONFIRM_OK_RESERVATION:
            return{
                ...state,
                getConfirmReservation: action
            };
        case SYNC_RESERVATIONS:
            return {
                ...state,
                loading: false,
                reservations: action.data
            }
        case SYNC_RESERVATIONS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case SYNC_RESERVATIONS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case LOGOUT_SUCCESS:
            return {
                ...state,
                reservations: [],
                loading: false,
            }
        default: return state
    }
}
