import React, {useEffect, useState} from 'react'
import './card.css'
import axios from "axios"
import {List, AutoSizer} from 'react-virtualized';
import
    {useParams} from "react-router-dom"
import {
    SearchOutlined,
} from '@ant-design/icons';

const Details = () => {
    const [id, setId] = useState('');

    let { materialId } = useParams();
    const test: any  = materialId;
    useEffect(() => {
        setId(test);
        console.log(id);
    });


    return (
        <div>
            id : {materialId}
        </div>
    )
}

export default Details
