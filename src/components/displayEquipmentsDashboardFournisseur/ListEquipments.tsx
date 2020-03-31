import React, { useState } from "react";

import { List, Badge, Row, Col, Button, Table } from "antd";

import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import store from "../../redux/store";
import EditMateriel from "../../components/EditMateriel";
import { StatusBadge } from "../displayEquipmentsDashboardFournisseur/statusBadge/StatusBadge";
const { Column } = Table;
export const ListEquipments = (props: any) => {
  if (props.equipments.listEquipments != undefined) {
    console.log(props.equipments.listEquipments[0].status);
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

    if (props.equipments.listEquipments[0].status != 4) {
      return (
        <div className="listEquipment">
          <Table
            dataSource={props.equipments.listEquipments}
            pagination={{
              pageSize: 5
            }}
          >
            <Column title="Nom" dataIndex="name" key="name" />
            <Column title="Marque" dataIndex="brand" key="brand" />
            <Column title="Modele" dataIndex="modele" key="modele" />
            <Column
              title="Statut"
              dataIndex="status"
              key="status"
              render={status => <StatusBadge status={status} />}
            />
            <Column
              title="Editer"
              dataIndex="id"
              key="id"
              render={id => (
                <Button
                  type="primary"
                  icon={<EditOutlined />}
                  onClick={() => editEquipment(id)}
                />
              )}
            />
          </Table>
        </div>
      );
    }else{
      return (
        <div className="listEquipment">
          <Table
            dataSource={props.equipments.listEquipments}
            pagination={{
              pageSize: 5
            }}
          >
            <Column title="Nom" dataIndex="name" key="name" />
            <Column title="Modele" dataIndex="modele" key="modele" />
            
            <Column
              title="Valider"
              dataIndex="id"
              key="id"
              render={id => (
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => editEquipment(id)}
                />
              )}
            />
          </Table>
        </div>
      );
    }
  } else {
    return <div></div>;
  }
};
