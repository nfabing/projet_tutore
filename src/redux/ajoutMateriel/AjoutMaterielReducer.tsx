import {ADD_EQUIPMENT} from "./AjoutMaterielType";

const initialState = {
    addEquipment: []
}

const addEquipmentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_EQUIPMENT:
            return {
                ...state,
                addEquipment: action
            }
        default:
            return state;
    }
}

export default addEquipmentReducer
