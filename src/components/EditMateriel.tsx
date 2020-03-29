import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Col,
  Row,
  Upload
} from "antd";
import moment from "moment";
import store from "../redux/store";
import { UploadOutlined } from "@ant-design/icons";
import firebase from "firebase";
import { resolve } from "path";

const { Option } = Select;
const { YearPicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

interface Iprops {
  equipment: any;
  getEquipment: any;
  editEquipment: any;
  categories: any;
}

// export const getEquipmentID = (state: any) => "w9d008IJw1JxlsBeOLYP";

const EditMateriel = ({ equipment, getEquipment, categories }: Iprops) => {
  const [imgUrl, setImgUrl] = useState("");

  if (categories.length != 0) {
    console.log(equipment.getOneEquipment);
    console.log(categories);

    equipment = equipment.getOneEquipment;
    let date = equipment.buyingDate;
    date = moment(date);
    const onFinish = (values: any) => {
      if (values.equipment.name == undefined) {
        values.equipment.name = equipment.name;
      }
      if (values.equipment.description == undefined) {
        values.equipment.description = equipment.description;
      }
      if (values.equipment.buyingDate == undefined) {
        values.equipment.buyingDate = equipment.buyingDate;
      }
      if (values.equipment.category == undefined) {
        values.equipment.category = equipment.category;
      }
      if (values.equipment.marque == undefined) {
        values.equipment.marque = equipment.brand;
      }
      if (values.equipment.modele == undefined) {
        values.equipment.modele = equipment.modele;
      }
      if (values.equipment.status == undefined) {
        values.equipment.status = equipment.status;
      }
      if (values.equipment.id == undefined) {
        values.equipment.id = equipment.id;
      }
      store.dispatch({ type: "EDIT_THAT_EQUIPMENT", values: values });
    };

    return (
      <Row>
        <Col span={12} offset={6}>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            className="formAddMateriel"
          >
            <Form.Item name={["equipment", "name"]} label="Libellé">
              <Input defaultValue={equipment.name} />
            </Form.Item>
            <Form.Item name={["equipment", "description"]} label="Description">
              <Input defaultValue={equipment.description} />
            </Form.Item>
            <Form.Item name={["equipment", "buyingDate"]} label="Année d'achat">
              <YearPicker defaultValue={date} />
            </Form.Item>
            <Form.Item name={["equipment", "category"]} label="Catégorie">
              <Select
                placeholder="Catégorie"
                defaultValue={equipment.category}
              >
                {categories.getListCategories.map((cat: any) => {
                  const catId = cat.doc.key.path.segments[6];
                  cat = cat.doc.proto.fields.name.stringValue;
                  console.log(cat);
                  return <Option value={catId}>{cat}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item name={["equipment", "marque"]} label="Marque">
              <Input defaultValue={equipment.brand} />
            </Form.Item>
            <Form.Item name={["equipment", "modele"]} label="Modèle">
              <Input defaultValue={equipment.modele} />
            </Form.Item>
            <Form.Item name={["equipment", "status"]} label="Statut">
              <Select
                placeholder="Statut"
                defaultValue={equipment.status}
              >
                <Option value="0">Disponible</Option>
                <Option value="1">Réservé</Option>
                <Option value="2">Emprunté</Option>
                <Option value="3">Perdu/Détérioré</Option>
              </Select>
            </Form.Item>
            <div className="inputIdEdit">
              <Form.Item name={["equipment", "id"]} label="Modèle" >
              <Input defaultValue={equipment.id} disabled={true}/>
            </Form.Item>
            </div>
            
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 4 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button className="cancelBtnAddEquipment" >
                Cancel
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    );
  } else {
    return <div></div>;
  }
};

const mapStateToProps = (state: any) => {
  return {
    equipment: state.editMateriel.getOneEquipment,
    categories: state.editMateriel.listCategories
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEquipment: () => dispatch({ type: "GET_THAT_EQUIPMENT" }),
    editEquipment: (values: any) =>
      dispatch({ type: "EDIT_THAT_EQUIPMENT", values: values })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMateriel);
