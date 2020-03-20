import {takeLatest, put, delay, call} from 'redux-saga/effects'
import {loginSuccess} from "../redux/login/LoginActions";
import {reduxSagaFirebase} from "../redux/store";
import firebase from "firebase";

const authProvider = new firebase.auth.GoogleAuthProvider()

function* googleLoginAsync() {
    try {
        const data = yield call(reduxSagaFirebase.auth.signInWithPopup, authProvider)
        // console.log(data);
        yield put(loginSuccess(data))
    }
    catch (error) {
        console.log('ERREUR DE LOGIN !')
    }

}


export function* watchLogin() {
    yield takeLatest('LOGIN_GOOGLE', googleLoginAsync)
}
