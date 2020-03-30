import {takeLatest, put, call, take, fork, select, all} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {
    loginError,
    loginInProgress,
    loginProviderFirstTime,
    loginSuccess,
    logoutSuccess, reLoginSuccess,
} from "../../redux/login/LoginActions";
import {firebaseApp, reduxSagaFirebase} from "../../redux/store";
import firebase from "firebase";


// Auth Provider
const authGoogleProvider = new firebase.auth.GoogleAuthProvider();
const authGithubProvider = new firebase.auth.GithubAuthProvider()

let defaultPhoto: string

export function* watchLogin() {

    yield all([
        fork(watchUser),
        takeLatest('LOGIN_GOOGLE', googleLoginAsync),
        takeLatest('LOGIN_GITHUB', githubLoginAsync),
        takeLatest('LOGIN_EMAIL', emailLoginAsync),
        takeLatest('SIGNUP_EMAIL', emailSignupAsync),
        takeLatest('CHANGE_USER_TO_SUPPLIER', changeToSupplierAsync),
        takeLatest('LOGOUT_REQUEST', signOut),

    ]);

}

function* googleLoginAsync() {

    try {
        yield call(reduxSagaFirebase.auth.signInWithPopup, authGoogleProvider)
        // successful login will trigger the watchUser, which will update the state
        console.log('GOOGLE LOGIN SUCCESS')

    } catch (error) {
        console.log('ERREUR DE LOGIN !', error.message)
        yield put(loginError(error.code))
    }
}

function* githubLoginAsync() {

    try {
        yield call(reduxSagaFirebase.auth.signInWithPopup, authGithubProvider)
        // successful login will trigger the watchUser, which will update the state
        console.log('GITHUB LOGIN SUCCESS')

    } catch (error) {
        console.log(error.code)
        console.log('ERREUR DE LOGIN !', error.message)
        yield put(loginError(error.code))
    }
}


function* signOut() {
    try {
        yield call(reduxSagaFirebase.auth.signOut)
        // successful logout will trigger the watchUser, which will update the state
    } catch (error) {
        console.log(error)
    }
}

function* watchUser() {
    const channel = yield call(reduxSagaFirebase.auth.channel);

    while (true) {
        const {error, user} = yield take(channel);

        if (user) {
            const userExist = yield checkUserExist(user.uid)

            if (!userExist && user.providerData[0].providerId !== 'password') {
                console.log('NEW USER GOOGLE/GITHUB')
                yield createUserDocument(user)
                yield put(loginProviderFirstTime())
            }
            console.log('CONNECTED', user)
            yield put(loginSuccess(user))


        } else {
            console.log('NOT CONNECTED', error )
            yield put(logoutSuccess())

        }
    }
}

function* checkUserExist(userId: string) {

        const snapshot = yield call(reduxSagaFirebase.firestore.getDocument, `users/${userId}`)
        const user = snapshot.data();
        return !!user
}

function* createUserDocument(user: any, action?: any) {

        // @ts-ignore
        yield call(reduxSagaFirebase.firestore.setDocument, `users/${user.uid}`,
            {
                creationDate: new Date().toUTCString(),
                displayName: action ? action.data.username : user.displayName,
                useruid: user.uid,
                userType: action && 'userType' in action ? action.data.userType : 'user',
                email: user.email,
                emailVerified: user.emailVerified,
                phoneNumber: action ? action.data.phoneNumber : '',
                photoURL: user.photoURL === null ? defaultPhoto : user.photoURL,
                adress: action && 'adress' in action ? action.data.adress : '',
                city: action && 'city' in action ? action.data.city : '',
                postalCode: action && 'postalCode' in action ? action.data.postalCode : '',
                storeName: action && 'storeName' in action ? action.data.storeName : '',

            })
}


function* emailSignupAsync(action: any) {
    try {
        yield put(loginInProgress())
        const user = yield call(reduxSagaFirebase.auth.createUserWithEmailAndPassword, action.data.email, action.data.password)
        // successful login will trigger the watchUser, which will update the state
        defaultPhoto = yield call(reduxSagaFirebase.storage.getDownloadURL, 'users/default.png')

        console.log('NEW USER EMAIL', user);
        console.log('NEW USER FORM', action)
        yield createUserDocument(user.user, action)
        yield call(reduxSagaFirebase.auth.updateProfile, {
            displayName: action.data.username,
            photoURL: defaultPhoto,
        })


    } catch (error) {
        console.log('code : ', error.code)
        console.log(error.message)

        yield put(loginError(error.code))

    }
}


function* emailLoginAsync(action: any) {
    try {
        yield put(loginInProgress())
        const user = yield select(state => state.login.user)
        yield call(reduxSagaFirebase.auth.signInWithEmailAndPassword, action.data.email, action.data.password)
        // successful login will trigger the watchUser, which will update the state

        if (user) {
            yield put(reLoginSuccess())
        }



    } catch (error) {
        console.log('code : ', error.code)
        console.log(error.message)

        yield put(loginError(error.code))

    }
}

function* changeToSupplierAsync(action: any) {

    const user = yield select(state => state.login.user)
    const uid = user.uid;
    console.log('CHANGE USER TO SUPPLIER', uid)

    // @ts-ignore
    yield call(reduxSagaFirebase.firestore.setDocument, `users/${uid}`,
        {
            adress: action.data.adress,
            city: action.data.city,
            postalCode: action.data.postalCode,
            storeName: action.data.storeName,
            userType: 'supplier',
        }, {merge: true})
}


