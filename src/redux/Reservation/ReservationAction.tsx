import {GET_RESERVATION} from "./ReservationType";

export const getReservation = (data: any) => {
    return{
        type: GET_RESERVATION,
    }
};
