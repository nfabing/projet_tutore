import { takeLatest, take, put, fork, takeEvery } from "redux-saga/effects";
import store, { reduxSagaFirebase } from "../../redux/store";
import firebase, { firestore } from "firebase";
import "firebase/firestore";

import { eventChannel, buffers } from "redux-saga";
import { emit } from "cluster";
import { equal } from "assert";

import { listReserve } from '../../redux/listReserve/listReserveAction';

function* getListReserve() {
    const db = firebase.firestore();
    try {
      yield db
        .collection("equipment")
        .where("status", "==", "1")
        .onSnapshot(function(querySnapshot) {
        var Reserve: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          Reserve.push(finalObj);
        });
        return store.dispatch(listReserve(Reserve));
        });
    } catch (error) {
    console.log(error);
      }
};

function* annuleReserve(id:any){
console.log(id.id);
yield fork(reduxSagaFirebase.firestore.updateDocument, "equipment/"+id.id, {
  status: 0,
});

};

  export function* watchReserve() {
    yield takeEvery("GET_RESERVE", getListReserve);
    yield takeEvery("DEL_RESERVE", annuleReserve);
  }