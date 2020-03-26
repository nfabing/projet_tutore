import React, {useEffect, useState} from 'react'
import './card.css'
import {List, AutoSizer} from 'react-virtualized';

import {
    SearchOutlined,
} from '@ant-design/icons';
import Card from "./card";
import {Input} from "antd";

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
const Loader = () => {

    const [search, setSearch] = useState('');
    const {Search} = Input;
    let userTestStatus: { id: number, img: string, titre: string, status: number }[] = [
        {
            id: 0,
            img: "https://www.bricodepot.fr/images/page_prod_big/58500/58522.jpg",
            titre: "PINCE À SIPHON - MAGNUSSON",
            status: 1
        },
        {
            id: 1,
            img: "https://www.bricodepot.fr/images/page_prod_big/58500/58523.jpg",
            titre: "PINCE À CINTRER - MAGNUSSON",
            status: 0
        },
        {
            id: 2,
            img: "https://www.bricodepot.fr/images/page_prod_big/58500/58513.jpg",
            titre: "Pince multiprise de plombier - MAGNUSSON",
            status: 1
        },
        {
            id: 3,
            img: "https://www.bricodepot.fr/images/page_prod_big/58500/58526.jpg",
            titre: "CLÉ SERRE-TUBE STILLSON - MAGNUSSON",
            status: 1
        },
        {
            id: 4,
            img: "https://www.bricodepot.fr/images/page_prod_big/25500/25825.jpg",
            titre: "MINI COUPE-TUBE",
            status: 0
        },
        {
            id: 5,
            img: "https://www.bricodepot.fr/images/page_prod_big/106000/106148.jpg",
            titre: "RUBAN D'ISOLATION POUR TUBE DE CUIVRE - DIALL",
            status: 0
        },
        {
            id: 6,
            img: "https://www.bricodepot.fr/images/page_prod_big/10500/10667.jpg",
            titre: "Coffret de plombier 78 pièces",
            status: 0
        },
        {id: 7, img: "null", titre: "VENTOUSE À MANCHE", status: 1}
    ];

    const searchFunction = async (e: any) => {
        setSearch(e.currentTarget.value);
    };

    type RowType = {
        index: any, // Index of row within collection
        style: any, // Style object to be applied to row (to position it)
    }

    const Row = ({index, style}: RowType) => {
        const item = userTestStatus[index];

        return (
            <div className={index % 2 ? 'ListItemOdd' : 'ListItemEven'} key={index} id={'card' + index} style={style}>
                {item ? <Card img={userTestStatus[index].img}
                              name={userTestStatus[index].titre}
                              id={userTestStatus[index].id}
                                 status={userTestStatus[index].status}/> : 'Loading...'}
            </div>
        )
    };

    let filterData = userTestStatus.filter(
        (data) => {
            return data.titre.toLowerCase().indexOf(
                search.toLowerCase()
            ) !== -1;
        }
    );

    return (
        <div>
            <Search
                placeholder="input search text"
                onSearch={value => setSearch(value)}
                style={{width: 200}}
            />

            {filterData.map(
                (data) => {
                    return <Card img={data.img} name={data.titre} id={data.id} status={data.status}/>
                }
            )}
        </div>
    )
}

export default Loader
