import { call, all, takeEvery, takeLatest, take, put, select} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import {firebaseApp, reduxSagaFirebase} from "../../redux/store";
import 'firebase/firestore';

import {
    syncReservations
} from "../../redux/Reservation/ReservationAction";



export function* watchReservation() {

    yield all([
        takeLatest('ADD_RESERVATION', AddReservation),
        takeLatest('SYNC_RESERVATIONS_REQUEST', watchUserReservations)
    ])

}


function* AddReservation(value: any) {
    const data = yield take('ADD_RESERVATION');
    const dateDebut = '1/4/2020';
    const dateFin = "5/4/2020";
    const dateRestitution = "";
    const idEquipment = "N1RAz3HAz5jB23JF7H2s";
    const idSupplier = "sf3PISVkvANxfLRLNijq0PMgGOq2";
    const idUser = "LDCx5ElO77dJZbKj1P2GYuCisvn1";
    const mailUser = "mailUser";
    const nameEquipment = "nomEquipment";
    const nameUser = "nameUser";
    const status = "0";
    const storeSupplier = "nomStore";

    const doc = yield call(reduxSagaFirebase.firestore.addDocument, 'reservation', {
        dateDebut:dateDebut,
        dateFin:dateFin,
        dateRestitution:dateRestitution,
        idEquipment:idEquipment,
        idSupplier:idSupplier,
        idUser:idUser,
        mailUser:mailUser,
        nameEquipment:nameEquipment,
        nameUser:nameUser,
        status:status,
        storeSupplier:storeSupplier
    });

}


function* watchUserReservations() {
    const db = firebaseApp.firestore()
    // user uid
    const uid = yield select(state => state.login.user.uid)
    const ref = db.collection('reservation').where('idUser', '==', uid)

    const channel = eventChannel(emit => ref.onSnapshot(emit))
    let reservations: any[] = []
    try {
        while (true) {
            const data = yield take(channel)

             data.forEach((reservation: any) => {

                 reservations.push(reservation.data())
            })

            yield put(syncReservations(reservations))

        }
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }


   yield take('LOGOUT_SUCCESS')
    console.log('STOPPED LISTENING TO RESERVATIONS')


}
