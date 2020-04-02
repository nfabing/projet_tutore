import React from "react";

import { Card } from "antd";
import { ImportOutlined } from "@ant-design/icons";

let nbrLoan = null;

export const CardLoan = (props: any) => {
  console.log(props);
  if (props.loan.length === 0) {
    nbrLoan = 0;
  } else {
    nbrLoan = props.loan.listLoan.length;
  }
  return (
    <Card title="Matériel Emprunté" bordered={true} hoverable={true} headStyle={{backgroundColor: '#fafafa'}}>
      {nbrLoan} <ImportOutlined />
    </Card>
  );
};
