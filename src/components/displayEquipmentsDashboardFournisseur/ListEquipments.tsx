import React, { useState } from "react";

import { List, Badge, Row, Col, Button, Table } from "antd";
import { EditOutlined } from "@ant-design/icons";
import store from "../../redux/store";
import EditMateriel from "../../components/EditMateriel";
import { StatusBadge } from "../displayEquipmentsDashboardFournisseur/statusBadge/StatusBadge";

export const ListEquipments = (props: any) => {

  if (props.equipments.listEquipments != undefined) {
    console.log(props.equipments.listEquipments);
    // let img = equipment.getOneEquipment.img.integerValue;
    // let storage = firebase.storage();
    // let path = storage.refFromURL(
    //   "gs://projet-tutore-6833d.appspot.com/equipments/" + img
    // );
    // path.getDownloadURL().then(function(url) {
    //   setImgUrl(url)
    // })

    const editEquipment = (id: any) => {
      //A APPELER QUAND LE FORM EST SUBMIT
      store.dispatch({ type: "GET_THAT_EQUIPMENT", id: id });
    };

    const columns = [
      { title: 'Nom', dataIndex: 'name', key: 'name' },
      { title: 'Marque', dataIndex: 'brand', key: 'brand' },
      { title: 'Modele', dataIndex: 'modele', key: 'modele' },
      { title: 'Status', dataIndex: 'status', key: 'status'},
      {
        title: 'Action',
        dataIndex: '',
        key: 'x',
        render: () => <a>Delete</a>,
      },
    ];

    return (
      <div className="listEquipment">
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: record => (
              <p style={{ margin: 0 }}>{record.description}</p>
            )
          }}
          dataSource={props.equipments.listEquipments}
        />
        {/* <List
          bordered
          dataSource={props.equipments.listEquipments}
          renderItem={(item: any) => (
            <List.Item>
              <Col span={4}>
                <img src={item.img} className="imgEquipment"></img>
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
        /> */}
      </div>
    );
  } else {
    return <div></div>;
  }
};
