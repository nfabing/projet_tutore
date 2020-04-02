import {GET_CONFIRM_OK_RESERVATION, SYNC_RESERVATIONS, SYNC_RESERVATIONS_ERROR} from "./ReservationType";

export const syncReservations = (data: any) => {
    return {
        type: SYNC_RESERVATIONS,
        data: data
    }
}

export const syncReservationsError = (error: string) => {
    return {
        type: SYNC_RESERVATIONS_ERROR,
        error: error
    }
}

export const getConfirmReservation = (data: any) => {
    return{
        type: GET_CONFIRM_OK_RESERVATION,
        getConfirmReservation : data
    }
};


