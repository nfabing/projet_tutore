import {
    call,
    takeEvery,
    takeLatest,
    take,
    put, fork
} from 'redux-saga/effects';
import store, {reduxSagaFirebase} from "../../redux/store";
import 'firebase/firestore';
import firebase, {firestore} from "firebase";
import {getReservation} from '../../redux/Reservation/ReservationAction';


function* AddReservation(value: any) {
    console.log('DATAA', value.reservation[0]);
    const dateDebut = value.reservation[0].dateDebut;
    const dateFin = value.reservation[0].dateFin;
    const dateRestitution = value.reservation[0].dateRestitution;
    const idEquipment = value.reservation[0].idEquipment;
    const idSupplier = value.reservation[0].idSupplier;
    const idUser = value.reservation[0].idUser;
    const mailUser =value.reservation[0].mailUser;
    const nameEquipment = value.reservation[0].nameEquipment;
    const nameUser =value.reservation[0].nameUser;
    const status = value.reservation[0].status;
    const img = value.reservation[0].img;


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

export function* watchReservation() {
yield takeLatest('ADD_RESERVATION', AddReservation)
}
