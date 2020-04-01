import {
  GET_ONE_EQUIPMENT,
  GET_LIST_CATEGORIES,
  GOT_EQUIPMENT_OWNER,
  GET_ONE_EQUIPMENT_FOR_EDIT,
  GET_LIST_CATEGORIES_FOR_EDIT
} from "./EditMaterielType";

const initialState = {
  equipment: [],
  listCategories: [],
  getOneEquipment: [],
  user: [],
  getOneEquipmentForEdit: [],
  listCategoriesForEdit: []
};

const EditMaterielReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ONE_EQUIPMENT:
      return {
        ...state,
        getOneEquipment: action.equipment
      };
    case GET_ONE_EQUIPMENT_FOR_EDIT:
      return {
        ...state,
        getOneEquipmentForEdit: action
      };
    case GET_LIST_CATEGORIES:
      return {
        ...state,
        listCategories: action
      };
    case GET_LIST_CATEGORIES_FOR_EDIT:
      return {
        ...state,
        listCategoriesForEdit: action
      };
    case GOT_EQUIPMENT_OWNER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default EditMaterielReducer;
