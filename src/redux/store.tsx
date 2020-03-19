import {createStore, applyMiddleware, combineReducers,} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import cakeReducer from "./cakes/cakeReducer";
import iceCreamReducer from "./icecream/iceCreamReducer";
import { watchIceCreamBuy } from "../sagas/saga"

// creation d'une saga
const sagaMiddleware = createSagaMiddleware();


// On rassemble nos reducers en un reducer
const rootReducer = combineReducers({
    cake: cakeReducer,
    iceCream: iceCreamReducer,
})

// Creation de notre store avec nos reducers
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, sagaMiddleware)))

// on démarre l'observateur watchIceCreamBuy
sagaMiddleware.run(watchIceCreamBuy);

export default store
