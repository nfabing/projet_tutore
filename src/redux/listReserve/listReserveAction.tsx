// Actions creators
import {LIST_RESERVE,DEL_RESERVE} from "./listReserveType";

export const listReserve = (data: any) => {
    return {
        type: LIST_RESERVE,
        equipments: data
    }
};

export const delReservation = (data: any) => {
    return {
      type: DEL_RESERVE,
      id: data
    };
  };
