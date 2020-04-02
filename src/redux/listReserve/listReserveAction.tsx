// Actions creators
import {LIST_RESERVE,DEL_RESERVE, GET_ALL,PUT_STATUS} from "./listReserveType";

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

  export const listAll = (data: any) => {
    return {
      type: GET_ALL,
      listAll: data
    };
  };

  export const updateEquipment = (data: any) => {
    return {
      type: PUT_STATUS,
      updateEquipment: data
    };
  };