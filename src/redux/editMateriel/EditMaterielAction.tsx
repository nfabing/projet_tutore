// Actions creators
import { GET_ONE_EQUIPMENT, GET_LIST_CATEGORIES } from "./EditMaterielType";
import { reduxSagaFirebase } from "../../redux/store";
import firebase from "firebase";
import { resolve } from "url";

export const getOneEquipment = (data: any) => {
  // let img = data.dm.proto.fields.img.integerValue;
  // let storage = firebase.storage();
  // let imgRef = storage.refFromURL("gs://projet-tutore-6833d.appspot.com/equipments/"+img)
  // data.dm.proto.fields.img = imgRef.getDownloadURL();
  return {
    type: GET_ONE_EQUIPMENT,
    getOneEquipment: data.dm.proto.fields
  };
};

export const getListCategories = (data: any) => {
  return {
    type: GET_LIST_CATEGORIES,
    getListCategories: data.Pm.docChanges
  };
};
