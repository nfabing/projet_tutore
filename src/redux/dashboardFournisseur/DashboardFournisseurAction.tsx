// Actions creators
import {
    LIST_EQUIPMENTS,
    LIST_LOAN,
    DISPLAY_LIST_EQUIPMENTS,
    LIST_WAITING,
    LIST_EQUIPMENTS_FOR_FOURNISSEUR,
    LIST_BOOKED,
    LIST_LOAN_FOURNISSEUR,
    DISPLAY_RETURN_EQUIPMENTS,
    LIST_OVERDUE
} from "./DashboardFournisseurType";

export const listEquipments = (data: any) => {
    return {
        type: LIST_EQUIPMENTS,
        equipments: data
    }
};

export const listEquipmentsForFournisseur = (data: any) => {
    return {
        type: LIST_EQUIPMENTS_FOR_FOURNISSEUR,
        equipmentsForFournisseur: data
    }
};

export const listLoan = (data: any) => {
    return {
        type: LIST_LOAN,
        listLoan: data
    }
};

export const listLoanFournisseur = (data: any) => {
    return {
        type: LIST_LOAN_FOURNISSEUR,
        listLoan: data
    }
};

export const listWaiting = (data: any) => {
    return {
        type: LIST_WAITING,
        listWaiting: data
    }
};

export const listBooked = (data: any) => {
    return {
        type: LIST_BOOKED,
        listBooked: data
    }
};

export const listOverdue = (data: any) => {
    return {
        type: LIST_OVERDUE,
        listOverdue: data
    }
};

export const displayListEquipments = (data: any) => {
    return {
        type: DISPLAY_LIST_EQUIPMENTS,
        listEquipments: data
    }
};

export const displayReturnEquipments = (data: any) => {
    return {
        type: DISPLAY_RETURN_EQUIPMENTS,
        listReturnEquipments: data
    }
};

