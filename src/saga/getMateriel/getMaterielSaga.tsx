import {
  takeLatest,
  fork
} from "redux-saga/effects";
import { reduxSagaFirebase } from "../../redux/store";
import firebase, { firestore } from "firebase";
import "firebase/firestore";
import {
  listEquipments,
  listLoan
} from "../../redux/dashboardFournisseur/DashboardFournisseurAction";

function* getAllEquipments() {
  try {
    yield fork(reduxSagaFirebase.firestore.syncCollection, "equipment", {
      successActionCreator: listEquipments
    });
    //@ts-ignore
    yield fork(reduxSagaFirebase.firestore.syncCollection,
      firestore()
        .collection("equipment")
        .where("status", "==", "1"),
      {
        successActionCreator: listLoan
      }
    );
  } catch (error) {
    console.log(error);
  }
}

export function* watchEquipments() {
  yield takeLatest("GET_EQUIPMENTS", getAllEquipments);
}
