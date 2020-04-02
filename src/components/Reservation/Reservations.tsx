import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Badge, Skeleton, List, Avatar, Button, Popconfirm, Row, Col, Divider, Modal} from "antd";
import Moment from "react-moment";
import store from "../../redux/store";

interface IReservations {
    getReservations: any;
    logged: boolean;
    reservations: any;
    loading: boolean;
    returnReservation: any;
    uid: any;
    getConfirmReservation: any;
}

const Reservations = ({logged, reservations, loading, getReservations, returnReservation, getConfirmReservation, uid}: IReservations) => {


    const [listEquipment, setListEquipment] = useState([])
    const [myUid, setMyUid] = useState('')

    useEffect(() => {
        if (logged) {
            getReservations()
        }
    }, [logged])

    useEffect(() => {
        if (reservations.length > 0) {
            setListEquipment(reservations)

            reservations.map(
                (data: any) => {
                    console.log('123456', data)
                    if (data.status === '0.5') {
                        success(data.id, data.nameEquipment)
                    }
                }
            )
        }

    }, [reservations])


    const handleReturnReservation = (reservation: any) => {
        console.log('RESTITUTION')
        console.log(reservation.idEquipment)
        console.log(reservation.idUser)

        returnReservation(reservation.idEquipment, reservation.idUser)

    }


    const envmesdonnee = (id: string) => {
        store.dispatch({type: "CONFIRM_OK_RESERVATION", id: id});
    }
    const success = (id: string, name: string) => {
        Modal.success({
            content: 'Votre demande de location a été validé pour le produit : ' + name,
            onOk: () => {
                envmesdonnee(id)
            }
        });
    }


    if (logged) {


        return (
            <div>
                <h2>Espace réservations</h2>
                <Row>
                    <Col>
                        <p>Retrouvez ici toutes vos réservations en cours.</p>
                        <p>Pour chaque réservation, vous pouver consulter le status, la date de début et de fin.
                            Une fois le matériel rendu, vous pourrez confirmer la restitution ici.</p>
                    </Col>
                </Row>
                <Divider/>
                <List
                    header={<div><b>Vos réservation(s) :</b></div>}
                    loading={loading}
                    locale={{emptyText: 'Aucune réservation !'}}
                    itemLayout="horizontal"
                    dataSource={listEquipment}
                    renderItem={(equipment: any) => (
                        <List.Item>

                            <List.Item.Meta
                                avatar={
                                    <Avatar src={equipment.img}/>
                                }
                                title={equipment.nameEquipment}
                            />

                            {equipment.status === '0' ?
                                <List.Item.Meta
                                    title={'Status'}
                                    description={<span> En attente de validation fournisseur... </span>}
                                />
                                : null}

                            {equipment.status === '0.5' ?
                                <List.Item.Meta
                                    title={'Status'}
                                    description={<span> En attente de validation client... </span>}
                                />
                                : null}

                            {equipment.status === '1' ?
                                <List.Item.Meta
                                    title={'Status'}
                                    description={<span> Validé </span>}
                                />
                                : null}

                            {equipment.status === '3' ?
                                <List.Item.Meta
                                    title={'Status'}
                                    description={<span> Emprunté </span>}
                                />
                                : null}

                            <List.Item.Meta
                                title={'Date de début'}
                                description={<span> {equipment.dateDebut} </span>}
                            />

                            <List.Item.Meta
                                title={'Date de fin'}
                                description={<span> {equipment.dateFin} </span>}
                            />

                            <List.Item.Meta
                                description={<span><Moment parse={'DD/MM/YYYY'}
                                                           fromNow>{equipment.dateFin}</Moment> <Badge
                                    status="processing"/>  </span>}
                            />


                            {equipment.status === '3' ?
                                <Popconfirm
                                    title="Êtes-vous sûr de vouloir restituer ce produit ?"
                                    onConfirm={() => handleReturnReservation(equipment)}
                                    okText="Oui"
                                    cancelText="Non"
                                >
                                    <Button>Restituer</Button>
                                </Popconfirm>
                                : null}

                        </List.Item>
                    )}
                />
            </div>
        )
    } else {
        return (
            <div>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
                <Skeleton active/>
            </div>
        )
    }

}

// redux
const mapStateToProps = (state: any) => {
    return {
        logged: state.login.logged,
        reservations: state.reservation.reservations,
        loading: state.reservation.loading,
        getConfirmReservation: state.reservation.getConfirmReservation,
        uid: state.login.user.uid
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getReservations: () => dispatch({type: 'SYNC_RESERVATIONS_REQUEST'}),
        returnReservation: (idEquipment: string, idUser: string) => dispatch({
            type: 'RETURN_RESERVATION_REQUEST',
            idEquipment: idEquipment,
            idUser: idUser
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Reservations)
