import {all, call, put, select, takeLatest, take,} from "redux-saga/effects";
import {reduxSagaFirebase} from "../../redux/store";
import firebase from "firebase";
import {
    reloginEmailRequest,
    reloginError,
    reloginInProgress,
    reloginSuccess
} from "../../redux/checkLogin/CheckLoginActions";



// Auth Provider
const authGoogleProvider = new firebase.auth.GoogleAuthProvider();
const authGithubProvider = new firebase.auth.GithubAuthProvider()

export function* watchRelogin() {
    yield all([
        takeLatest('RELOGIN_REQUEST', relogingRequest)
    ])

}

function* relogingRequest() {
    const user = yield select(state => state.login.user)
    console.log('REAUTH')

    yield put(reloginInProgress())

    let providers = user.providerData
    let provider;

    while (provider = providers.pop()) {

        if (provider.providerId === 'google.com') { // google provider
            try {
                // @ts-ignore
                const result = yield call(reduxSagaFirebase.auth.signInWithPopup, authGoogleProvider)
                console.log(result)
                yield put(reloginSuccess())
                break
            } catch (error) {
                console.log(error.code)
                console.log(error.message)
                yield put(reloginError())
                break
            }
        }

        if (provider.providerId === 'github.com') { // github provider
            try {
                // @ts-ignore
                const result = yield call(reduxSagaFirebase.auth.signInWithPopup, authGithubProvider)
                console.log(result)
                yield put(reloginSuccess())
                break
            }catch (error) {
                console.log(error.code)
                console.log(error.message)
                yield put(reloginError())
                break
            }
        }

        if (provider.providerId === 'password') { // email provider
            try {
                yield put(reloginEmailRequest())
                yield take('RELOGIN_SUCCESS')
                yield put(reloginSuccess())
                break
            } catch (error) {
                console.log(error.code)
                console.log(error.message)
                yield put(reloginError())
                break
            }
        }


    }

}
