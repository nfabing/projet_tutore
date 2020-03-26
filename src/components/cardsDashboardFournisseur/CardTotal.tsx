import React, { useState } from "react";

import { Card } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";

let nbrTotal = null;

export const CardTotal = (props: any) => {
  console.log(props);
  if (props.total.equipments.length === 0) {
    nbrTotal = 0;
  } else {
    nbrTotal = props.total.equipments.length;
  }
  return (
    <Card title="Total Matériel" bordered={true}>
      {nbrTotal} <DatabaseOutlined />
    </Card>
  );
};
