import {LIST_RESERVE} from "./listReserveType";

const initialState = {
    listReserve: []
}

const listReserveReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case LIST_RESERVE:
            return {
                ...state,
                listReserve: action
            }
        default:
            return state;
    }
}

export default listReserveReducer