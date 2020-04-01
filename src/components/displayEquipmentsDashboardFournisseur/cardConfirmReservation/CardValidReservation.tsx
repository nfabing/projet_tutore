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
import moment from "moment";

import store from "../../../redux/store";

export const CardConfirmReservation = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [id, setId] = useState("");
  console.log(props);
  let equip = props.equipment;

  const validateMessages = {
    required: "Ce champ est requis"
  };

  const valideReservation = (values: any) => {
      if(values.id === undefined) {
          values.id = equip.id;
      };
      store.dispatch({type: "CONFIRM_RESERVATION", values: values})
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  function disabledDate(current: any) {
    return current && current < moment().endOf('day');
  }


  return (
    <Col span={8}>
      <Modal
        title="Valider la réservation"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Annuler
          </Button>
        ]}
      >
        <Form
          name="nest-messages"
          onFinish={valideReservation}
          validateMessages={validateMessages}
        >
          <Form.Item
            name={["equipment", "restitution"]}
            label="Date de restitution : "
            rules={[{ required: true }]}
          >
            <DatePicker
              format="DD/MM/YYYY"
              defaultValue={moment(new Date(), "DD/MM/YYYY")}
              disabledDate={disabledDate}
            />
          </Form.Item>
          <div className="inputIdEdit">
            <Form.Item name={["equipment", "id"]} label="id">
              <Input defaultValue={equip.id} disabled={true} />
            </Form.Item>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Card bordered={true}>
        <Row>
          <Col span={8}>
            <Row>
              <Avatar src={equip.img} />
            </Row>
            <Row>
              <strong>{equip.name}</strong>
            </Row>
          </Col>
          <Col offset={1}>
            <div>Début : {equip.reservation[1].dateDebut}</div>
            <div>Fin : {equip.reservation[1].dateFin}</div>
          </Col>
        </Row>
        <Row>
          <Col span={8} offset={20}>
            <Row>
              <Col>
                <Button
                  type="primary"
                  icon={<CheckOutlined />}
                  onClick={() => showModal()}
                />
              </Col>
              <Col offset={1}>
                <Button type="danger" icon={<CloseOutlined />} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Col>
  );
};
