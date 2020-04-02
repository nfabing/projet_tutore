import {LIST_RESERVE,DEL_RESERVE,GET_ALL,PUT_STATUS} from "./listReserveType";

const initialState = {
    listReserve: [],
    listAll: [],
    idE: [],
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
        default:
            return state;
    }
}

export default listReserveReducer