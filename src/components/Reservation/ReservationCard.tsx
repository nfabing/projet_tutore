import React, {useEffect, useState} from 'react'
import './card.css'
import {
    SearchOutlined,
    CarryOutOutlined,
} from '@ant-design/icons';
import {Button, Popover, Form, Badge} from 'antd';
import {DatePicker, Modal} from 'antd';
import 'antd/dist/antd.css';
import Popup from "reactjs-popup";
import {Link} from "react-router-dom";
import moment from 'moment';
import './popup.css';
import store from "../../redux/store";


type CardProps = {
    img: string,
    name: string,
    id: number,
    status: string,
    tags: string,
    category: string,
    reservation: {dateDebut: string, dateFin:string, idUser: string, restitution: string}[],
}

const Card = ({img, name, status, id,tags, category,reservation}: CardProps) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statu, setStatu] = useState('Reserve');
    const [imgSrc, setImg] = useState('');
    const [statuColor, setStatuColor] = useState('warning');

    useEffect(() => {
        if (img !== 'null') {
            setImg(img);
        }
        if (status === '0') {
            setStatu('Disponible');
            setStatuColor('success');
        } else if (status === '1') {
            setStatu('Reserve');
            setStatuColor('warning');
        }
    });

    const {RangePicker} = DatePicker;

    const showModal = () => {
        setVisible(true)
    };

    const handleOk = (e: any) => {
        setVisible(false)
    };

    const handleCancel = (e: any) => {
        setVisible(false)
    };

    return (
        <div className={'card'} id={'test'}>
            <span className={'nameImg'}>
                <img src={imgSrc}/>
                <span className={'name'}>
                    <h4>{name}</h4>
                    <p>
                        Category : {category}
                    </p>
                    <p>
                        tags : {tags}
                    </p>
                </span>
            </span>
            <span className={'bottom'}>
            <span className={'btn'}>
                <Button color={'primary'}>
                    En attente de validation du Fournisseur
                </Button>
            </span>
            <Badge status={statuColor == 'warning' ? 'warning' : 'success' } text={statu} />
            </span>

        </div>
    )
}
/*
<a href={`/Details/${id}`}>
<Popover
    content={
        <a onClick={hide}>Close</a>}
    placement={"bottomRight"}
    title="Title"
    trigger="click"
    visible={visible}
    onVisibleChange={handleVisibleChange}
>
    <CarryOutOutlined style={{fontSize: '30px'}}/>
</Popover>*/

export default Card
