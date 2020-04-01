import React, {useEffect, useState} from 'react'
import '../Search/card.css'
import {AutoSizer} from 'react-virtualized';
import {FixedSizeList as List} from "react-window";
import {Layout, Menu, Select} from 'antd';
import {
    SearchOutlined,
} from '@ant-design/icons';
import Card from "../Search/card";
import {Button, Input, Skeleton} from "antd";
import {connect} from "react-redux";

import '../Search/infiniteLoader.css'
import store from "../../redux/store";

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
}

const {Option} = Select;
const {SubMenu} = Menu;
const {Header, Content, Footer, Sider} = Layout;


store.dispatch({type: 'GET_ALL_EQUIPMENTS_SEARCH'});
store.dispatch({type: 'GET_CATEGORIES'});
const Reservation = ({equipments, getEquipments, categories, getCategories}: Iprops) => {


    const [category, setCategory] = useState('');
    const {Search} = Input;
    let dataCard: { id: number,
        img: string,
        titre: string,
        status: string,
        tag: string,
        brand: string,
        category: string,
        reservation: { dateDebut: string,
            dateFin: string,
            idUser: string,
    }[]
    }[] = [];
    let arrayBrand: string[] = [];
    const arrayCategory: string[] = [];

    type RowType = {
        index: any, // Index of row within collection
        style: any, // Style object to be applied to row (to position it)
    }

    console.log('Taille', equipments);


    if (equipments.length != 0 && categories.length != 0) {

        equipments.equipments.map((data: any) => {
            const equipement: any = data;
            const key: any = data.id;

            let testBrand: boolean = false;
            for (let j = 0; j < arrayBrand.length; j++) {
                if (arrayBrand[j] === equipement.brand) {
                    testBrand = true;
                }
            }
            if (!testBrand) arrayBrand.push(equipement.brand);
            arrayCategory.push(equipement.category);
            let tags: string = equipement.modele + ',' + equipement.brand + ',' + equipement.category;
            dataCard.push({
                id: key,
                img: equipement.img,
                titre: equipement.name,
                status: equipement.status,
                tag: tags,
                brand: equipement.brand,
                category: equipement.category,
                reservation: equipement.reservation
            });

        });

        console.log('DATAAAAAAAAAAAA',dataCard);
        let filterData = dataCard;


        const Row = ({index, style}: RowType) => {
            const item = filterData[index];
            const category: string = categories.categories.map((cat: any) => {
                if (filterData[index].category === cat.id) return cat.name;
            });
            return (
                <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} key={index} id={'card' + index}
                     style={style}>
                    {item ? <Card img={filterData[index].img}
                                  name={filterData[index].titre}
                                  id={filterData[index].id}
                                  tags={filterData[index].tag}
                                  category={category}
                                  status={filterData[index].status}
                                  reservation={filterData[index].reservation}/> : 'Loading...'}
                </div>
            )
        };

        return (

            <div className={'contentLoader'}>
                <AutoSizer style={{height: '85vh'}}>
                    {({height, width}) => (
                        <List itemSize={170}
                              height={height}
                              itemCount={filterData.length}
                              width={width}
                        >
                            {Row}
                        </List>
                    )}
                </AutoSizer>
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
    mapDispatchToProps)(Reservation);