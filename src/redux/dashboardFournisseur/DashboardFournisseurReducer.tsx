import {
    LIST_EQUIPMENTS,
    LIST_LOAN,
    DISPLAY_LIST_EQUIPMENTS,
    LIST_WAITING,
    LIST_EQUIPMENTS_FOR_FOURNISSEUR,
    LIST_BOOKED,
    LIST_LOAN_FOURNISSEUR,
    DISPLAY_RETURN_EQUIPMENTS,
    LIST_OVERDUE
} from "./DashboardFournisseurType";

const initialState = {
    equipments: [],
    listLoan: [],
    listEquipments: [],
    equipmentsForFournisseur: [],
    listLoanFournisseur: [],
    listReturnEquipments: [],
    listOverdue: [],
    listBooked: []
};

const listEquipmentReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_EQUIPMENTS:
            return {
                ...state,
                equipments: action
            };
        case LIST_EQUIPMENTS_FOR_FOURNISSEUR:
            return {
                ...state,
                equipmentsForFournisseur: action
            };
        case LIST_LOAN:
            return {
                ...state,
                listLoan: action
            };
        case LIST_LOAN_FOURNISSEUR:
            return {
                ...state,
                listLoanFournisseur: action
            };
        case LIST_WAITING:
            return {
                ...state,
                listWaiting: action
            };
        case LIST_BOOKED:
            return {
                ...state,
                listBooked: action
            };
        case LIST_OVERDUE:
            return {
                ...state,
                listOverdue: action
            };
        case DISPLAY_LIST_EQUIPMENTS:
            return {
                ...state,
                listEquipments: action
            };
        case DISPLAY_RETURN_EQUIPMENTS:
            return {
                ...state,
                listReturnEquipments: action
            };
        default:
            return state;
    }
};

export default listEquipmentReducer;
