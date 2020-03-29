import { takeLatest, call, fork, take, select } from "redux-saga/effects";
import store, { reduxSagaFirebase } from "../../redux/store";
import "firebase/firestore";
import { getOneEquipment } from "../../redux/editMateriel/EditMaterielAction";
// import { getEquipmentID } from "../../components/EditMateriel";
import { getListCategories } from "../../redux/editMateriel/EditMaterielAction";

//RECUPERE L'EQUIPEMENT A MODIFIER AINSI QUE LES CATEGORIES
function* getOneEquipmentSaga(value: any) {
  const id = yield value.id;
  const data = yield fork(
    reduxSagaFirebase.firestore.syncDocument,
    "equipment/" + id,
    { successActionCreator: getOneEquipment }
  );
  yield fork(reduxSagaFirebase.firestore.syncCollection, "categories",{
    successActionCreator: getListCategories
  })
}

function* editEquipmentSaga() {
  const id = yield take("GET_THAT_EQUIPMENT");
  // const id = yield select(getEquipmentID);
  console.log('ID : '+id)
  const data = yield take("EDIT_THAT_EQUIPMENT");
  let date = null;
  if (data.values.equipment.buyingDate._d != null) {
    date = data.values.equipment.buyingDate.format("YYYY");
  } else {
    date = data.values.equipment.buyingDate;
  }
  yield fork(reduxSagaFirebase.firestore.updateDocument, 'equipment/${id.id}', {
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


export function* watchEditEquipment() {
  yield takeLatest("GET_THAT_EQUIPMENT", getOneEquipmentSaga);
  yield takeLatest("EDIT_THAT_EQUIPMENT", editEquipmentSaga);
}
