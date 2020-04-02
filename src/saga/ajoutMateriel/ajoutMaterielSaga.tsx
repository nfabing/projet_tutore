import {
    call,
    takeEvery,
    takeLatest,
    take,
    put
} from "redux-saga/effects";
import store, {reduxSagaFirebase} from "../../redux/store";
import "firebase/firestore";
import firebase from "firebase";
import {categories, oneCategories, categoriesForFournisseur} from "../../redux/ajoutMateriel/AjoutMeterielAction";

function* addEquipmentSaga(data: any) {
    const date = data.values.equipment.buyingDate.format("YYYY");
    const nameFile = Date.now();
    let equipementPhoto = '';
    let defaultPhoto = '';
    const upload = reduxSagaFirebase.storage.uploadFile("equipments/" + nameFile, data.values.upload[0].originFileObj)
    yield upload;
    defaultPhoto = yield call(reduxSagaFirebase.storage.getDownloadURL, 'equipments/defaultEquipment.png');
    if (upload) equipementPhoto = yield call(reduxSagaFirebase.storage.getDownloadURL, 'equipments/' + nameFile);
    const doc = yield call(reduxSagaFirebase.firestore.addDocument, "equipment", {
        name: data.values.equipment.name,
        status: 0 + "",
        userHandle: data.user,
        description: data.values.equipment.description,
        buyingDate: date,
        category: data.values.equipment.category,
        brand: data.values.equipment.marque,
        modele: data.values.equipment.modele,
        img: upload ? equipementPhoto : defaultPhoto
    });
}

function* getCategories() {
    const db = firebase.firestore();

    try {
        yield db.collection("categories").onSnapshot(function (querySnapshot) {
            var cat: Array<any> = [];
            querySnapshot.forEach(function (doc) {
                let objID = {id: doc.id};
                let finalObj = Object.assign(objID, doc.data());
                cat.push(finalObj);
            });
            return store.dispatch(categories(cat));
        })
    } catch {

    }
}

function* getCategoriesFromFournisseur() {
    const db = firebase.firestore();

    try {
        yield db.collection("categories").onSnapshot(function (querySnapshot) {
            var cat: Array<any> = [];
            querySnapshot.forEach(function (doc) {
                let objID = {id: doc.id};
                let finalObj = Object.assign(objID, doc.data());
                cat.push(finalObj);
            })
            return store.dispatch(categoriesForFournisseur(cat));
        })
    } catch {

    }
}

function* getOneCategories(values: any) {
    const db = firebase.firestore();
    const categorieId = values.id;
    try {
        const docRef = db.collection("categories").doc(categorieId);
        docRef.get().then((doc) => {
            let objID = {id: doc.id};
            let finalObj = Object.assign(objID, doc.data());
            return store.dispatch(oneCategories(finalObj));
        })
    } catch {

    }
}

function* unSetCategorie() {
    const data: Array<any> = [];
    yield put(categoriesForFournisseur(data))
}

export function* watchAddEquipment() {
    yield takeEvery("ADD_EQUIPMENT", addEquipmentSaga);
    yield takeLatest("GET_CATEGORIES", getCategories);
    yield takeLatest("GET_CATEGORIES_FORM_FOURNISSEUR", getCategoriesFromFournisseur);
    yield takeLatest("GET_ONE_CATEGORIES", getOneCategories);
    yield takeLatest("UNSET_CATEGORIES", unSetCategorie);
}
