import React, {useEffect, useState} from 'react'
import '../Search/card.css'
import {AutoSizer} from 'react-virtualized';
import {FixedSizeList as List} from "react-window";
import {Layout, Menu, Modal, Select} from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons';
import Card from "../Search/card";
import {Button, Input, Skeleton} from "antd";
import {connect} from "react-redux";

import '../Search/infiniteLoader.css'
import store from "../../redux/store";
import {emailChangeSuccess} from "../../redux/email/emailActions";

type LoaderProps = {
    data: any,
}
type rowRendererType = {
    key: number, // Unique key within array of rows
    index: any, // Index of row within collection
    isScrolling: any, // The List is currently being scrolled
    isVisible: any, // This row is visible within the List (eg it is not an overscanned row)
    style: any, // Style object to be applied to row (to position it)
}

interface Iprops {
    equipments: any;
    getEquipments: any;
    categories: any;
    getCategories: any;
    uid: any;
    getConfirmReservation: any;
}

const {Option} = Select;
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;

store.dispatch({type: 'GET_ALL_EQUIPMENTS_SEARCH'});
store.dispatch({type: 'GET_CATEGORIES'});
const ReservationUser = ({equipments, getEquipments, categories, getCategories, uid, getConfirmReservation}: Iprops) => {


    const [category, setCategory] = useState('');
    const [myUid, setMyUid] = useState('');
    const {Search} = Input;
    let dataCard: {
        id: string, img: string, titre: string, userHandle: string, status: string, tag: string, brand: string, category: string, uid: string
    }[] = [];
    let arrayBrand: string[] = [];
    const arrayCategory: string[] = [];

    type RowType = {
        index: any, // Index of row within collection
        style: any, // Style object to be applied to row (to position it)
    }


    /*useEffect(() => {
        if (getConfirmReservation.lenght != 0) {
        console.log(getConfirmReservation);
    }
    }, [getConfirmReservation]);*/


    useEffect(() => {
        if (uid !== undefined && myUid == '') {
            setMyUid(uid);
            store.dispatch({type: 'GET_CONFIRM_OK_RESERVATION', id: uid});
        }
    })

    if (equipments.length != 0 && categories.length != 0) {

        const envmesdonnee = (id: string) => {
            store.dispatch({type: "CONFIRM_OK_RESERVATION", id: id});
        }
        const success = (id: string) => {
            Modal.success({
                content: 'Votre demande de location a été validé',
                onOk: () => {
                    envmesdonnee(id)
                }
            });
        }

        if (getConfirmReservation.length != 0 && !getConfirmReservation.id) {
            console.log('LOGGGGGGGGGG', getConfirmReservation);
            getConfirmReservation.getConfirmReservation.map(
                (data: any) => {
                    success(data.id);
                }
            )
        }


        return (

            <div className={'contentLoader'}>
                <Button onClick={() => success(
                    'TyZe1SwIFGjnmG3CrEgZ')}>
                    Ok
                </Button>
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
        equipments: state.dashboardFournisseur.equipments,
        categories: state.ajoutMateriel.categories,
        getConfirmReservation: state.reservation.getConfirmReservation,
        uid: state.login.user.uid
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEquipments: () => dispatch({type: "GET_EQUIPMENTS"}),
        getCategories: () => {
            dispatch({type: "GET_CATEGORIES"});
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps)(ReservationUser);
