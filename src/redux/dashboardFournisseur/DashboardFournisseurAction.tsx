// Actions creators
import {LIST_EQUIPMENTS} from "./DashboardFournisseurType";
import {LIST_LOAN} from "./DashboardFournisseurType";

export const listEquipments = (data: any) => {
    return {
        type: LIST_EQUIPMENTS,
        equipments: data.Pm.docChanges
    }
}

export const listLoan = (data: any) => {
    return {
        type: LIST_LOAN,
        listLoan: data.Pm.docChanges
    }
}
