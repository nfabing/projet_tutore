import React, {useEffect, useState} from 'react'
import './card.css'
import axios from "axios"
import {List, AutoSizer} from 'react-virtualized';
import
{useParams} from "react-router-dom"
import {
    SearchOutlined,
} from '@ant-design/icons';
import store from "../../redux/store";
import {connect} from "react-redux";
import './DetailsPage.css';
import {Skeleton} from "antd";

interface Iprops {
    equipment: any;
    getEquipment: any;
    editEquipment: any;
}

let i: number = 0;
const Details = ({equipment, getEquipment, editEquipment}: Iprops) => {

    const {materialId} = useParams();
    const test: any = materialId;
    if (i === 0) {
        console.log('ID Equipment', test);
        store.dispatch({type: 'GET_THAT_EQUIPMENT', value: test.toString()});
        i += 1;
    }
    console.log('Taille equipemebt',equipment.length);
    if (equipment.length != 0) {

        equipment = equipment.getOneEquipment;


        return (
            <div className={'contentDetails'}>

            <span className={'header'}>
                <img
                    src={equipment.img.stringValue}
                />
                <span className={'title'}>
                    <h1>
                        {equipment.name.stringValue}
                    </h1>
                    <h3>
                        {equipment.userHandle.stringValue}
                    </h3>
                </span>

            </span>
                <div className={'details'}>
                    <h2><b>Details sur l'équipement</b></h2>
                    <span className={'detailequipment'}>
                <p>
                    <b>Description : </b> {equipment.description.stringValue}
                </p>
                <p>
                    <b>Marque : </b> {equipment.brand.stringValue}
                </p>
                <p>
                    <b>Modele : </b> {equipment.modele.stringValue}
                </p>
                <p>
                    <b>Année d'achat : </b> {equipment.buyingDate.stringValue}
                </p>
                <p>
                    <b>Categorie : </b> {equipment.category.stringValue}
                </p>
            </span>
                    <h2><b>Details sur le vendeur</b></h2>
                    <span className={'detailfournisseur'}>
                <p>
                    <b>Adresse : </b> l'adrasse
                </p>
                <p>
                    <b>blabla : </b> Le blabla
                </p>
                <p>
                    <b>blibli : </b> La Blibli
                </p>
            </span>
                </div>
            </div>

        )
    }else {
        return (
            <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
            </>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        equipment: state.editMateriel.getOneEquipment
    };
};

export default connect(
    mapStateToProps
)(Details)
