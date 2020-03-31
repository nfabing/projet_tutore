import {LIST_RESERVE,DEL_RESERVE} from "./listReserveType";

const initialState = {
    listReserve: [],
    id:[],
}

const listReserveReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_RESERVE:
            return {
                ...state,
                listReserve: action
            };
        case LIST_RESERVE:
            return {
                ...state,
                id: action
            };   
        default:
            return state;
    }
}

export default listReserveReducer