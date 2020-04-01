// Actions creators
import {GET_ONE_EQUIPMENT, GET_LIST_CATEGORIES, GOT_EQUIPMENT_OWNER, GET_ONE_EQUIPMENT_FOR_EDIT, GET_LIST_CATEGORIES_FOR_EDIT} from "./EditMaterielType";

export const getOneEquipment = (data: any) => {
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

export const getOneEquipmentForEdit = (data: any) => {
    return {
        type: GET_ONE_EQUIPMENT_FOR_EDIT,
        getOneEquipmentForEdit: data
    };
};

export const getListCategoriesForEdit = (data: any) => {
    if (data.Xv != undefined) {
        return {
            type: GET_LIST_CATEGORIES_FOR_EDIT,
            getListCategoriesForEdit: data.Xv.docChanges
        };
    } else {
        return {
            type: GET_LIST_CATEGORIES_FOR_EDIT,
            getListCategoriesForEdit: data
        };
    }
};

export const gotEquipmentUser = (user: any) => {
    return {
        type: GOT_EQUIPMENT_OWNER,
        user: user
    }
}
