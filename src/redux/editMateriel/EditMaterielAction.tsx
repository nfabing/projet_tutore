// Actions creators
import { GET_ONE_EQUIPMENT, GET_LIST_CATEGORIES } from "./EditMaterielType";
import { reduxSagaFirebase } from "../../redux/store";
import firebase from "firebase";
import { resolve } from "url";

export const getOneEquipment = (data: any) => {
  return {
    type: GET_ONE_EQUIPMENT,
    getOneEquipment: data
  };
};

export const getListCategories = (data: any) => {
  if (data.Xv != undefined) {
    return {
      type: GET_LIST_CATEGORIES,
      getListCategories: data.Xv.docChanges
    };
  }else{
    return {
      type: GET_LIST_CATEGORIES,
      getListCategories: data
    };
  }
};
