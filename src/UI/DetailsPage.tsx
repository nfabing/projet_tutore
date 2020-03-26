import React, {useEffect, useState} from 'react'
import './card.css'
import axios from "axios"
import {List, AutoSizer} from 'react-virtualized';
import
    {useParams} from "react-router-dom"
import {
    SearchOutlined,
} from '@ant-design/icons';
import Loader from "./infiniteLoader";

const Details = () => {

    let { materialId } = useParams();

    return (
        <div>
            id : {materialId}
        </div>
    )
}

export default Details
