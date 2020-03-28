import { GET_ONE_EQUIPMENT } from "./EditMaterielType";

const initialState = {
  equipment: [],
  getOneEquipment: []
};

const EditMaterielReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_ONE_EQUIPMENT:
      return {
        ...state,
        getOneEquipment: action
      };
    default:
      return state;
  }
};

export default EditMaterielReducer;
