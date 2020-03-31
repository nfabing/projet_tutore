import {all, takeLatest, call, put, select} from "redux-saga/effects";
import {reduxSagaFirebase} from "../../redux/store";
import {reloginRequest} from "../../redux/checkLogin/CheckLoginActions";
import {emailChangeError, emailChangeInprogress, emailChangeSuccess} from "../../redux/email/emailActions";


export function* emailSaga() {
    yield all([
        takeLatest('EMAIL_CHANGE_REQUEST', emailChange),

    ])
}

function* emailChange(action: any) {
    const uid = yield select(state => state.login.user.uid)
    const newEmail = action.newEmail
    try {
        yield put(emailChangeInprogress())
        yield call(reduxSagaFirebase.auth.updateEmail, newEmail)
        yield call(reduxSagaFirebase.firestore.updateDocument, `users/${uid}`,
            'email', newEmail)
        yield put(emailChangeSuccess())
    } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
            console.log(error.code)
            yield put(reloginRequest())
        }

        yield put(emailChangeError(error.code))

    }
}



