import {takeLatest, takeEvery} from "redux-saga/effects";
import store from "../../redux/store";
import firebase from "firebase";
import "firebase/firestore";
import {
    listEquipments,
    listLoan,
    displayListEquipments,
    listWaiting,
    listEquipmentsForFournisseur, listBooked, listLoanFournisseur, displayReturnEquipments, listOverdue
} from "../../redux/dashboardFournisseur/DashboardFournisseurAction";
import {eventChannel, buffers} from "redux-saga";


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

        //RECUPERE LES EQUIPMENTS EN ATTENTE DE VALIDATION DE RESERVATION
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

        //RECUPERE LES EQUIPMENTS RESERVES
        yield db
            .collection("reservation")
            .where("idSupplier", "==", userID.value)
            .where("status", "==", "1")
            .onSnapshot(function (querySnapshot) {
                var booked: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    console.log(doc.data());
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    booked.push(finalObj);
                });
                return store.dispatch(listBooked(booked));
            });

        yield db
            .collection("reservation")
            .where("idSupplier", "==", userID.value)
            .where("status", "==", "3")
            .onSnapshot(function (querySnapshot) {
                var overdue: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let dateNow = new Date();

                    let dateResitution = (doc.data().dateFin);
                    dateResitution = dateResitution.split("/");
                    dateResitution = dateResitution[1] + "/" + dateResitution[0] + "/" + dateResitution[2];
                    dateResitution = new Date(dateResitution);

                    let dif = parseInt(Number((dateResitution.getTime() / 86400000) - (dateNow.getTime() / 86400000) + 1).toFixed(0));
                    if (dif < 0) {
                        let objID = {id: doc.id};
                        let finalObj = Object.assign(objID, doc.data());
                        overdue.push(finalObj);
                    }
                });
                console.log(overdue);
                return store.dispatch(listOverdue(overdue));
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

function* getReturnEquipment(userID: any) {
    const db = firebase.firestore();
    try {
        yield db
            .collection("reservation")
            .where("idSupplier", "==", userID.user.useruid)
            .where('status', "==", "4")
            .onSnapshot(function (querySnapshot) {
                let equip: Array<any> = [];
                querySnapshot.forEach(function (doc) {
                    let objID = {id: doc.id};
                    let finalObj = Object.assign(objID, doc.data());
                    equip.push(finalObj);
                });
                return store.dispatch(displayReturnEquipments(equip));
            });
    } catch (error) {
        console.log(error);
    }
}

function* setStatusReturn(IDs: any) {
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth()+1;
    let year = dateNow.getFullYear();
    let now = day+"/"+month+"/"+year;

    const db = firebase.firestore();
    try {
        yield db
            .collection("equipment").doc(IDs.idEquipment)
            .set({
                status: "0"
            }, {merge: true})
    } catch (error) {
        console.log(error);
    }
    try {
        yield db
            .collection("reservation").doc(IDs.idReserve.id)
            .set({
                status: "6",
                dateRestitution: now
            }, {merge: true})
    } catch (error) {
        console.log(error);
    }
}

function* setStatusReturnProbleme(IDs: any) {
    let dateNow = new Date();
    let day = dateNow.getDate();
    let month = dateNow.getMonth()+1;
    let year = dateNow.getFullYear();
    let now = day+"/"+month+"/"+year;

    const db = firebase.firestore();
    try {
        yield db
            .collection("equipment").doc(IDs.idEquipment)
            .set({
                status: "3"
            }, {merge: true})
    } catch (error) {
        console.log(error);
    }
    try {
        yield db
            .collection("reservation").doc(IDs.idReserve.id)
            .set({
                status: "6",
                dateRestitution: now
            }, {merge: true})
    } catch (error) {
        console.log(error);
    }
}

function* getOverdueEquipments(userID: any) {
    console.log(userID);
    const db = firebase.firestore();
    try {
        yield db.collection("reservation")
            .where("idSupplier", "==", userID.value)
            .where("status", "==", "3")
            .onSnapshot(function (querySnapshot) {
                let overdue: Array<any> = [];
                querySnapshot.forEach(function (doc) {

                    let dateNow = new Date();

                    let dateResitution = (doc.data().dateFin);
                    dateResitution = dateResitution.split("/");
                    dateResitution = dateResitution[1] + "/" + dateResitution[0] + "/" + dateResitution[2];
                    dateResitution = new Date(dateResitution);

                    let dif = parseInt(Number((dateResitution.getTime() / 86400000) - (dateNow.getTime() / 86400000) + 1).toFixed(0));
                    console.log(dateNow);
                    if (dif < 0) {
                        let objID = {id: doc.id};
                        let finalObj = Object.assign(objID, doc.data());
                        overdue.push(finalObj);
                    }
                });
                console.log(overdue);
                return store.dispatch(displayListEquipments(overdue));
            });
    } catch (error) {
        console.log(error);
    }

}

function* setBookedToLoan(ID: any) {
    console.log(ID.values);
    const db = firebase.firestore();
    try {
        yield db.collection("reservation").doc(ID.values.id)
            .set({
                status: "3"
            }, {merge: true});
    } catch (error) {
        console.log(error);
    }
    try {
        yield db.collection("equipment").doc(ID.values.idEquipment)
            .set({
                status: "1"
            }, {merge: true});
    } catch (error) {
        console.log(error);
    }

}
function* setBookedToCancel(ID: any) {
    console.log(ID.values);
    const db = firebase.firestore();
    try {
        yield db.collection("reservation").doc(ID.values)
            .set({
                status: "5"
            }, {merge: true});
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
    yield takeLatest("GET_RETURN_EQUIPMENT", getReturnEquipment);
    yield takeLatest("SET_STATUS_RETURN", setStatusReturn);
    yield takeLatest("SET_STATUS_RETURN_PROBLEME", setStatusReturnProbleme);
    yield takeLatest("GET_OVERDUE_EQUIPMENTS", getOverdueEquipments);
    yield takeLatest("SET_BOOKED_TO_LOAN", setBookedToLoan);
    yield takeLatest("SET_BOOKED_TO_CANCEL", setBookedToCancel);
}
