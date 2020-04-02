import React from "react";

import { connect } from "react-redux";
import store from "../../../redux/store";

import { Card,Button,Avatar} from "antd";


export const CardReserve = (props: any) => {  
    const delReservation = () => {
      store.dispatch({type:'DEL_RESERVE', id: props.reser.id});
      store.dispatch({type:'PUT_STATUS', idE: props.equipo.id})
      }

  return (
    <Card title={props.equipo.name} bordered={true}>
      <p><Avatar size={100}  src={props.equipo.img} /></p>
      Description: <p>{props.equipo.description.substr(0,25)}</p>
      Modele: <p>{props.equipo.modele}</p>
      Date Debut: <p>{ props.reser.dateDebut }</p>
      <p>Réserve par: {props.reser.nameUser}</p>
      <Button  type="primary" danger onClick={
        delReservation
      }>
        Cancel Reservation
      </Button>
    </Card>
  );
};



const mapDispatchToProps = (dispatch: any) => {
  return {
    delReservation: (id:any) => dispatch({ type: "DEL_RESERVE", id:id}),
  };
};

export default connect(null,mapDispatchToProps)(CardReserve);