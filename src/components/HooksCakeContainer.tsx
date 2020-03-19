import React from "react";
import {useSelector, useDispatch} from 'react-redux'
import {buyCake} from "../redux/cakes/cakeActions";

interface RootState {
    cake: any;
    numOfCakes: number
}

const HooksCakeContainer = () => {

    // Récupère le state numOfCakes de notre container Redux
    const numOfCakes = useSelector((state: RootState) => state.cake.numOfCakes)

    // Récupération du Dispatch
    const dispatch = useDispatch()

    return(
        <div>
            <h2>Num of cakes - {numOfCakes}</h2>
            <button onClick={() => dispatch(buyCake(5))}>Buy cakes</button>
        </div>
    )
}

export default HooksCakeContainer
