import {LIST_RESERVE,DEL_RESERVE,GET_ALL} from "./listReserveType";

const initialState = {
    listReserve: [],
    listAll: [],
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
        default:
            return state;
    }
}

export default listReserveReducer