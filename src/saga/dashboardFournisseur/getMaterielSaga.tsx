import { takeLatest, take, put, fork, takeEvery } from "redux-saga/effects";
import store, { reduxSagaFirebase } from "../../redux/store";
import firebase, { firestore } from "firebase";
import "firebase/firestore";
import {
  listEquipments,
  listLoan,
  displayListEquipments
} from "../../redux/dashboardFournisseur/DashboardFournisseurAction";
import { eventChannel, buffers } from "redux-saga";
import { emit } from "cluster";
import { equal } from "assert";

function* getEquipments() {
  const db = firebase.firestore();
  try {
    yield db.collection("equipment").onSnapshot(function(querySnapshot) {
      var equip: Array<any> = [];
      querySnapshot.forEach(function(doc) {
        let objID = { id: doc.id };
        let finalObj = Object.assign(objID, doc.data());
        equip.push(finalObj);
      });
      return store.dispatch(listEquipments(equip));
    });

    yield db
      .collection("equipment")
      .where("status", "==", "1")
      .onSnapshot(function(querySnapshot) {
        var loan: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          loan.push(finalObj);
        });
        return store.dispatch(listLoan(loan));
      });
  } catch (error) {
    console.log(error);
  }
}

function* getAllEquipments() {
  const db = firebase.firestore();
  try {
    yield db.collection("equipment").onSnapshot(function(querySnapshot) {
      var equip: Array<any> = [];
      querySnapshot.forEach(function(doc) {
        let objID = { id: doc.id };
        let finalObj = Object.assign(objID, doc.data());
        equip.push(finalObj);
      });
      return store.dispatch(displayListEquipments(equip));
    });
  } catch (error) {
    console.log(error);
  }
}
function* getLoanEquipments() {
  const db = firebase.firestore();
  try {
    yield db
      .collection("equipment")
      .where("status", "==", "1")
      .onSnapshot(function(querySnapshot) {
        var loan: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          loan.push(finalObj);
        });
        return store.dispatch(displayListEquipments(loan));
      });
  } catch (error) {
    console.log(error);
  }
}

export function* watchEquipments() {
  yield takeEvery("GET_EQUIPMENTS", getEquipments);
  yield takeLatest("GET_ALL_EQUIPMENTS", getAllEquipments);
  yield takeLatest("GET_LOAN_EQUIPMENTS", getLoanEquipments);
}
