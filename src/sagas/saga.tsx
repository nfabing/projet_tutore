import {takeLatest, put, delay} from 'redux-saga/effects';
import {BUY_ICECREAM} from "../redux/icecream/iceCreamTypes";
import {buyIceCreamAsync} from "../redux/icecream/iceCreamActions";


function* iceCreamAsync() {
    yield delay(4000);
    // création nouvel action
    yield put(buyIceCreamAsync());
}

export function* watchIceCreamBuy() {
    yield takeLatest(BUY_ICECREAM, iceCreamAsync);
}


