import {GET_ONE_EQUIPMENT, GET_LIST_CATEGORIES, GOT_EQUIPMENT_OWNER} from "./EditMaterielType";

const initialState = {
  equipment: [],
  listCategories: [],
  getOneEquipment: [],
  user : [],
};

const EditMaterielReducer = (state = initialState, action: any) => {
  
  switch (action.type) {
    case GET_ONE_EQUIPMENT:console.log(action);
      return {
        ...state,
        getOneEquipment: action.equipment,
      };
      case GET_LIST_CATEGORIES:
      return {
        ...state,
        listCategories: action
      };
    case GOT_EQUIPMENT_OWNER:

      return  {
          ...state,
        user: action.user
      }
    default:
      return state;
  }
};

export default EditMaterielReducer;
