import React, {useEffect, useState} from 'react'
import './card.css'
import {
    SearchOutlined,
} from '@ant-design/icons';

type CardProps = {
    img: string,
    name: string,
    id: number,
    status: number
}
const Card = ({img, name, status,id}: CardProps) => {

    const [statu, setStatu] = useState('Reserve');
    const [imgSrc, setImg] = useState('https://cdn.discordapp.com/attachments/624590745096945704/690571801625100288/000000-default-placeholder.png');
    const [statuColor, setStatuColor] = useState('orange');

    useEffect( ()=> {
        if (img !== 'null') {
            console.log('oui');
            setImg(img);
        }

        if (status === 0) {
            setStatu('Disponible');
            setStatuColor('green');
        } else if(status === 1) {
            setStatu('Reserve');
            setStatuColor('orange');
        }
    });



    return (
        <div className={'card'}>
            <img src={imgSrc}/>
            <h3>{name}</h3>
            <span className={'bottom'}>
                <p>
                    Disponibilité : <h4 className={statuColor}>{statu}</h4>
                </p>
                <SearchOutlined />
            </span>

        </div>
    )
}

export default Card
