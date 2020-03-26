import {ADD_EQUIPMENT,LIST_CATEGORIES} from "./AjoutMaterielType";

export const addEquipment = (data: any) => {
    console.log(data);
    return {
        type: ADD_EQUIPMENT,
        equipments: data
    }
}

export const categories = (data: any) => {
    console.log(data);
    return {
        type: LIST_CATEGORIES,
        categories: data.Pm.docChanges
    }
}