import {all, call, fork, put, select, takeLatest, take, cancel, delay} from "redux-saga/effects";
import {eventChannel} from 'redux-saga'
import {reduxSagaFirebase} from "../redux/store";
import {firebaseApp} from '../redux/store'
import {syncProfil} from "../redux/profil/profilActions";


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
    //TODO : comparer les valeurs du form avec les valeurs stocker, si l'email ou le displayName change,
    // alors il faut également le changer directement sur le profil (a faire dans les sagas)
    const uid = yield select(state => state.login.user.uid)

    console.log('SAGA', values)

    // @ts-ignore
    yield call(reduxSagaFirebase.firestore.setDocument, `users/${uid}`, values.data, {merge: true})
}



function* uploadProfilPicture(file: any) {

    const uid = yield select(state => state.login.user.uid)
    const task = reduxSagaFirebase.storage.uploadFile(`users/${uid}`, file.img);
    yield task

    // récupération de l'url de la photo
    const url = yield call(reduxSagaFirebase.storage.getDownloadURL, `users/${uid}`)

    // @ts-ignore
    yield call(reduxSagaFirebase.firestore.updateDocument, `users/${uid}`, 'photoURL', url)
    yield call(reduxSagaFirebase.auth.updateProfile, {photoURL: url})

}
