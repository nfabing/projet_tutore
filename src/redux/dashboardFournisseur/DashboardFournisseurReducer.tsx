import {
  LIST_EQUIPMENTS,
  LIST_LOAN,
  DISPLAY_LIST_EQUIPMENTS,
  LIST_BOOKED
} from "./DashboardFournisseurType";

const initialState = {
  equipments: [],
  listLoan: [],
  listEquipments: []
};

const listEquipmentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LIST_EQUIPMENTS:
      return {
        ...state,
        equipments: action
      };
    case LIST_LOAN:
      return {
        ...state,
        listLoan: action
      };
    case LIST_BOOKED:
      return {
        ...state,
        listBooked: action
      };
    case DISPLAY_LIST_EQUIPMENTS:
      return {
        ...state,
        listEquipments: action
      };
    default:
      return state;
  }
};

export default listEquipmentReducer;
