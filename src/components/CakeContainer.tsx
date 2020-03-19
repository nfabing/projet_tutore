import React from "react";
import {connect} from 'react-redux'
import {buyCake} from "../redux/cakes/cakeActions";



const CakeContainer = (props: any) => {
    return (
        <div>
            <h2>Cake - {props.numberOfCakes}</h2>
            <button onClick={props.buyCake}>BUY CAKE</button>
        </div>
    )
}

// appeller a chaque fois que le state du store change, renvoie tout les states du store, on return uniquement les informations qui nous sont utiles
const mapStateToProps = (state: any) => {
    return {
        numberOfCakes: state.cake.numOfCakes
    }
}

// Définir les actions que je souhaite utiliser dans mon component
const mapDispatchToProps = (dispatch: any) => {
    return {
        buyCake: () => dispatch(buyCake(5))
    }
}

// Connexion du composant au store
export default connect(mapStateToProps, mapDispatchToProps)(CakeContainer)
