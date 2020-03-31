import { takeLatest, take, put, fork, takeEvery } from "redux-saga/effects";
import store, { reduxSagaFirebase } from "../../redux/store";
import firebase, { firestore } from "firebase";
import "firebase/firestore";
import {
  listEquipments,
  listLoan,
  displayListEquipments,
  listBooked
} from "../../redux/dashboardFournisseur/DashboardFournisseurAction";
import { eventChannel, buffers } from "redux-saga";
import { emit } from "cluster";
import { equal } from "assert";

function* getEquipments(userID: any) {
  console.log(userID);
  const db = firebase.firestore();
  try {
    yield db
      .collection("equipment")
      .where("userHandle", "==", userID.value)
      .onSnapshot(function(querySnapshot) {
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
      .where("userHandle", "==", userID.value)
      .onSnapshot(function(querySnapshot) {
        var loan: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          loan.push(finalObj);
        });
        return store.dispatch(listLoan(loan));
      });

    //RECUPERE LES EQUIPMENT EN ATTENTE DE VALIDATION DE PRET
    yield db
      .collection("equipment")
      .where("userHandle", "==", userID.value)
      .where("status", "==", "4")
      .onSnapshot(function(querySnapshot) {
        var booked: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          booked.push(finalObj);
        });
        console.log(booked);
        return store.dispatch(listBooked(booked));
      });
  } catch (error) {
    console.log(error);
  }
}

function* getAllEquipments(userID: any) {
  const db = firebase.firestore();
  try {
    yield db
      .collection("equipment")
      .where("userHandle", "==", userID.value)
      .onSnapshot(function(querySnapshot) {
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

function* getAllEquipmentsForSearch() {
  const db = firebase.firestore();
  try {
    yield db.collection("equipment").onSnapshot(function(querySnapshot) {
      var equip: Array<any> = [];
      querySnapshot.forEach(function(doc) {
        let objID = { id: doc.id };
        let finalObj = Object.assign(objID, doc.data());
        equip.push(finalObj);
      });
      // return store.dispatch(listEquipments(equip));
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

function* getLoanEquipments(userID: any) {
  const db = firebase.firestore();
  try {
    yield db
      .collection("equipment")
      .where("status", "==", "1")
      .where("userHandle", "==", userID.value)
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

function* getBookedEquipments(userID: any) {
  const db = firebase.firestore();
  try {
    yield db
      .collection("equipment")
      .where("status", "==", "4")
      .where("userHandle", "==", userID.value)
      .onSnapshot(function(querySnapshot) {
        var equip: Array<any> = [];
        querySnapshot.forEach(function(doc) {
          let objID = { id: doc.id };
          let finalObj = Object.assign(objID, doc.data());
          db.collection("user").where("useruid", "==", doc.data().reservation[1].idUser)
          .onSnapshot(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
              console.log(doc);
            })
          })
          equip.push(finalObj);
        });
        return store.dispatch(displayListEquipments(equip));
      });
  } catch (error) {
    console.log(error);
  }
}

function* getUserForReserve(userID: any) {
  const db = firebase.firestore();
  yield db.collection("users")
    .where("useruid", "==", userID)
    .onSnapshot(function(querySnapshot) {
      var user: Array<any> = [];
      querySnapshot.forEach(function(doc) {
        user.push(doc);
      });
      console.log(user);
    });
}

export function* watchEquipments() {
  yield takeLatest("GET_EQUIPMENTS", getEquipments);
  yield takeLatest("GET_ALL_EQUIPMENTS", getAllEquipments);
  yield takeLatest("GET_ALL_EQUIPMENTS_SEARCH", getAllEquipmentsForSearch);
  yield takeLatest("GET_LOAN_EQUIPMENTS", getLoanEquipments);
  yield takeLatest("GET_BOOKED_EQUIPMENTS", getBookedEquipments);
}
