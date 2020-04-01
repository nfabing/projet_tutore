import {all, takeLatest, call, put} from "redux-saga/effects";
import {reduxSagaFirebase} from "../../redux/store";
import {
    passwordChangeError,
    passwordChangeInprogress,
    passwordChangeSuccess
} from "../../redux/password/passwordActions";
import {reloginRequest} from "../../redux/checkLogin/CheckLoginActions";


export function* passwordSaga() {
    yield all([
        takeLatest('PASSWORD_CHANGE_REQUEST', passwordChange),

    ])
}

function* passwordChange(action: any) {
    const newPassword = action.newPassword
    try {
        yield put(passwordChangeInprogress())
        yield call(reduxSagaFirebase.auth.updatePassword, newPassword)
        yield put(passwordChangeSuccess())
    } catch (error) {
        if (error.code === 'auth/requires-recent-login') {
            console.log(error.code)
            yield put(reloginRequest())
        }

        yield put(passwordChangeError(error.code))

    }
}



