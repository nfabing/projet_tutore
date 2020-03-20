import {createStore, applyMiddleware, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from "redux-logger";
import loginReducer from "./login/loginReducer";
import {watchLogin} from "../saga/saga";

// Firebase imports
import firebase from 'firebase';
import '@firebase/firestore';
import firebaseConfig from "../config/config";
import ReduxSagaFirebase from "redux-saga-firebase";

// init Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig)

// init redux saga firebase
export const reduxSagaFirebase = new ReduxSagaFirebase(firebaseApp)

// logger pour debug
const logger = createLogger();

// Saga creation
const sagaMiddleware = createSagaMiddleware();

// Reducers
const rootReducer = combineReducers({
    login: loginReducer,
})


// Store Creation
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)))


// run sagaMiddleware
 sagaMiddleware.run(watchLogin)

export default store
