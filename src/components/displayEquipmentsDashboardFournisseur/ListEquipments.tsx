import React, { useState } from "react";

import { List, Badge, Row, Col, Button } from "antd";
import {
  EditOutlined
} from "@ant-design/icons";
import store from "../../redux/store";
import EditMateriel from "../../components/EditMateriel";
import { StatusBadge } from "../displayEquipmentsDashboardFournisseur/statusBadge/StatusBadge"

export const ListEquipments = (props: any) => {
  console.log(props);

  if (props.equipments.listEquipments != undefined) {
    const editEquipment = (id: any) => {
      //A APPELER QUAND LE FORM EST SUBMIT
      store.dispatch({ type: "GET_THAT_EQUIPMENT", id: id });
    };
    return (
      <div>
        <List
          bordered
          dataSource={props.equipments.listEquipments}
          renderItem={(item: any) => (
            <List.Item>
              <Col span={4}>
                <div className="divTabEquipments">{item.name}</div>
              </Col>
              <Col span={4}>
                <div className="divTabEquipments">{item.description}</div>
              </Col>
              <Col span={4}>
                <div className="divTabEquipments">{item.brand}</div>
              </Col>
              <Col span={4}>
                <div className="divTabEquipments">{item.modele}</div>
              </Col>
              <Col span={4}>
                <StatusBadge status={item.status}/>
              </Col>
              <Col span={4}>
              <div className="divTabEquipments"><Button type="primary" icon={<EditOutlined />} onClick={() => editEquipment(item.id)} /></div>
              </Col>
            </List.Item>
          )}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};
