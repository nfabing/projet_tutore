// Actions creators
import {LIST_RESERVE} from "./listReserveType";

export const listReserve = (data: any) => {
    return {
        type: LIST_RESERVE,
        equipments: data
    }
}
