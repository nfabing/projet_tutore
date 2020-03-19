import {BUY_ICECREAM, BUY_ICECREAM_ASYNC} from "./iceCreamTypes";

const initialState = {
    numOfIceCream: 20,
}

const iceCreamReducer = (state = initialState, action: any) => {
    switch (action.type) {
        /*case BUY_ICECREAM:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }*/
        case BUY_ICECREAM_ASYNC:
            return {
                ...state,
                numOfIceCream: state.numOfIceCream - 1
            }

        default:
            return state

    }
}

export default iceCreamReducer
