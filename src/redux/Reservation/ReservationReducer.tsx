import {
    GET_RESERVATION
} from './ReservationType';

const initialState = {
    reservation: [],
}

export const ReservationReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case GET_RESERVATION:
            return{
                ...state,
                reservation: action
            };
        default: return {
            state
        };

    }
}
