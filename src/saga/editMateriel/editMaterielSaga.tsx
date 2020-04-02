import {takeLatest, fork, put, call} from "redux-saga/effects";
import store, {reduxSagaFirebase} from "../../redux/store";
import firebase from "firebase";
import "firebase/firestore";
import {
    getOneEquipment,
    gotEquipmentUser,
    getListCategoriesForEdit,
    getOneEquipmentForEdit
} from "../../redux/editMateriel/EditMaterielAction";
import {getListCategories} from "../../redux/editMateriel/EditMaterielAction";

function* getOneEquipmentSaga(value: any) {
    //Récupération des infos de l'équipement
    const snapshot = yield call(
        reduxSagaFirebase.firestore.getDocument,
        `equipment/${value.id}`
    );
    const equipment = snapshot.data();
    yield put(getOneEquipment(equipment));
    yield fork(reduxSagaFirebase.firestore.syncCollection, "categories", {
        successActionCreator: getListCategories
    });
}

function* unSetCategories() {
    const data: Array<any> = [];
    yield put(getListCategoriesForEdit(data));
}

function* getOneEquipmentForEditSaga(value: any) {
    const db = firebase.firestore();
    const id = yield value.id;
    const docRef = db.collection("equipment").doc(id);
    docRef.get().then(function (doc) {
        let objID = {id: doc.id};
        let finalObj = Object.assign(objID, doc.data());
        return store.dispatch(getOneEquipmentForEdit(finalObj));
    });
    yield db.collection("categories").onSnapshot(function (querySnapshot) {
        var cat: Array<any> = [];
        querySnapshot.forEach(function (doc) {
            let objID = {id: doc.id};
            let finalObj = Object.assign(objID, doc.data());
            cat.push(finalObj);
        });
        return store.dispatch(getListCategoriesForEdit(cat));
    });
}

function* editEquipmentSaga(values: any) {
    const formValues = values.values.equipment;
    let date = null;
    if (formValues.buyingDate._d === undefined) {
        date = formValues.buyingDate;
    } else {
        date = formValues.buyingDate.format("YYYY");
    }
    yield fork(
        reduxSagaFirebase.firestore.updateDocument,
        "equipment/" + formValues.id,
        {
            name: formValues.name,
            status: formValues.status,
            description: formValues.description,
            buyingDate: date,
            category: formValues.category,
            brand: formValues.marque,
            modele: formValues.modele
        }
    );
}

function* getEquipmentOwner(data: any) {
    const uid = data.uid; //user uid
    const snapshot = yield call(
        reduxSagaFirebase.firestore.getDocument,
        `users/${uid}`
    );
    const user = snapshot.data();
    yield put(gotEquipmentUser(user));
}

function* editReserveSaga(values: any) {
    const idEquipement = values.id;
    const reservation = values.reservation;
    yield fork(
        reduxSagaFirebase.firestore.updateDocument,
        "equipment/" + idEquipement,
        {
            reservation: reservation,
            status: "4"
        }
    );
}

export function* watchEditEquipment() {
    yield takeLatest("GET_THAT_EQUIPMENT", getOneEquipmentSaga);
    yield takeLatest("GET_THAT_EQUIPMENT_FOR_EDIT", getOneEquipmentForEditSaga);
    yield takeLatest("EDIT_THAT_EQUIPMENT", editEquipmentSaga);
    yield takeLatest("UNSET_CATEGORIES", unSetCategories);
    yield takeLatest("EDIT_RESERVATION_EQUIPMENT", editReserveSaga);
    yield takeLatest("GET_THAT_EQUIPMENT_OWNER", getEquipmentOwner);
}
