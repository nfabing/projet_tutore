import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Badge, Skeleton, List, Avatar, Button, Divider} from "antd";
import Moment from "react-moment";

interface IReservations {
    getReservations: any;
    logged: boolean;
    reservations: any;
    loading: boolean;
    returnReservation: any;
}

const Reservations = ({logged, reservations, loading, getReservations, returnReservation}: IReservations) => {


    const [listEquipment, setListEquipment] = useState([])

    useEffect(() => {
        if (logged) {
            getReservations()
        }
    }, [logged])

    useEffect(() => {

        console.log(reservations.length)
        if (reservations.length > 0) {
            console.log(reservations)
           setListEquipment(reservations)
            console.log('EFFECT')
        }

    }, [reservations])

    const handleReturnReservation = (reservation: any) => {
        console.log('RESTITUTION')
        console.log(reservation.idEquipment)
        console.log(reservation.idUser)

        returnReservation(reservation.idEquipment, reservation.idUser)

    }



    if (logged) {
        return (
            <div>
                <h2>Vos réservations</h2>
                <List
                    className=""
                    loading={loading}
                    itemLayout="horizontal"
                    /*loadMore={loadMore}*/
                    dataSource={listEquipment}
                    renderItem={(equipment: any) => (
                        <List.Item>

                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={equipment.img} />
                                    }
                                    title={equipment.nameEquipment}
                                />

                                <List.Item.Meta
                                    title={'Date de début'}
                                    description={<span> {equipment.dateDebut} </span>}
                                />

                                <List.Item.Meta
                                    title={'Date de fin'}
                                    description={<span> {equipment.dateFin} </span>}
                                />

                                <List.Item.Meta
                                    description={<span><Moment parse={'DD/MM/YYYY'} fromNow>{equipment.dateFin}</Moment> <Badge status="processing" />  </span>}
                                />


                            {equipment.status === '3' ? <Button onClick={() => handleReturnReservation(equipment)}>Restituer</Button> : null }

                        </List.Item>
                    )}
                />
            </div>
        )
    } else {
        return (
            <div>
                <h2>NON CONNECTEE</h2>
            </div>
        )
    }

}

// redux
const mapStateToProps = (state: any) => {
    return {
        logged: state.login.logged,
        reservations: state.reservation.reservations,
        loading: state.reservation.loading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getReservations: () => dispatch({type: 'SYNC_RESERVATIONS_REQUEST'}),
        returnReservation: (idEquipment: string, idUser: string) => dispatch({type: 'RETURN_RESERVATION_REQUEST', idEquipment: idEquipment, idUser: idUser})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Reservations)
