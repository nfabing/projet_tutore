import {ADD_EQUIPMENT, LIST_CATEGORIES, ONE_CATEGORIES} from "./AjoutMaterielType";

const initialState = {
  addEquipment: [],
  categories: [],
  oneCategories: []
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
    case ONE_CATEGORIES:
      return {
        ...state,
        oneCategories: action
      };
    default:
      return state;
  }
};

export default addEquipmentReducer;
