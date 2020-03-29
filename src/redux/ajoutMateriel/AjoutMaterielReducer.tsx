import { ADD_EQUIPMENT,LIST_CATEGORIES } from "./AjoutMaterielType";

const initialState = {
  addEquipment: [],
  categories: []
};

const addEquipmentReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_EQUIPMENT:
      return {
        ...state,
        addEquipment: action
      };
    case LIST_CATEGORIES:
      return {
        ...state,
        categories: action
      };
    default:
      return state;
  }
};

export default addEquipmentReducer;
