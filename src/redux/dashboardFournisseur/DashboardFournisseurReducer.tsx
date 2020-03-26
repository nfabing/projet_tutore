import {LIST_EQUIPMENTS} from "./DashboardFournisseurType";
import {LIST_LOAN} from "./DashboardFournisseurType";

const initialState = {
    equipments: [],
    listLoan: []
}

const listEquipmentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_EQUIPMENTS:
            return {
                ...state,
                equipments: action
            }
        case LIST_LOAN:
            return {
                ...state,
                listLoan: action
            }
        default:
            return state;
    }
}

export default listEquipmentReducer
