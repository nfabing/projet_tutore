import React, { useState } from "react";
import { connect } from "react-redux";
import store from "../../../redux/store";

import { Card,Button,Avatar} from "antd";





export const CardReserve = (props: any) => {  
    console.log("card");
    console.log(props);
    const delReservation = () => {
      store.dispatch({type:'DEL_RESERVE', id: props.equipo.id});
      }
  return (
    <Card title={props.equipo.name} bordered={true}>
      <p><Avatar size={100} src={props.equipo.img} /></p>
      Description: <p>{props.equipo.description}</p>
      Modele: <p>{props.equipo.modele}</p>
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