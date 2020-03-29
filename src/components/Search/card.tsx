import React, {useEffect, useState} from 'react'
import './card.css'
import {
    SearchOutlined,
    CarryOutOutlined,
} from '@ant-design/icons';
import {Button, Popover, Form, Badge} from 'antd';
import {DatePicker} from 'antd';
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
    category: string
}
const Card = ({img, name, status, id,tags, category}: CardProps) => {
    const [visible, setVisible] = useState(false);
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
        const dateDebut = new Date(values.range[0]._d);
        console.log(dateDebut.getDate()+'/'+(dateDebut.getMonth()+1)+'/'+dateDebut.getFullYear());
        const dateFin = new Date(values.range[1]._d);
        const dateDebutStr = dateDebut.getDate()+'/'+(dateDebut.getMonth()+1)+'/'+dateDebut.getFullYear();
        const dateFinStr = dateFin.getDate()+'/'+(dateFin.getMonth()+1)+'/'+dateFin.getFullYear();
        const reservation: {dateDebut: string, dateFin: string , idUser: string} [] =
            [{dateDebut: dateDebutStr, dateFin: dateFinStr, idUser: 'lLB0SOycpZhEdCbXBnADPotnsIs1'}];
        //store.dispatch({type: "EDIT_THAT_RESERVATION", values: reservation});

        /*const testCalcul = dateFin.getTime()-dateDebut.getTime();
        const TestCalcul = testCalcul / (1000 * 3000 * 24);
        console.log(Number((dateFin.getTime()/86400000)-(dateDebut.getTime()/86400000)).toFixed(0));
        dateDebut.setTime(dateDebut.getTime()+ testCalcul);
        console.log(dateDebut.getDate()+'/'+(dateDebut.getMonth()+1)+'/'+dateDebut.getFullYear());*/

    };

        const Dispo = () => {
            return(
                <>test</>
            )
        }

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
