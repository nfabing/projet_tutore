import { CONFIRM_RESERVATION } from "./ConfirmReservationType";

export const confirmReservation = (data: any) => {
  return {
    type: CONFIRM_RESERVATION,
    equipments: data
  };
};
