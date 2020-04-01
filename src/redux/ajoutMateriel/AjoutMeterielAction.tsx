import {
  ADD_EQUIPMENT,
  LIST_CATEGORIES,
  ONE_CATEGORIES,
  LIST_CATEGORIES_FOR_FOURNISSEUR
} from "./AjoutMaterielType";

export const addEquipment = (data: any) => {
  return {
    type: ADD_EQUIPMENT,
    equipments: data
  };
};

export const oneCategories = (data: any) => {
  return {
    type: ONE_CATEGORIES,
    oneCategories: data
  };
};

export const categories = (data: any) => {
  if (data.Xv != undefined) {
    return {
      type: LIST_CATEGORIES,
      categories: data.Xv.docChanges
    };
  } else {
    return {
      type: LIST_CATEGORIES,
      categories: data
    };
  }
};

export const categoriesForFournisseur = (data: any) => {
  if (data.Xv != undefined) {
    return {
      type: LIST_CATEGORIES_FOR_FOURNISSEUR,
      categoriesForFournisseur: data.Xv.docChanges
    };
  } else {
    return {
      type: LIST_CATEGORIES_FOR_FOURNISSEUR,
      categoriesForFournisseur: data
    };
  }
};
