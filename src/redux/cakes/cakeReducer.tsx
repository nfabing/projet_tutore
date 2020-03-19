import {BUY_CAKE} from "./cakeTypes";

// déclarer les valeurs initiales
const initialState = {
    numOfCakes: 10,
}

const cakeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case BUY_CAKE:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.number
            }
        default:
            return state
    }
}

export default cakeReducer
