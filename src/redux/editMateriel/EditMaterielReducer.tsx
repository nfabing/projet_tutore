import { GET_ONE_EQUIPMENT, GET_LIST_CATEGORIES } from "./EditMaterielType";

const initialState = {
  equipment: [],
  listCategories: [],
  getOneEquipment: []
};

const EditMaterielReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ONE_EQUIPMENT:
      return {
        ...state,
        getOneEquipment: action,
      };
      case GET_LIST_CATEGORIES:
      return {
        ...state,
        listCategories: action
      };
    default:
      return state;
  }
};

export default EditMaterielReducer;
