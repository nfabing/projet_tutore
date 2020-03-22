import {
  takeLatest,
  put,
  delay,
  call,
  fork,
  takeEvery
} from "redux-saga/effects";
import { loginSuccess } from "../redux/login/LoginActions";
import { reduxSagaFirebase } from "../redux/store";
import firebase from "firebase";
import { listEquipments } from "../redux/dashboardFournisseur/DashboardFournisseurAction";

const authProvider = new firebase.auth.GoogleAuthProvider();

function* googleLoginAsync() {
  try {
    const data = yield call(
      reduxSagaFirebase.auth.signInWithPopup,
      authProvider
    );
    // console.log(data);
    yield put(loginSuccess(data));
  } catch (error) {
    console.log("ERREUR DE LOGIN !");
  }
}

function* getAllEquipments() {
  try {
    yield fork(reduxSagaFirebase.firestore.syncCollection,"equipment", {
      successActionCreator: listEquipments
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchLogin() {
  yield takeLatest("LOGIN_GOOGLE", googleLoginAsync);
}

export function* watchEquipments() {
  yield takeLatest("GET_EQUIPMENTS", getAllEquipments);
}
