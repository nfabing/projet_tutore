import {takeLatest, call} from "redux-saga/effects";
import store, {reduxSagaFirebase} from "../../redux/store";
import firebase, {firestore} from "firebase";
import "firebase/firestore";

function* confirmReservation(values: any) {
    let date = new Date(values.values.equipment.restitution);
    let restitution = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
    console.log(restitution);
    console.log(values);

    const db = firebase.firestore();
    yield db.collection("reservation").doc(values.values.equipment.id)
        .set({
            dateRestitution: restitution,
            status: "0.5"
        }, {merge: true});

    yield db.collection("equipment").doc(values.values.equipment.idEquipment)
        .set({
            status: "1"
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

export function* watchConfirm() {
    yield takeLatest("CONFIRM_RESERVATION", confirmReservation);
    yield takeLatest("REFUSE_RESERVATION", refuseReservation);
}
