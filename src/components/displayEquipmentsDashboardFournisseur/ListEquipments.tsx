import React, { useState } from "react";

import {
  Card,
  Badge,
  Row,
  Col,
  Button,
  Table,
  Modal,
  Avatar,
  DatePicker,
  Form,
  Input
} from "antd";

import {
  EditOutlined,
  CheckOutlined,
  SearchOutlined,
  ExclamationCircleTwoTone,
  CloseOutlined
} from "@ant-design/icons";
import store from "../../redux/store";

import EditMateriel from "../../components/EditMateriel";
import { StatusBadge } from "./statusBadge/StatusBadge";
import { CardConfirmReservation } from "./cardConfirmReservation/CardValidReservation";

const { Column } = Table;
const { confirm } = Modal;

export const ListEquipments = (props: any) => {
  console.log(props);
  if (props.equipments.listEquipments != undefined) {

    // const showConfirm = () => {
    //   confirm({
    //     title: "Accepter la reservation ?",
    //     icon: <ExclamationCircleTwoTone />,
    //     content: <DatePicker />,
    //     onCancel() {}
    //   });
    // };
    // const showCancel = () => {
    //   confirm({
    //     title: "Reffuser la reservation ?",
    //     icon: <ExclamationCircleTwoTone />,
    //     content:
    //       "When clicked the OK button, this dialog will be closed after 1 second",
    //     onOk() {
    //       return new Promise((resolve, reject) => {
    //         setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
    //       }).catch(() => console.log("Oops errors!"));
    //     },
    //     onCancel() {}
    //   });
    // };

    // let img = equipment.getOneEquipment.img.integerValue;
    // let storage = firebase.storage();
    // let path = storage.refFromURL(
    //   "gs://projet-tutore-6833d.appspot.com/equipments/" + img
    // );
    // path.getDownloadURL().then(function(url) {
    //   setImgUrl(url)
    // })

    const editEquipment = (id: any) => {
      store.dispatch({ type: "GET_THAT_EQUIPMENT_FOR_EDIT", id: id });
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
    } else {
      console.log(props.equipments.listEquipments[1].reservation[1].dateDebut);
      return (
        <div className="listEquipment">
          <div className="site-card-wrapper">
            <Row gutter={16}>
              {props.equipments.listEquipments.map((equip: any) => {
                return (
                  <CardConfirmReservation equipment={equip}/>
                );
              })}
            </Row>
          </div>
          {/* <Table
            dataSource={props.equipments.listEquipments}
            pagination={{
              pageSize: 5
            }}
          >
            <Column title="Nom" dataIndex="name" key="name" />
            <Column title="Modele" dataIndex="modele" key="modele"/>
            
            <Column
              title="Valider"
              dataIndex="id"
              key="id"
              render={id => (
                <div>
                  <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => editEquipment(id)}
                />
                <Button
                  type="default"
                  icon={<SearchOutlined />}
                  onClick={() => showConfirm()}
                />
                </div>
                
              )}
            />
          </Table> */}
        </div>
      );
    }
  } else {
    return <div> </div>;
  }
};
