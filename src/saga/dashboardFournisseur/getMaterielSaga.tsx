import {takeLatest, take, put, fork, takeEvery} from "redux-saga/effects";
import store, {reduxSagaFirebase} from "../../redux/store";
import firebase, {firestore} from "firebase";
import "firebase/firestore";
import {
    listEquipments,
    listLoan,
    displayListEquipments,
    listWaiting,
    listEquipmentsForFournisseur, listBooked, listLoanFournisseur
} from "../../redux/dashboardFournisseur/DashboardFournisseurAction";
import {eventChannel, buffers} from "redux-saga";
import {emit} from "cluster";
import {equal} from "assert";

function* getEquipments(userID: any) {
    const db = firebase.firestore();
    try {
        yield db.collection("equipment")
            .where("userHandle", "==", userID.value).onSnapshot(function (querySnapshot) {
            var equip: Array<any> = [];
            querySnapshot.forEach(function (doc) {
                let objID = {id: doc.id};
                let finalObj = Object.assign(objID, doc.data());
                equip.push(finalObj);
            });
            return store.dispatch(listEquipmentsForFournisseur(equip));
        });

        yield db
            .collection("reservation")
            .where("status", "==", "3")
            .where("idSupplier", "==", userID.value)
            .onSnapshot(function (querySnapshot) {
                var loan: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    loan.push(finalObj);
                });
                return store.dispatch(listLoanFournisseur(loan));
            });

        //RECUPERE LES EQUIPMENT EN ATTENTE DE VALIDATION DE RESERVATION
        yield db
            .collection("reservation")
            .where("idSupplier", "==", userID.value)
            .where("status", "==", "0")
            .onSnapshot(function (querySnapshot) {
                var waiting: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    waiting.push(finalObj);
                });
                return store.dispatch(listWaiting(waiting));
            });

        //RECUPERE LES EQUIPMENT EN ATTENTE DE VALIDATION DE RESERVATION
        yield db
            .collection("reservation")
            .where("idSupplier", "==", userID.value)
            .where("status", "==", "1")
            .onSnapshot(function (querySnapshot) {
                var booked: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    booked.push(finalObj);
                });
                return store.dispatch(listBooked(booked));
            });
    } catch (error) {
        console.log(error);
    }
}

function* getAllEquipments(userID: any) {
    const db = firebase.firestore();
    try {
        yield db.collection("equipment")
            .where("userHandle", "==", userID.value)
            .onSnapshot(function (querySnapshot) {
                var equip: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
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
        yield db.collection("equipment")
            .onSnapshot(function (querySnapshot) {
                let equip: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    equip.push(finalObj);
                });
                return store.dispatch(listEquipments(equip));
            });

        yield db
            .collection("equipment")
            .where("status", "==", "1")
            .onSnapshot(function (querySnapshot) {
                var loan: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
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
            .collection("reservation")
            .where("status", "==", "3").where("idSupplier", "==", userID.value)
            .onSnapshot(function (querySnapshot) {
                var loan: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    loan.push(finalObj);
                });
                return store.dispatch(displayListEquipments(loan));
            });
    } catch (error) {
        console.log(error);
    }
}

function* getWaitingEquipments(userID: any) {
    const db = firebase.firestore();
    try {
        yield db
            .collection("reservation")
            .where("idSupplier", "==", userID.value)
            .where('status', "==", "0")
            .onSnapshot(function (querySnapshot) {
                let equip: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    equip.push(finalObj);
                });
                return store.dispatch(displayListEquipments(equip));
            });
    } catch (error) {
        console.log(error);
    }
}

function* getBookedEquipments(userID: any) {
    const db = firebase.firestore();
    try {
        yield db
            .collection("reservation")
            .where("idSupplier", "==", userID.value)
            .where('status', "==", "1")
            .onSnapshot(function (querySnapshot) {
                let equip: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    equip.push(finalObj);
                });
                return store.dispatch(displayListEquipments(equip));
            });
    } catch (error) {
        console.log(error);
    }
}


export function* watchEquipments() {
    yield takeEvery("GET_EQUIPMENTS", getEquipments);
    yield takeLatest("GET_ALL_EQUIPMENTS", getAllEquipments);
    yield takeLatest("GET_ALL_EQUIPMENTS_SEARCH", getAllEquipmentsForSearch);
    yield takeLatest("GET_LOAN_EQUIPMENTS", getLoanEquipments);
    yield takeLatest("GET_WAITING_EQUIPMENTS", getWaitingEquipments);
    yield takeLatest("GET_BOOKED_EQUIPMENTS", getBookedEquipments);
}
