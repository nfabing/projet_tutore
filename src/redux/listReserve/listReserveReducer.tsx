import {LIST_RESERVE,DEL_RESERVE,GET_ALL,PUT_STATUS,GET_HISTORIQUE} from "./listReserveType";

const initialState = {
    listReserve: [],
    listAll: [],
    id: [], //id reservation update status "supprimer"
    idE: [], //id equipment update status
    listHistorique: [], // "historique"
    idU:[]
}

const listReserveReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_RESERVE:
            return {
                ...state,
                listReserve: action
            };
        case DEL_RESERVE:
            return {
                ...state,
                id: action
            };
        case GET_ALL:
            return {
                ...state,
                listAll: action
            };
            case PUT_STATUS:
            return {
                ...state,
                idE: action
            };
            case GET_HISTORIQUE:
            return {
                ...state,
                idU: action
            };   
        default:
            return state;
    }
}

export default listReserveReducer