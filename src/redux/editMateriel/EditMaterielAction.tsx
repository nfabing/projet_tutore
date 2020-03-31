// Actions creators
import {GET_ONE_EQUIPMENT, GET_LIST_CATEGORIES, GOT_EQUIPMENT_OWNER} from "./EditMaterielType";

export const getOneEquipment = (data: any) => {
    console.log(data);
    return {
        type: GET_ONE_EQUIPMENT,
        equipment: data
    };
};

export const getListCategories = (data: any) => {
    if (data.Xv != undefined) {
        return {
            type: GET_LIST_CATEGORIES,
            getListCategories: data.Xv.docChanges
        };
    } else {
        return {
            type: GET_LIST_CATEGORIES,
            getListCategories: data
        };
    }
};

export const gotEquipmentUser = (user: any) => {
    return {
        type: GOT_EQUIPMENT_OWNER,
        user: user
    }
}
