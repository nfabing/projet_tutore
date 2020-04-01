import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {Badge, Skeleton, List, Avatar, Button, Divider} from "antd";
import Moment from "react-moment";

interface IReservations {
    getReservations: any;
    logged: boolean
    reservations: any
    loading: boolean
}

const Reservations = ({logged, reservations, loading, getReservations}: IReservations) => {

    const [isVisible, setIsVisible] = useState(false)
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
            setIsVisible(true)

            reservations.forEach((reservation : any) => {
            })



        } else {
            setIsVisible(false)
        }

    }, [reservations])

    if (logged) {
        return (
            <div>
                <h2>Vos réservations</h2>
                <List
                    className=""
                    loading={loading}
                    itemLayout="horizontal"
                    /*loadMore={loadMore}*/
                    dataSource={reservations}
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

                            <Divider style={{textAlign: 'center'}} type="vertical" />


                            <Button onClick={() => console.log(equipment.mailUser)}>TEST</Button>
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
        getReservations: () => dispatch({type: 'SYNC_RESERVATIONS_REQUEST'})
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Reservations)
