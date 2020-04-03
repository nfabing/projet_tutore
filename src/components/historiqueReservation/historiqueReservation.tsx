import React from 'react';
import store from "../../redux/store";
import { connect } from "react-redux";
import { Spin,Avatar } from "antd";
import { Collapse,Button } from 'antd';
import {Link} from "react-router-dom";


const { Panel } = Collapse;
interface Iprops{
  reservations:any,
  idUser:any
}

const historiqueReserve = ({idUser,reservations }:Iprops) => {
    
        if(idUser != undefined || reservations != undefined){
            
            if(reservations != undefined){
                return(
                    <div>
                        <Collapse defaultActiveKey={['1']} >
                        {reservations.map((reservation:any)=>{                            
                        if(reservation.status == "5" || reservation.status == "6" ){
                            return ( 
                                <Panel header={reservation.nameEquipment +" - "+ reservation.dateFin} key={reservation.id} >
                                <Avatar size={100}  src={reservation.img} />
                                <p>{reservation.nameEquipment}</p>
                                <p>Date debut: {reservation.dateDebut} - Date fin: {reservation.dateFin}</p>
                                <p>
                                {reservation.status == "5" ? 'Réservation annulé':'Réservation effectuée'} 
                                </p>
                                <p><Link to={`/Details/${reservation.idEquipment}`}>Voir les details</Link></p>
                                </Panel>
                            );
                        }
                        })}
                        </Collapse>
                    </div>
                );
            }else{
                store.dispatch({ type: "GET_HISTORIQUE" ,idU: idUser });
            
                return(
                    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} ><Spin/></div>
                );
            }
            
        }else{
            return(
                <div>

                </div>
            );
        }
};

const mapStateToProps = (state:any) => {
    return {
        idUser: state.user.profil.useruid,
        reservations: state.listReserve.idU.reservations
    };
};


export default connect(mapStateToProps,null)(historiqueReserve);
