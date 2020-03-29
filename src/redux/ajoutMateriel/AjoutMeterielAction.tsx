import {ADD_EQUIPMENT,LIST_CATEGORIES} from "./AjoutMaterielType";

export const addEquipment = (data: any) => {
    return {
        type: ADD_EQUIPMENT,
        equipments: data
    }
}

export const categories = (data: any) => {
    return {
        type: LIST_CATEGORIES,
        categories: data.Pm.docChanges
    }
}