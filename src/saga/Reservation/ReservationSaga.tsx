import {
    call,
    takeEvery,
    takeLatest,
    take,
    put
} from 'redux-saga/effects';
import store, {reduxSagaFirebase} from "../../redux/store";
import 'firebase/firestore';
import firebase, {firestore} from "firebase";
import {getReservation} from '../../redux/Reservation/ReservationAction';


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

export function* watchReservation() {
yield takeLatest('ADD_RESERVATION', AddReservation)
}
