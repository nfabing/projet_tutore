import {LIST_EQUIPMENTS} from "./getAllEquipementType";

const initialState = {
    equipments: []
}

const listEquipmentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_EQUIPMENTS:
            return {
                ...state,
                equipments: action
            }
        default:
            return state;
    }
}

export default listEquipmentReducer
