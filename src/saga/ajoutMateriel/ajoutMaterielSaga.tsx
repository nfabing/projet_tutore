import {
  call,
  takeEvery,
  take
} from "redux-saga/effects";
import { reduxSagaFirebase } from "../../redux/store";
import "firebase/firestore";

function* addEquipmentSaga() {
  const data = yield take("ADD_EQUIPMENT");
  const date = data.values.equipment.buyingDate.format("YYYY");
  const doc = yield call(reduxSagaFirebase.firestore.addDocument, "equipment", {
    name: data.values.equipment.name,
    status: data.values.equipment.status,
    userHandle: "Nicolas",
    description: data.values.equipment.description,
    buyingDate: date,
    category: data.values.equipment.category,
    brand: data.values.equipment.marque,
    modele: data.values.equipment.modele
  });
}

export function* watchAddEquipment() {
  yield takeEvery("ADD_EQUIPMENT", addEquipmentSaga);
}
