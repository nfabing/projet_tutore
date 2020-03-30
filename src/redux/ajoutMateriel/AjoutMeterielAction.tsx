import { ADD_EQUIPMENT, LIST_CATEGORIES } from "./AjoutMaterielType";

export const addEquipment = (data: any) => {
  return {
    type: ADD_EQUIPMENT,
    equipments: data
  };
};

export const categories = (data: any) => {
    console.log('DATAAaAAAAAA', data);
  if (data.Xv != undefined) {
    return {
      type: LIST_CATEGORIES,
      categories: data.Xv.docChanges
    };
  }else{
      return {
          type: LIST_CATEGORIES,
          categories: data
      }
  }
};
