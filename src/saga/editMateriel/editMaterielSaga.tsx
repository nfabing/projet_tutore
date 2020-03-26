import {
    takeLatest,
    call,
    fork,
    take,
    select
  } from "redux-saga/effects";
  import { reduxSagaFirebase } from "../../redux/store";
  import "firebase/firestore";
  import { getOneEquipment } from "../../redux/editMateriel/EditMaterielAction";
  import { getEquipmentID } from "../../components/EditMateriel";

  function* getOneEquipmentSaga() {
    const id = yield select(getEquipmentID);
    const data = yield fork(
      reduxSagaFirebase.firestore.syncDocument,
      "equipment/" + id,
      { successActionCreator: getOneEquipment }
    );
  }
  
  function* editEquipmentSaga() {
    const id = yield select(getEquipmentID);
    const data = yield take("EDIT_THAT_EQUIPMENT");
    let date = null;
    if(data.values.equipment.buyingDate._d != null){
        date = data.values.equipment.buyingDate.format("YYYY");
    }else{
        date = data.values.equipment.buyingDate;
    }
    console.log(data);
    yield call(reduxSagaFirebase.firestore.updateDocument, "equipment/" + id, {
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
    yield takeLatest("EDIT_THAT_EQUIPMENT", editEquipmentSaga);
    yield takeLatest("GET_THAT_EQUIPMENT", getOneEquipmentSaga);
  }