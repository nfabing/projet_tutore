import React from "react";
import {connect} from 'react-redux'
import {buyIceCream, buyIceCreamAsync} from "../redux/icecream/iceCreamActions";



const IceCreamContainer = (props: any) => {
    return(
        <div>
            <h2>Ice Cream - {props.numOfIceCream}</h2>
            {/*<button onClick={props.buyIceCream}>Buy IceCream</button>*/}
            <button onClick={props.buyIceCream}>Buy IceCreamAsync (SAGA)</button>
        </div>
    )
}

// appeller a chaque fois que le state du store change, renvoie tout les states du store, on return uniquement les informations qui nous sont utiles
const mapStateToProps = (state: any) => {
    return {
        numOfIceCream: state.iceCream.numOfIceCream
    }
}

// Définir les actions que je souhaite utiliser dans mon component
const mapDispatchToProps = (dispatch: any) => {
    return {
        buyIceCream: () => dispatch(buyIceCream()),
        /*buyIceCreamAsync: () => dispatch(buyIceCreamAsync())*/
    }
}

// Connexion du composant au store
export default connect(mapStateToProps, mapDispatchToProps)(IceCreamContainer)
