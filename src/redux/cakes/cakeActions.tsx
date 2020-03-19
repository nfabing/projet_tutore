import {BUY_CAKE} from "./cakeTypes";

export const buyCake = (numberOfCakes: number) => {
    return {
        type: BUY_CAKE,
        number: numberOfCakes,
    }
}
