// Actions creators
import {LIST_EQUIPMENTS, LIST_LOAN, DISPLAY_LIST_EQUIPMENTS, LIST_BOOKED, LIST_EQUIPMENTS_FOR_FOURNISSEUR} from "./DashboardFournisseurType";

export const listEquipments = (data: any) => {
    return {
        type: LIST_EQUIPMENTS,
        equipments: data
    }
}

export const listEquipmentsForFournisseur = (data: any) => {
    return {
        type: LIST_EQUIPMENTS_FOR_FOURNISSEUR,
        equipmentsForFournisseur: data
    }
}

export const listLoan = (data: any) => {
    return {
        type: LIST_LOAN,
        listLoan: data
    }
}

export const listBooked = (data: any) => {
    return {
        type: LIST_BOOKED,
        listBooked: data
    }
}

export const displayListEquipments = (data: any) => {
    console.log(data);
    return {
        type: DISPLAY_LIST_EQUIPMENTS,
        listEquipments: data
    }
}
