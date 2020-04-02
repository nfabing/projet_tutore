import React from "react";

import { Card } from "antd";
import { HourglassOutlined } from "@ant-design/icons";

let nbrTotal = "";

export const CardOverdue = (props: any) => {
  console.log(props);
  if (props.overdue.listOverdue === undefined) {
    nbrTotal = "0";
  } else {
    nbrTotal = props.overdue.listOverdue.length;
  }
  return (
    <Card title="En retard" bordered={true} hoverable={true} headStyle={{backgroundColor: '#fafafa'}}>
       {nbrTotal} <HourglassOutlined />
    </Card>
  );
};
