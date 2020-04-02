import React from "react";

import { Card } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";

let nbrTotal = null;


export const CardTotal = (props: any) => {
  if (props.total.length === 0) {
    nbrTotal = 0;
  } else {
    nbrTotal = props.total.length;
  }
  return (
    <div>
      <Card title="Total Matériel" bordered={true} hoverable={true} headStyle={{backgroundColor: '#fafafa'}}>
        {nbrTotal} <DatabaseOutlined />
      </Card>
    </div>
  );
};
