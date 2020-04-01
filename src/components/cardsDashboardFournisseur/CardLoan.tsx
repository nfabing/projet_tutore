import React, { useState } from "react";

import { Card } from "antd";
import { ImportOutlined } from "@ant-design/icons";

let nbrLoan = null;

export const CardLoan = (props: any) => {
  // if (props.loan.length === 0) {
  //   nbrLoan = 0;
  // } else {
  //   nbrLoan = props.loan.listLoan.length;
  // }
  return (
    <Card title="Matériel Emprunté" bordered={true}>
      {/*{nbrLoan} <ImportOutlined />*/}
    </Card>
  );
};
