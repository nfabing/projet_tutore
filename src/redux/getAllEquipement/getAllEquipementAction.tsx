// Actions creators
import {LIST_EQUIPMENTS} from "./getAllEquipementType";

export const listEquipments = (data: any) => {
    return {
        type: LIST_EQUIPMENTS,
        equipments: data.Pm.docChanges
    }
}
