import { fork, takeEvery } from "redux-saga/effects";
import store, { reduxSagaFirebase } from "../../redux/store";
import firebase from "firebase";
import "firebase/firestore";



import { listReserve,listAll,listHistorique } from '../../redux/listReserve/listReserveAction';

function* getListReserve() {
    const db = firebase.firestore();
    try {
      yield db
        .collection("reservation")
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

        yield db
        .collection("equipment")
        .onSnapshot(function(querySnapshot) {
        var Equip: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          Equip.push(finalObj);
        });
        return store.dispatch(listAll(Equip));
        });
    } catch (error) {
    console.log(error);
      }
};

function* annuleReserve(id:any){
  yield fork(reduxSagaFirebase.firestore.updateDocument, "reservation/"+ id.id,{
    status: 5,
  });
};

function* updateStatus(idE:any){
    yield fork(reduxSagaFirebase.firestore.updateDocument, "equipment/"+ idE.idE,{
      status: 0,
    });
    
};

function* getHistorique(idU:any){
  const db = firebase.firestore();
    try {
      yield db
        .collection("reservation")
        .where("idUser", "==", idU.idU)
        .onSnapshot(function(querySnapshot) {
        var historique: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          historique.push(finalObj);
        });
        return store.dispatch(listHistorique(historique));
        });
      } catch (error) {
        console.log(error);
          }
};

  export function* watchReserve() {
    yield takeEvery("GET_RESERVE", getListReserve);
    yield takeEvery("DEL_RESERVE", annuleReserve);
    yield takeEvery("PUT_STATUS", updateStatus);
    yield takeEvery("GET_HISTORIQUE", getHistorique);
  }