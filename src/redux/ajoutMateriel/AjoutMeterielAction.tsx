import {ADD_EQUIPMENT} from "./AjoutMaterielType";

export const addEquipment = (data: any) => {
    console.log(data);
    return {
        type: ADD_EQUIPMENT,
        equipments: data
    }
}