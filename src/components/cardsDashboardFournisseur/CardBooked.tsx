import React, { useState } from "react";

import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

let nbrBooked = null;

export const CardBooked = (props: any) => {
  console.log(props);

  if (props.booked != undefined) {
    if (props.booked.listBooked === 0) {
      nbrBooked = 0;
    } else {
      nbrBooked = props.booked.listBooked.length;
    }
    return (
      <Card title="Réservé" bordered={true}>
        {nbrBooked} <CalendarOutlined />
      </Card>
    );
  } else {
    return <div></div>;
  }
};
