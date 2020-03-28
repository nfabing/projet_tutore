import React, {useEffect, useState} from 'react'
import './card.css'
import {List, AutoSizer} from 'react-virtualized';

import {
    SearchOutlined,
} from '@ant-design/icons';
import Loader from "./infiniteLoader";


const Search = () => {
    return (
        <div>
            <Loader/>
        </div>
    )
}

export default Search
