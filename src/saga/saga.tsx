import {
  takeLatest,
  put,
  delay,
  call,
  fork,
  takeEvery,
  take, select
} from "redux-saga/effects";
import { loginSuccess } from "../redux/login/LoginActions";
import { reduxSagaFirebase } from "../redux/store";
import firebase, { firestore } from "firebase";
import "firebase/firestore";
import {
  listEquipments,
  listLoan
} from "../redux/dashboardFournisseur/DashboardFournisseurAction";
import { addEquipment } from "../redux/ajoutMateriel/AjoutMeterielAction";
import { getOneEquipment} from "../redux/editMateriel/EditMaterielAction";
import firebaseConfig from "../config/config";
import { getEquipmentID } from "../components/EditMateriel";

const authProvider = new firebase.auth.GoogleAuthProvider();

function* googleLoginAsync() {
  try {
    const data = yield call(
      reduxSagaFirebase.auth.signInWithPopup,
      authProvider
    );
    yield put(loginSuccess(data));
  } catch (error) {
    console.log("ERREUR DE LOGIN !");
  }
}

function* getAllEquipments() {
  try {
    yield fork(reduxSagaFirebase.firestore.syncCollection, "equipment", {
      successActionCreator: listEquipments
    });
    //@ts-ignore
    yield fork(reduxSagaFirebase.firestore.syncCollection,
      firestore().collection('equipment').where("status", "==", "1"), {
      successActionCreator: listLoan
    })
  } catch (error) {
    console.log(error);
  }
}


function* addEquipmentSaga() {

  const data = yield take("ADD_EQUIPMENT");
  const date = data.values.equipment.buyingDate.format('YYYY');
  const doc = yield call(
    reduxSagaFirebase.firestore.addDocument,
    'equipment',
    {
      name: data.values.equipment.name,
      status: data.values.equipment.status,
      userHandle: 'Nicolas',
      description: data.values.equipment.description,
      buyingDate: date,
      category: data.values.equipment.category,
      brand: data.values.equipment.marque,
      modele: data.values.equipment.modele
    }
  );
}

function* getOneEquipmentSaga(){
  const id = yield select(getEquipmentID);
  const data = yield fork(
    reduxSagaFirebase.firestore.syncDocument,
    'equipment/'+id,
    { successActionCreator: getOneEquipment }
  );
}

function* editEquipmentSaga(){
  console.log("zzzzzz");
  const id = yield select(getEquipmentID);
  const data = yield take("EDIT_THAT_EQUIPMENT");
  const date = data.values.equipment.buyingDate.format('YYYY');
  console.log(data);
  yield call(
    reduxSagaFirebase.firestore.updateDocument,
    'equipment/'+id,
    {
      name: data.values.equipment.name,
      status: data.values.equipment.status,
      userHandle: 'Nicolas',
      description: data.values.equipment.description,
      buyingDate: date,
      category: data.values.equipment.category,
      brand: data.values.equipment.marque,
      modele: data.values.equipment.modele
    }
  );
}


export function* watchLogin() {
  yield takeLatest("LOGIN_GOOGLE", googleLoginAsync);
}

export function* watchEquipments() {
  yield takeLatest("GET_EQUIPMENTS", getAllEquipments);
}

export function* watchAddEquipment() {
  yield takeEvery("ADD_EQUIPMENT", addEquipmentSaga);
}

export function* watchEditEquipment() {
  yield takeLatest("EDIT_THAT_EQUIPMENT", editEquipmentSaga);
  yield takeLatest("GET_THAT_EQUIPMENT", getOneEquipmentSaga);
}
