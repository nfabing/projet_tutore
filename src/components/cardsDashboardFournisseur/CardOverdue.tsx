import React, { useState } from "react";

import { Card } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";

let nbrTotal = null;

export const CardOverdue = (props: any) => {
//   if (props.total.equipments.length === 0) {
//     nbrTotal = 0;
//   } else {
//     nbrTotal = props.total.equipments.length;
//   }
  return (
    <Card title="En retard" bordered={true} hoverable={true} headStyle={{backgroundColor: '#fafafa'}}>
      {/* {nbrTotal} <WarningOutlined twoToneColor="#526356" /> */}
    </Card>
  );
};
