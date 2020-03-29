import React, { useState } from "react";

import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

let nbrBooked = null;

export const CardBooked = (props: any) => {
//   if (props.total.equipments.length === 0) {
//     nbrBooked = 0;
//   } else {
//     nbrBooked = props.total.equipments.length;
//   }
  return (
    <Card title="Réservé" bordered={true}>
      {/* {nbrBooked} <CalendarOutlined /> */}
    </Card>
  );
};
