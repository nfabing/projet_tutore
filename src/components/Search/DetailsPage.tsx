import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"
import {connect} from "react-redux";
import './DetailsPage.css';
import {Button, Form, Modal, Skeleton, DatePicker, Divider} from "antd";
import {
    CarryOutOutlined,
} from '@ant-design/icons';
import './card.css'
import {categories} from "../../redux/ajoutMateriel/AjoutMeterielAction";
import moment from "moment";
import store from "../../redux/store"; // css

const {RangePicker} = DatePicker;

interface Iprops {
    equipment: any;
    getEquipment: any;
    editEquipment: any;
    getOwner: any;
    user: any;
    getOneCategories: any;
    categories: any;
    uid: any;
    uName: any;
    uEmail: any;
}

const Details = ({equipment, user, getOwner, getEquipment, editEquipment, categories, getOneCategories, uid, uName, uEmail}: Iprops) => {
    const [visible, setVisible] = useState(false);
    const [userDataVisible, setUserDataVisible] = useState(false)
    const [categorieName, setCategorieName] = useState('')
    const [connected, setConnected] = useState(false)
    const {materialId} = useParams(); // paramètre get
    const test: any = materialId;

    // Récupération des infos de l'équipement 1 fois
    useEffect(() => {
        console.log('RECUP EQUIPMENT')
        getEquipment(test)
    }, [])

    // une fois l'équipement défini, je recherche les infos sur l'utilisateur
    useEffect(() => {
        if (equipment.length != 0) {
            getOwner(equipment.userHandle)
            getOneCategories(equipment.category)
        }
    }, [equipment])

    //une fois que c'est bon j'affiche les infos de l'utilisateur
    useEffect(() => {
        if (user !== undefined) {
            console.log('test', user)
            setUserDataVisible(true)
        } else console.log('USEEEER', user)
    }, [user])

    useEffect(() => {
        if (categories.length != 0) {
            setCategorieName(categories.oneCategories.name)
        }
    }, [categories])

    useEffect(() => {
        if (uid != undefined) {
            setConnected(true)
        }

    }, [uid])

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
        return current < moment().subtract(7, "days") || current > moment().add(7, 'd')
    };


    if (equipment.length != 0) {


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
                idEquipment: test,
                idSupplier: equipment.userHandle,
                idUser: uid,
                mailUser: uEmail,
                nameEquipment: equipment.name,
                nameUser: uName,
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
            <span className={'contentDetails'}>
            <span className={'reservation'}>
                {connected ? <>
                        {equipment.status == '3' || equipment.status == '1' || equipment.status == '4' ?
                            <Button style={{height: '50px'}} color={'primary'} onClick={showModal}
                                    disabled={true}>
                                <CarryOutOutlined style={{fontSize: '30px'}}/> Reserver
                            </Button>
                            :
                            <Button style={{height: '50px'}} color={'primary'} onClick={showModal}>
                                <CarryOutOutlined style={{fontSize: '30px'}}/> Reserver
                            </Button>
                        }
                    </>
                    :
                    <Button style={{height: '50px'}} color={'primary'} onClick={showModal}
                            disabled={true}>
                        <CarryOutOutlined style={{fontSize: '30px'}}/> Reserver
                    </Button>
                }


                <Modal
                    title={equipment.name}
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

            <span className={'header'}>
                <img
                    src={equipment.img}
                />
                <span className={'title'}>
                    <h1>
                        {equipment.name}
                    </h1>
                    <h3>

                        {userDataVisible ? user.storeName : 'NOM BOUTIQUE'}
                    </h3>
                </span>

            </span>
                <div className={'details'}>
                    <Divider orientation={'left'}><h2><b>Details sur l'équipement</b></h2></Divider>
                    <span className={'detailequipment'}>
                <p>
                    <b>Description : </b> {equipment.description}
                </p>
                <p>
                    <b>Marque : </b> {equipment.brand}
                </p>
                <p>
                    <b>Modele : </b> {equipment.modele}
                </p>
                <p>
                    <b>Année d'achat : </b> {equipment.buyingDate}
                </p>
                <p>
                    <b>Categorie : </b> {categorieName}
                </p>

            </span>
                        <Divider orientation={'left'}><h2><b>Details du Fournisseur</b></h2></Divider>
                    {userDataVisible ? <div>
                        <span className={'detailfournisseur'}>
                <p>
                    <b>Adresse : </b> {user.adress}
                </p>
                <p>
                    <b>Ville : </b> {user.city}
                </p>
                <p>
                    <b>Code postal : </b> {user.postalCode}
                </p>

            </span>
                    </div> : null}
                </div>
            </span>

        )
    } else {
        return (
            <>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
            </>
        )
    }
}


const mapStateToProps = (state: any) => {
    return {
        equipment: state.editMateriel.getOneEquipment,
        categories: state.ajoutMateriel.oneCategories,
        user: state.editMateriel.user,
        uid: state.login.user.uid,
        uName: state.login.user.displayName,
        uEmail: state.login.user.email,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEquipment: (test: string) => dispatch({type: 'GET_THAT_EQUIPMENT', id: test}),
        getOwner: (ownerUid: string) => dispatch({type: 'GET_THAT_EQUIPMENT_OWNER', uid: ownerUid}),
        getOneCategories: (idCateg: string) => {
            dispatch({type: "GET_ONE_CATEGORIES", id: idCateg});
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Details)
