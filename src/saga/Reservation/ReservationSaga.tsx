import {call, all, takeLatest, take, put, select, fork} from 'redux-saga/effects';
import {eventChannel} from 'redux-saga';
import store, {firebaseApp, reduxSagaFirebase} from "../../redux/store";
import 'firebase/firestore';
import firebase from "firebase";
import {getConfirmReservation, syncReservations} from '../../redux/Reservation/ReservationAction';

export function* watchReservation() {

    yield all([
        takeLatest('ADD_RESERVATION', AddReservation),
        takeLatest('SYNC_RESERVATIONS_REQUEST', watchUserReservations),
        takeLatest('GET_CONFIRM_OK_RESERVATION', GetConfirmOkReservation),
        takeLatest('RETURN_RESERVATION_REQUEST', returnReservation)
    ])

}


function* AddReservation(value: any) {
    console.log('DATAA', value.reservation[0]);
    const dateDebut = value.reservation[0].dateDebut;
    const dateFin = value.reservation[0].dateFin;
    const dateRestitution = value.reservation[0].dateRestitution;
    const idEquipment = value.reservation[0].idEquipment;
    const idSupplier = value.reservation[0].idSupplier;
    const idUser = value.reservation[0].idUser;
    const mailUser = value.reservation[0].mailUser;
    const nameEquipment = value.reservation[0].nameEquipment;
    const nameUser = value.reservation[0].nameUser;
    const status = value.reservation[0].status;
    const img = value.reservation[0].img;


    const doc = yield call(reduxSagaFirebase.firestore.addDocument, 'reservation', {
        dateDebut: dateDebut,
        dateFin: dateFin,
        dateRestitution: dateRestitution,
        idEquipment: idEquipment,
        idSupplier: idSupplier,
        idUser: idUser,
        mailUser: mailUser,
        nameEquipment: nameEquipment,
        nameUser: nameUser,
        status: status,
        img: img
    });
    yield fork(
        reduxSagaFirebase.firestore.updateDocument,
        "equipment/" + idEquipment,
        {
            status: "4"
        }
    );

}


function* GetConfirmOkReservation(values: any) {
    const idUser = values.id;
    const db = firebase.firestore();
    yield db.collection("reservation")
        .where("status", "==", '0.5')
        .where('idUser', '==', idUser)
        .onSnapshot(function (querySnapshot) {
            let reserv: Array<any> = [];
            querySnapshot.forEach(function (doc) {
                let objID = {id: doc.id};
                let finalObj = Object.assign(objID, doc.data());
                reserv.push(finalObj);
            });
            return store.dispatch(getConfirmReservation(reserv));
        });
}


function* watchUserReservations() {
    const db = firebaseApp.firestore()
    // user uid
    const uid = yield select(state => state.login.user.uid)
    const ref = db.collection('reservation')
        .where('idUser', '==', uid)
        .where('status', 'in', ['0', '0.5', '1', '2', '3'])


    const channel = eventChannel(emit => ref.onSnapshot(emit))
    let reservations: any[] = []
    try {
        while (true) {
            const data = yield take(channel)

            data.forEach((reservation: any) => {
                let id = {id: reservation.id};
                reservations.push(Object.assign(id, reservation.data()))
            })

            yield put(syncReservations(reservations))
            reservations = []

        }
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }


    yield take('LOGOUT_SUCCESS')
    console.log('STOPPED LISTENING TO RESERVATIONS')

}

function* returnReservation(data: any) {
    const db = firebaseApp.firestore()

    try {
        let ref
        // @ts-ignore
        const doc = yield call(reduxSagaFirebase.firestore.getDocument,
            db.collection('reservation').where('idUser', '==', data.idUser).where('idEquipment', '==', data.idEquipment).limit(1))

        doc.forEach((reservation: any) => {
            ref = reservation.ref
        })

        // @ts-ignore
        yield call(reduxSagaFirebase.firestore.updateDocument, ref, 'status', '4')
    } catch (error) {
        console.log(error.code)
        console.log(error.message)
    }


}