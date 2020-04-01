import { CONFIRM_RESERVATION } from "./ConfirmReservationType";

const initialState = {
  confirmReservation: []
};

const confirmReservationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CONFIRM_RESERVATION:
      return {
        ...state,
        confirmReservation: action
      };
    default:
      return state;
  }
};

export default confirmReservationReducer;