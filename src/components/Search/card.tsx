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
import {connect} from "react-redux";
import empty from "firebase/empty-import";


type CardProps = {
    equipment: { id: string, img: string, titre: string, userHandle: string, status: string, tag: string, brand: string, category: string, uid: string, uName: string, uEmail: string },
}

interface Iprops {
    uid: any;
}

const Card = ({equipment}: CardProps, {uid}: Iprops) => {
    const [visible, setVisible] = useState(false);
    const [connected, setConnected] = useState(false);
    const [loading, setLoading] = useState(false);
    const [statu, setStatu] = useState('Reserve');
    const [imgSrc, setImg] = useState('');
    const [statuColor, setStatuColor] = useState('warning');

    useEffect(() => {
        if (equipment) {
            store.dispatch({type: 'GET_THAT_EQUIPMENT_OWNER', uid: equipment.uid});
        }
    }, [equipment])


    useEffect(() => {
        if (equipment.img !== 'null') {
            setImg(equipment.img);
        }
        if (equipment.status === '0') {
            setStatu('Disponible');
            setStatuColor('success');
        } else if (equipment.status === '1') {
            setStatu('Reserve');
            setStatuColor('warning');
        } else if (equipment.status === '3') {
            setStatu('Indisponible');
            setStatuColor('error');
        }
    });

    useEffect(() => {
        if (equipment.uid != undefined) setConnected(true);
    })
    const {RangePicker} = DatePicker;

    const showModal = () => {
        setVisible(true)
    };

    const handleOk = (e: any) => {
        console.log(e);
        setVisible(false)
    };

    const handleCancel = (e: any) => {
        console.log(e);
        setVisible(false)
    };

    const dateFormat = 'DD/MM/YYYY';
    let date = new Date();
    let date1sem = new Date();
    date1sem.setDate(date.getDate() + 7);
    let dateNow = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();
    let dateNowPlus1sem = (date1sem.getDate()) + '/' + (date1sem.getMonth() + 1) + '/' + date1sem.getFullYear();

    const disabledDate = (current: any) => {
        let dates: any[] = ['2020-04-05', '2020-04-06', '2020-04-07', '2020-04-08'];
        return current < moment().subtract(moment().format('2020-04-05'), "days") || current > moment().add(7, 'd')
    };

    const onFinish = (values: any) => {
        const dateDebut = new Date(values.range[0]._d);
        console.log(dateDebut.getDate() + '/' + (dateDebut.getMonth() + 1) + '/' + dateDebut.getFullYear());
        const dateFin = new Date(values.range[1]._d);
        const dateDebutStr = dateDebut.getDate() + '/' + (dateDebut.getMonth() + 1) + '/' + dateDebut.getFullYear();
        const dateFinStr = dateFin.getDate() + '/' + (dateFin.getMonth() + 1) + '/' + dateFin.getFullYear();
        const dataReservation: {
            dateDebut: string,
            dateFin: string,
            dateRestitution: string,
            idEquipment: string,
            idSupplier: string,
            idUser: string,
            mailUser: string,
            nameEquipment: string,
            nameUser: string,
            status: string,
            img: string
        }[] = [];
        dataReservation.push({
            dateDebut: dateDebutStr,
            dateFin: dateFinStr,
            dateRestitution: '',
            idEquipment: equipment.id,
            idSupplier: equipment.userHandle,
            idUser: equipment.uid,
            mailUser: equipment.uEmail,
            nameEquipment: equipment.titre,
            nameUser: equipment.uName,
            status: '0',
            img: equipment.img
        })
        store.dispatch({type: 'ADD_RESERVATION', reservation: dataReservation})
        //const reservation: {dateDebut: string, dateFin: string , idUser: string} [] =
        // [{dateDebut: dateDebutStr, dateFin: dateFinStr, idUser: 'lLB0SOycpZhEdCbXBnADPotnsIs1'}];
        //store.dispatch({type: "ADD_RESERVATION", reservation: dataReservation});

        setVisible(false);

        /*const testCalcul = dateFin.getTime()-dateDebut.getTime();
        const TestCalcul = testCalcul / (1000 * 3000 * 24);
        console.log(Number((dateFin.getTime()/86400000)-(dateDebut.getTime()/86400000)).toFixed(0));
        dateDebut.setTime(dateDebut.getTime()+ testCalcul);
        console.log(dateDebut.getDate()+'/'+(dateDebut.getMonth()+1)+'/'+dateDebut.getFullYear());*/

    };


    return (
        <div className={'card'} id={'test'}>
            <span className={'nameImg'}>
                <img src={imgSrc}/>
                <span className={'name'}>
                    <h4>{equipment.titre}</h4>
                    <p>
                        Catégorie : {equipment.category}
                    </p>
                </span>
            </span>
            <span className={'bottom'}>
                <span className={'btn'}>
                    <Link to={`/Details/${equipment.id}`}> <SearchOutlined style={{fontSize: '30px'}}/></Link>
                    {connected ? <>
                            {statuColor == 'error' || statuColor == 'warning' ?
                                <CarryOutOutlined style={{fontSize: '30px', opacity: 0.3}}/>
                                :
                                <a href={'#'} onClick={showModal}>
                                    <CarryOutOutlined style={{fontSize: '30px'}}/>
                                </a>
                            }
                        </>
                        :
                        <CarryOutOutlined style={{fontSize: '30px', opacity: 0.3}}/>}

                    <Modal
                        title={equipment.titre}
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button key="back" onClick={handleCancel}>
                                Retour
                            </Button>,
                        ]}
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

                            </Modal>
                </span>

                {statuColor != '' ? <>
                        {statuColor == 'warning' ?
                            <Badge status={'warning'} text={statu}/>
                            : <>
                                {statuColor == 'success' ?
                                    <Badge status={'success'} text={statu}/>
                                    :
                                    <Badge status={'error'} text={statu}/>
                                }
                            </>
                        }
                    </>
                    : null
                }

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

const mapStateToProps = (state: any) => {
    return {
        uid: state.login.user.uid
    };
};
export default connect(mapStateToProps)(Card)

