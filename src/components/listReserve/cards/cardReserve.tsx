import React, { useState } from "react";

import { Card,Button,Avatar} from "antd";


export const CardReserve = (props: any) => {  
    console.log("card");
    console.log(props);
  return (
    
  <Card title={props.equipo.name} bordered={true}>
      <p><Avatar size={100} src={props.equipo.img} /></p>
   Description: <p>{props.equipo.description}</p>
  Modele: <p>{props.equipo.modele}</p>
      <Button  type="primary" danger >
        Cancel Reservation
      </Button>
</Card>
  );
};

export default CardReserve;