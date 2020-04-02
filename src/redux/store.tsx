import {createStore, applyMiddleware, combineReducers} from 'redux'

// middlewares
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension';
import {createLogger} from "redux-logger";

// sagas
import {watchReservation} from '../saga/Reservation/ReservationSaga';
import { watchReserve } from "../saga/listReserveSaga/listReserveSaga";
import {watchLogin} from "../saga/login/loginSaga";
import {profilSaga} from "../saga/profil/profilSaga"
import {passwordSaga} from "../saga/changePassword/passwordSaga"
import { watchAddEquipment } from "../saga/ajoutMateriel/ajoutMaterielSaga";
import { watchEditEquipment } from "../saga/editMateriel/editMaterielSaga";
import { watchEquipments } from "../saga/dashboardFournisseur/getMaterielSaga";
import { watchConfirm } from "../saga/confirmReservation/confirmReservationSaga";
import {emailSaga} from "../saga/changeEmail/emailSaga";
import {watchRelogin} from "../saga/checkLogin/checkLoginSaga";

// reducers
import listReserveReducer from "./listReserve/listReserveReducer";
import {ReservationReducer} from './Reservation/ReservationReducer';
import confirmReservationReducer from "./confirmReservation/ConfirmReservationReducer";
import profilReducer from "./profil/profilReducer";
import passwordReducer from "./password/passwordReducer";
import CheckLoginReducer from "./checkLogin/CheckLoginReducer"
import DashboardFournisseurReducer from "./dashboardFournisseur/DashboardFournisseurReducer";
import AjoutMaterielReducer from ".//ajoutMateriel/AjoutMaterielReducer";
import loginReducer from "./login/loginReducer";
import emailReducer from "./email/emailReducer";
import EditMaterielReducer from "./editMateriel/EditMaterielReducer";

// Firebase imports
import firebaseConfig from "../config/config";
import firebase from "firebase";
import "@firebase/firestore";
import ReduxSagaFirebase from "redux-saga-firebase";


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
    confirmReservation: confirmReservationReducer,
    reservation: ReservationReducer,
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
sagaMiddleware.run(watchReservation);

export default store;
