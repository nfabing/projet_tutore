import {all, call, put, select, takeLatest, take} from "redux-saga/effects";
import {eventChannel} from 'redux-saga'
import {reduxSagaFirebase} from "../../redux/store";
import {firebaseApp} from '../../redux/store'
import {syncProfil} from "../../redux/profil/profilActions";
import {reloginRequest} from "../../redux/checkLogin/CheckLoginActions";


export function* profilSaga() {
    yield all([
        takeLatest('LOGIN_SUCCESS', watchUserProfil),
        takeLatest('CHANGE_PROFIL_PICTURE', uploadProfilPicture),
        takeLatest('CHANGE_PROFIL_INFOS', editUserProfil),
    ])
}


function* watchUserProfil() {
    const uid = yield select(state => state.login.user.uid)
    const db = firebaseApp.firestore()
    const ref = db.collection('users').doc(uid)

    const channel = eventChannel(emit => ref.onSnapshot(emit))

    try {
        while (true) {
            const data = yield take(channel)
            yield put(syncProfil(data.data()))
        }
    } catch (error) {
        console.log('ERROR', error)
    }

    yield take('LOGOUT_SUCCESS')
    console.log('STOPPED LISTENING TO PROFIL DATA')
}


function* editUserProfil(values: any) {

    const uid = yield select(state => state.login.user.uid)
    console.log('SAGA', values)

    if ('displayName' in values.data) { // on met à jour le displayName dans User de firebase
        console.log('DISPLAY NAME')
        try {
            yield call(reduxSagaFirebase.auth.updateProfile, {
                displayName: values.data.displayName,
            })
        } catch (error) {
            console.log('ERROR UPDATE PROFIL DISPAY NAME')
            console.log(error.code)
        }
    }

    if ('email' in values.data) { // on met à jour l'email dans User de firebase
        console.log('DISPLAY EMAIL')
        try {
            yield call(reduxSagaFirebase.auth.updateEmail, values.data.email)

        } catch (error) {
            if (error.code === 'auth/requires-recent-login') {
                yield put(reloginRequest())
            }
            console.log(error.code)

        }
    }

    // @ts-ignore
    yield call(reduxSagaFirebase.firestore.setDocument, `users/${uid}`, values.data, {merge: true})

}


function* uploadProfilPicture(file: any) {
    const uid = yield select(state => state.login.user.uid)

    // upload de la photo
    const task = reduxSagaFirebase.storage.uploadFile(`users/${uid}`, file.img);
    yield task

    // récupération de l'url de la photo
    const url = yield call(reduxSagaFirebase.storage.getDownloadURL, `users/${uid}`)

    // MAJ de l'url dans le document
    yield call(reduxSagaFirebase.firestore.updateDocument, `users/${uid}`, 'photoURL', url)

    // MAJ de l'url dans le profil User
    yield call(reduxSagaFirebase.auth.updateProfile, {photoURL: url})

}
