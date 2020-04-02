import React from "react";

import { Badge } from "antd";

export const StatusBadge = (props: any) => {
  const status = props.status;
  if (status === "0") {
    return <div><Badge status="success" text="Disponible" /></div>;
  }else if (status === "1"){
    return <div><Badge status="processing" text="En pret" /></div>;
  }else if (status === "2"){
    return <div><Badge status="warning" text="Réservé" /></div>;
  }else if (status === "3"){
    return <div><Badge status="error" text="Perdu/Détérioré" /></div>;
  }else{
    return <div><Badge status="default" text="En attente de validation" /></div>;
  }
};
