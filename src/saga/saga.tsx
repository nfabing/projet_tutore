import {takeLatest, put, delay, call} from 'redux-saga/effects'
import {login} from "../redux/login/LoginActions";
import {reduxSagaFirebase} from "../redux/store";
import firebase from "firebase";

const authProvider = new firebase.auth.GoogleAuthProvider()

function* googleLoginAsync() {
    try {
        const data = yield call(reduxSagaFirebase.auth.signInWithPopup, authProvider)
        yield put(login())
    }
    catch (error) {
        console.log('ERREUR DE LOGIN !')
    }

}


export function* watchLogin() {
    yield takeLatest('LOGIN_GOOGLE', googleLoginAsync)
}
