import { takeLatest, call } from "redux-saga/effects";
import store, { reduxSagaFirebase } from "../../redux/store";
import firebase, { firestore } from "firebase";
import "firebase/firestore";

function* confirmReservation(values: any) {
    let date = new Date(values.values.equipment.restitution);
    let restitution = date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear();

    console.log(restitution);
//   const db = firebase.firestore();
//   yield db.collection("equipment").doc(values.values.id)
//   .update({
//       "reservation[1].restitution": restitution
//   })
}

export function* watchConfirm() {
  yield takeLatest("CONFIRM_RESERVATION", confirmReservation);
}
