import React, {useEffect, useState} from 'react'
import './card.css'
import {
    SearchOutlined,
    CarryOutOutlined,
} from '@ant-design/icons';
import {Popover} from 'antd';
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import Popup from "reactjs-popup";
import {Link} from "react-router-dom";
import moment from 'moment';

type CardProps = {
    img: string,
    name: string,
    id: number,
    status: number
}
const Card = ({img, name, status, id}: CardProps) => {
    const [visible, setVisible] = useState(false);
    const [statu, setStatu] = useState('Reserve');
    const [imgSrc, setImg] = useState('https://cdn.discordapp.com/attachments/624590745096945704/690571801625100288/000000-default-placeholder.png');
    const [statuColor, setStatuColor] = useState('orange');

    useEffect(() => {
        if (img !== 'null') {
            setImg(img);
        }

        if (status === 0) {
            setStatu('Disponible');
            setStatuColor('green');
        } else if (status === 1) {
            setStatu('Reserve');
            setStatuColor('orange');
        }
    });
    const {RangePicker} = DatePicker;

    const handleVisibleChange = () => {
        setVisible(true);
    };

    const hide = () => {
        setVisible(false);
    };
    const dateFormat = 'DD/MM/YYYY';
    let date = new Date();
    let date1sem = new Date();
    date1sem.setDate(date.getDate()+7);
    let dateNow = date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear();
    let dateNowPlus1sem = (date1sem.getDate())+'/'+(date1sem.getMonth()+1)+'/'+date1sem.getFullYear();
    return (
        <div className={'card'} id={'test'}>
            <span className={'nameImg'}>
                <img src={imgSrc}/>
                <span className={'name'}>
                    <h4>{name}</h4>
                    <p>
                        producteur : test
                    </p>
                    <p>
                        tag : xx x xx
                    </p>
                </span>
            </span>
            <span className={'bottom'}>
                <span className={'btn'}>
                    <a href={`/Details/${id}`}> <SearchOutlined style={{fontSize: '30px'}}/></a>

<Popup trigger={<CarryOutOutlined style={{ fontSize: '30px' }}  />}
       modal
>

                        <RangePicker
                            defaultValue={[moment(dateNowPlus1sem, dateFormat), moment(dateNow, dateFormat)]}
                            format={dateFormat}
                        />

</Popup>
                </span>
                <p>
                    Disponibilité : <h4 className={statuColor}>{statu}</h4>
                </p>
            </span>

        </div>
    )/* <a href={`/Details/${id}`}>
                     <Popover
                    content={
                        <a onClick={hide}>Close</a>}
                    placement={"bottomRight"}
                    title="Title"
                    trigger="click"
                    visible={visible}
                    onVisibleChange={handleVisibleChange}
                >
                    <CarryOutOutlined style={{ fontSize: '30px' }}  />
                </Popover>*/
}

export default Card
