import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {connect} from "react-redux";
import './DetailsPage.css';
import {Skeleton} from "antd";

import './card.css'
import {categories} from "../../redux/ajoutMateriel/AjoutMeterielAction"; // css

interface Iprops {
    equipment: any;
    getEquipment: any;
    editEquipment: any;
    getOwner: any;
    user: any;
    getOneCategories: any;
    categories: any;
}

const Details = ({equipment, user, getOwner, getEquipment, editEquipment,categories, getOneCategories}: Iprops) => {

    const [userDataVisible, setUserDataVisible] = useState(false)
    const [categorieName, setCategorieName] = useState('')
    const {materialId} = useParams(); // paramètre get
    const test: any = materialId;

    // Récupération des infos de l'équipement 1 fois
    useEffect(() => {
        console.log('RECUP EQUIPMENT')
        getEquipment(test)
    }, [])

    // une fois l'équipement défini, je recherche les infos sur l'utilisateur
    useEffect(() => {
        if (equipment.length != 0) {
            getOwner(equipment.userHandle)
            getOneCategories(equipment.category)
        }
    }, [equipment])

    //une fois que c'est bon j'affiche les infos de l'utilisateur
    useEffect(() => {
        if (user.length != 0) {
            console.log('test', user)
            setUserDataVisible(true)
        }
    }, [user])

    useEffect(() => {
        if (categories.length != 0) {
            setCategorieName(categories.oneCategories.name)
        }
    }, [categories])


    if (equipment.length != 0) {

        return (
            <div className={'contentDetails'}>

            <span className={'header'}>
                <img
                    src={equipment.img}
                />
                <span className={'title'}>
                    <h1>
                        {equipment.name}
                    </h1>
                    <h3>
                        {user.storeName}
                    </h3>
                </span>

            </span>
                <div className={'details'}>
                    <h2><b>Details sur l'équipement</b></h2>
                    <span className={'detailequipment'}>
                <p>
                    <b>Description : </b> {equipment.description}
                </p>
                <p>
                    <b>Marque : </b> {equipment.brand}
                </p>
                <p>
                    <b>Modele : </b> {equipment.modele}
                </p>
                <p>
                    <b>Année d'achat : </b> {equipment.buyingDate}
                </p>
                <p>
                    <b>Categorie : </b> {categorieName}
                </p>

            </span>
                    {userDataVisible ? <div>
                        <h2><b>Details du Fournisseur</b></h2>
                        <span className={'detailfournisseur'}>
                <p>
                    <b>Adresse : </b> {user.adress}
                </p>
                <p>
                    <b>Ville : </b> {user.city}
                </p>
                <p>
                    <b>Code postal : </b> {user.postalCode}
                </p>

            </span>
                    </div> : null}
                </div>
            </div>

        )
    } else {
        return (
            <>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
            </>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        equipment: state.editMateriel.getOneEquipment,
        categories: state.ajoutMateriel.oneCategories,
        user: state.editMateriel.user
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEquipment: (test: string) => dispatch({type: 'GET_THAT_EQUIPMENT', id: test}),
        getOwner: (ownerUid: string) => dispatch({type: 'GET_THAT_EQUIPMENT_OWNER', uid: ownerUid}),
        getOneCategories: (idCateg: string) => {
            dispatch({ type: "GET_ONE_CATEGORIES", id: idCateg });
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Details)
