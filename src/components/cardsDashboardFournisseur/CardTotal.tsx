import React, { useState } from "react";

import { Card } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";

let nbrTotal = null;

const changeColorIn = (e: any) => {
  e.target.style.background = "#111111";
};

const changeColorOut = (e: any) => {
  e.target.style.background = "";
};

export const CardTotal = (props: any) => {
  console.log(props)
  if (props.total.length === 0) {
    nbrTotal = 0;
  } else {
    nbrTotal = props.total.length;
  }
  return (
    // <div onMouseEnter={changeColorIn} onMouseLeave={changeColorOut}>
    <div>
      <Card title="Total Matériel" bordered={true}>
        {nbrTotal} <DatabaseOutlined />
      </Card>
    </div>
  );
};
