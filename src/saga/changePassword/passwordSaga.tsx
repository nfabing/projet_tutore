import {all, takeLatest, take, call, put, select} from "redux-saga/effects";
import {firebaseApp, reduxSagaFirebase} from "../../redux/store";
import {
    passwordChangeError,
    passwordChangeInprogress,
    passwordChangeNeedAuth, passwordChangeNeedAuthSuccess,
    passwordChangeSuccess
} from "../../redux/password/passwordActions";


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
            yield call(authReauthenticate)
        } else {
            yield put(passwordChangeError(error))
        }

    }
}

function* authReauthenticate() {
    const user = yield select(state => state.login.user)
    console.log('REAUTH')

    let providers = user.providerData
    let provider;

    while (provider = providers.pop()) {

        if (provider.providerId === 'google.com') {
            try {
                // @ts-ignore
                const result = yield call(reduxSagaFirebase.auth.signInWithPopup, authGoogleProvider)
                console.log(result)
                break
            } catch (error) {
                console.log(error.code)
                console.log(error.message)
                break
            }
        }

        if (provider.providerId === 'github.com') {
            try {
                // @ts-ignore
                const result = yield call(reduxSagaFirebase.auth.signInWithPopup, authGithubProvider)
                console.log(result)
                break
            }catch (error) {
                console.log(error.code)
                console.log(error.message)
                break
            }
        }

        if (provider.providerId === 'password') {
            try {
                yield put(passwordChangeNeedAuth())
                yield take('RELOGIN_SUCCESS')
                console.log('YES LE RELOG MARCHE AHAHA')
                yield put(passwordChangeNeedAuthSuccess())
                break
            }catch (error) {
                console.log(error.code)
                console.log(error.message)
                break
            }
        }


    }

}

