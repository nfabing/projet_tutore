import {
  call,
  takeEvery,
  takeLatest,
  take
} from "redux-saga/effects";
import { reduxSagaFirebase } from "../../redux/store";
import "firebase/firestore";
import { categories } from "../../redux/ajoutMateriel/AjoutMeterielAction";

function* addEquipmentSaga() {
  const data = yield take("ADD_EQUIPMENT");
  const date = data.values.equipment.buyingDate.format("YYYY");
  const nameFile = Date.now();
  const upload = reduxSagaFirebase.storage.uploadFile("equipments/"+nameFile, data.values.upload[0].originFileObj)
  yield upload;
  const doc = yield call(reduxSagaFirebase.firestore.addDocument, "equipment", {
    name: data.values.equipment.name,
    status: data.values.equipment.status,
    userHandle: "Nicolas",
    description: data.values.equipment.description,
    buyingDate: date,
    category: data.values.equipment.category,
    brand: data.values.equipment.marque,
    modele: data.values.equipment.modele,
    img: nameFile
  });  
}

function* getCategories() {
  const ListCategories = yield call(reduxSagaFirebase.firestore.syncCollection, "categories",{
    successActionCreator: categories
  })
}

export function* watchAddEquipment() {
  yield takeEvery("ADD_EQUIPMENT", addEquipmentSaga);
  yield takeLatest("GET_CATEGORIES", getCategories);
}
