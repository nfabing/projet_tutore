// Actions creators
import {LIST_EQUIPMENTS, LIST_LOAN, DISPLAY_LIST_EQUIPMENTS} from "./DashboardFournisseurType";

export const listEquipments = (data: any) => {
    console.log(data)
    return {
        type: LIST_EQUIPMENTS,
        equipments: data
    }
}

export const listLoan = (data: any) => {
    return {
        type: LIST_LOAN,
        listLoan: data
    }
}

export const displayListEquipments = (data: any) => {
    return {
        type: DISPLAY_LIST_EQUIPMENTS,
        listEquipments: data
    }
}
