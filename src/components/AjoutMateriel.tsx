import React from "react";
import { connect } from "react-redux";

import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Button,
  Col,
  Row
} from "antd";
import { addEquipment } from "../redux/ajoutMateriel/AjoutMeterielAction";

const { Option } = Select;
const { YearPicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

const validateMessages = {
  required: "Ce champ est requis",
  types: {
    email: "Email non valide"
  }
};

const onFinish = (values: any) => {
  values.equipment["buyingDate"].format("YYYY");
};


interface Iprops {
  addEquipment: any;
  getEquipment: any;
}

const AjoutMateriel = ({ getEquipment }: Iprops) => {
  return (
    <Row>
      <Col span={12} offset={6}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={getEquipment}
          validateMessages={validateMessages}
          className="formAddMateriel"
        >
          <Form.Item
            name={["equipment", "name"]}
            label="Libellé"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["equipment", "description"]}
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name={["equipment", "buyingDate"]}
            label="Année d'achat"
            rules={[{ required: true }]}
          >
            <YearPicker />
          </Form.Item>
          <Form.Item
            name={["equipment", "category"]}
            label="Catégorie"
            rules={[{ required: true }]}
          >
            <Select placeholder="Catégorie">
              <Option value="Jardin">Jardin</Option>
              <Option value="Mécanique">Mécanique</Option>
              <Option value="Maçonnerie">Maçonnerie</Option>
              <Option value="Cuisine">Cuisine</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name={["equipment", "marque"]}
            label="Marque"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["equipment", "modele"]}
            label="Modèle"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={["equipment", "status"]}
            label="Statut"
            rules={[{ required: true }]}
          >
            <Select placeholder="Statut">
              <Option value="0">Disponible</Option>
              <Option value="1">Réservé</Option>
              <Option value="2">Emprunté</Option>
              <Option value="3">Perdu/Détérioré</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state: any) => {
  return {
    addEquipment: state.ajoutMateriel.addEquipment
  };
}; 

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEquipment: (values: any) => {
        dispatch({ type: "ADD_EQUIPMENT", values: values })
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AjoutMateriel);
