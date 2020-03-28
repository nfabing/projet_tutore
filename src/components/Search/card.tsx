import React, {useEffect, useState} from 'react'
import './card.css'
import {
    SearchOutlined,
    CarryOutOutlined,
} from '@ant-design/icons';
import {Button, Popover, Form} from 'antd';
import {DatePicker} from 'antd';
import 'antd/dist/antd.css';
import Popup from "reactjs-popup";
import {Link} from "react-router-dom";
import moment from 'moment';
import './popup.css';


type CardProps = {
    img: string,
    name: string,
    id: number,
    status: string,
    tags: string,
    category: string
}
const Card = ({img, name, status, id,tags, category}: CardProps) => {
    const [visible, setVisible] = useState(false);
    const [statu, setStatu] = useState('Reserve');
    const [imgSrc, setImg] = useState('https://firebasestorage.googleapis.com/v0/b/projet-tutore-6833d.appspot.com/o/equipments%2F000000-default-placeholder.png?alt=media&token=b500524d-17e8-4ee1-ab7b-5bdcbfebe61b');
    const [statuColor, setStatuColor] = useState('orange');

    useEffect(() => {
        if (img !== 'null') {
            setImg('gs://projet-tutore-6833d.appspot.com/equipments/'+img);
        }

        if (status === '0') {
            setStatu('Disponible');
            setStatuColor('green');
        } else if (status === '1') {
            setStatu('Reserve');
            setStatuColor('orange');
        }
    });
    const {RangePicker} = DatePicker;


    const dateFormat = 'DD/MM/YYYY';
    let date = new Date();
    let date1sem = new Date();
    date1sem.setDate(date.getDate() + 7);
    let dateNow = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    let dateNowPlus1sem = (date1sem.getDate()) + '/' + (date1sem.getMonth() + 1) + '/' + date1sem.getFullYear();

    const disabledDate = (current: any) => {
        let date: any[] = ['27/03/2020'];
        return current && current < moment().endOf('day');
    };

    const onFinish = (values: any) => {
        console.log(values);
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
                    <a href={`/Details/${id}`}> <SearchOutlined style={{fontSize: '30px'}}/></a>

                        <Popup trigger={<CarryOutOutlined style={{fontSize: '30px'}}/>}
                               modal
                        >
                            <span className={'contentPopup'}>
                            <h1>Réservation</h1>
                              <Form
                                  name="form"
                                  onFinish={onFinish}
                              >
                                <span className={'rangePicker'}>
                                    <h3>Date de réservation :</h3><br/>
                                    <Form.Item
                                        name="range"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Indiquez vos dates de réservation !',
                                            },
                                        ]}
                                    >
                                    <RangePicker
                                        disabledDate={disabledDate}
                                        defaultValue={[moment(dateNowPlus1sem, dateFormat), moment(dateNow, dateFormat)]}
                                        format={dateFormat}
                                    />
                                    </Form.Item>
                                </span>
                                  <Form.Item>
                                        <Button type="primary" htmlType="submit">
                                                Confirmer la réservation
                                         </Button>
                                  </Form.Item>
                              </Form>

                            </span>

                        </Popup>
                </span>
                <p>
                    Disponibilité : <h4 className={statuColor}>{statu}</h4>
                </p>
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
