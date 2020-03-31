import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from "redux-logger";
import loginReducer from "./login/loginReducer";
import CheckLoginReducer from "./checkLogin/CheckLoginReducer"
import DashboardFournisseurReducer from "./dashboardFournisseur/DashboardFournisseurReducer";
import AjoutMaterielReducer from ".//ajoutMateriel/AjoutMaterielReducer";
import { watchAddEquipment } from "../saga/ajoutMateriel/ajoutMaterielSaga";
import { watchEditEquipment } from "../saga/editMateriel/editMaterielSaga";
import { watchEquipments } from "../saga/dashboardFournisseur/getMaterielSaga";
import { watchConfirm } from "../saga/confirmReservation/confirmReservationSaga";
import profilReducer from "./profil/profilReducer";
import passwordReducer from "./password/passwordReducer";
import {profilSaga} from "../saga/profil/profilSaga"
import {passwordSaga} from "../saga/changePassword/passwordSaga"
import {watchLogin} from "../saga/login/loginSaga";
import EditMaterielReducer from "./editMateriel/EditMaterielReducer";
import confirmReservationReducer from "./confirmReservation/ConfirmReservationReducer";
import { watchReserve } from "../saga/listReserveSaga/listReserveSaga";
import listReserveReducer from "./listReserve/listReserveReducer";

//TODO: TRIER CE BORDEL

// Firebase imports
import firebase from "firebase";
import "@firebase/firestore";
import firebaseConfig from "../config/config";
import ReduxSagaFirebase from "redux-saga-firebase";
import EditMaterielReducer from "./editMateriel/EditMaterielReducer";
import {watchRelogin} from "../saga/checkLogin/checkLoginSaga";
import emailReducer from "./email/emailReducer";
import {emailSaga} from "../saga/changeEmail/emailSaga";

// init Firebase
export const firebaseApp = firebase.initializeApp(firebaseConfig);

// init redux saga firebase
export const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp);

// logger pour debug
const logger = createLogger();

// Saga creation
const sagaMiddleware = createSagaMiddleware();

// Reducers
const rootReducer = combineReducers({
    login: loginReducer,
    dashboardFournisseur: DashboardFournisseurReducer,
    ajoutMateriel: AjoutMaterielReducer,
    editMateriel: EditMaterielReducer,
    user: profilReducer,
    password: passwordReducer,
    email: emailReducer,
    checkLogin: CheckLoginReducer,
    listReserve: listReserveReducer,
    confirmReservation: confirmReservationReducer
})


// Store Creation
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(logger, sagaMiddleware))
);

// run sagaMiddleware
sagaMiddleware.run(watchLogin)
sagaMiddleware.run(profilSaga)
sagaMiddleware.run(watchRelogin)
sagaMiddleware.run(passwordSaga)
sagaMiddleware.run(emailSaga)
sagaMiddleware.run(watchEquipments);
sagaMiddleware.run(watchAddEquipment);
sagaMiddleware.run(watchEditEquipment);
sagaMiddleware.run(watchReserve);
sagaMiddleware.run(watchConfirm);

export default store;
