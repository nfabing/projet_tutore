import React from "react";
import { connect } from "react-redux";

import store from "../redux/store";

import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Col,
  Row,
  Upload,
  Modal
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

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

const normFile = (e: any) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

interface Iprops {
  addEquipment: any;
  getEquipment: any;
  categories: any;
  getCategories: any;
  user: any;
}

const unSetCategories = () => {
  store.dispatch({ type: "UNSET_CATEGORIES" });
};

const AjoutMateriel = ({ getEquipment, categories, getCategories, user }: Iprops) => {
const callDispatch = (values: any) => {
  getEquipment(values, user.useruid);
  store.dispatch({ type: "UNSET_CATEGORIES" });
  success();
}
const success = () => {
  Modal.success({
    content: "Votre équipement à bien été ajouter !"
  });
};
  if (categories.length != 0) {
    console.log(categories);
    if (categories.categoriesForFournisseur.length != 0) {
      return (
        <Row>
          <Col span={12} offset={6}>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={callDispatch}
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
                  {categories.categoriesForFournisseur.map((cat: any) => {
                    return <Option value={cat.id}>{cat.name}</Option>;
                  })}
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
              <Form.Item
                name="upload"
                label="Image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: true }]}
              >
                <Upload name="logo" action="equipments/" listType="picture">
                  <Button>
                    <UploadOutlined /> Cliquer pour ajouter
                  </Button>
                </Upload>
              </Form.Item>

              <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
                <Button
                  className="cancelBtnAddEquipment"
                  onClick={unSetCategories}
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      );
    } else {
      return (
        <Button onClick={getCategories} size={"large"}>
          Add Equipment
        </Button>
      );
    }
  } else {
    return (
      <Button onClick={getCategories} size={"large"}>
        Add Equipment
      </Button>
    );
  }
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    addEquipment: state.ajoutMateriel.addEquipment,
    categories: state.ajoutMateriel.listCategoriesForFournisseur,
    user: state.user.profil
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEquipment: (values: any, user: any) => {
      dispatch({ type: "ADD_EQUIPMENT", values: values, user: user});
    },
    getCategories: () => {
      dispatch({ type: "GET_CATEGORIES_FORM_FOURNISSEUR" });
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AjoutMateriel);
