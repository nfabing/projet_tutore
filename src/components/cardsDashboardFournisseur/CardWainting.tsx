import React, { useState } from "react";

import { Card } from "antd";
import { CalendarOutlined } from "@ant-design/icons";

let nbrWaiting = null;

export const CardWainting = (props: any) => {
  console.log(props);

  if (props.waiting != undefined) {
    if (props.waiting.listWaiting === 0) {
      nbrWaiting = 0;
    } else {
      nbrWaiting = props.waiting.listWaiting.length;
    }
    return (
      <Card title="En attente de validation" bordered={true}>
        {nbrWaiting} <CalendarOutlined />
      </Card>
    );
  } else {
    return <div>NOPE</div>;
  }
};
