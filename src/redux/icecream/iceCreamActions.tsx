// Actions creators
import {BUY_ICECREAM, BUY_ICECREAM_ASYNC} from "./iceCreamTypes";

export const buyIceCream = () => {
    return {
        type: BUY_ICECREAM,
    }
}

export const buyIceCreamAsync = () => {
    return {
        type: BUY_ICECREAM_ASYNC,
    }
}
