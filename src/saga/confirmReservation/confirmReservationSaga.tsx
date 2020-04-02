import {takeLatest, fork} from "redux-saga/effects";
import {reduxSagaFirebase} from "../../redux/store";
import firebase from "firebase";
import "firebase/firestore";

function* confirmReservation(values: any) {
    // let date = new Date(values.values.equipment.restitution);
    // let restitution = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    // console.log(restitution);
    // console.log(values);
    console.log(values);

    const db = firebase.firestore();
    yield db.collection("reservation").doc(values.values.id)
        .set({
            status: "0.5"
        }, {merge: true});

    yield db.collection("equipment").doc(values.values.idEquipment)
        .set({
            status: "2"
        }, {merge: true});
}

function* refuseReservation(values: any) {
    console.log(values);

    const db = firebase.firestore();
    yield db.collection("reservation").doc(values.values)
        .set({
            status: "5"
        }, {merge: true});
}

function* ConfirmOkReservation(values: any) {
    const idResevration = values.id;
    yield fork(
        reduxSagaFirebase.firestore.updateDocument,
        "reservation/" + idResevration,
        {
            status: "1"
        }
    );
}

export function* watchConfirm() {
    yield takeLatest("CONFIRM_RESERVATION", confirmReservation);
    yield takeLatest("CONFIRM_OK_RESERVATION", ConfirmOkReservation);
    yield takeLatest("REFUSE_RESERVATION", refuseReservation);
}
