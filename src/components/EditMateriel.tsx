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
    console.log(equipment.getOneEquipment.img);
    let img = equipment.getOneEquipment.img.integerValue;
    let storage = firebase.storage();
    let path = storage.refFromURL(
      "gs://projet-tutore-6833d.appspot.com/equipments/" + img
    );
    path.getDownloadURL().then(function(url) {
      setImgUrl(url)
    })

    equipment = equipment.getOneEquipment;
    let date = equipment.buyingDate.stringValue;
    date = moment(date);
    const onFinish = (values: any) => {
      if (values.equipment.name == undefined) {
        values.equipment.name = equipment.name.stringValue;
      }
      if (values.equipment.description == undefined) {
        values.equipment.description = equipment.description.stringValue;
      }
      if (values.equipment.buyingDate == undefined) {
        values.equipment.buyingDate = equipment.buyingDate.stringValue;
      }
      if (values.equipment.category == undefined) {
        values.equipment.category = equipment.category.stringValue;
      }
      if (values.equipment.marque == undefined) {
        values.equipment.marque = equipment.brand.stringValue;
      }
      if (values.equipment.modele == undefined) {
        values.equipment.modele = equipment.modele.stringValue;
      }
      if (values.equipment.status == undefined) {
        values.equipment.status = equipment.status.stringValue;
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
              <Input defaultValue={equipment.name.stringValue} />
            </Form.Item>
            <Form.Item name={["equipment", "description"]} label="Description">
              <Input defaultValue={equipment.description.stringValue} />
            </Form.Item>
            <Form.Item name={["equipment", "buyingDate"]} label="Année d'achat">
              <YearPicker defaultValue={date} />
            </Form.Item>
            <Form.Item name={["equipment", "category"]} label="Catégorie">
              <Select
                placeholder="Catégorie"
                defaultValue={equipment.category.stringValue}
              >
                {categories.getListCategories.map((cat: any) => {
                  const catId = cat.doc.key.path.segments[6];
                  cat = cat.doc.proto.fields.name.stringValue;
                  return <Option value={catId}>{cat}</Option>;
                })}
              </Select>
            </Form.Item>
            <Form.Item name={["equipment", "marque"]} label="Marque">
              <Input defaultValue={equipment.brand.stringValue} />
            </Form.Item>
            <Form.Item name={["equipment", "modele"]} label="Modèle">
              <Input defaultValue={equipment.modele.stringValue} />
            </Form.Item>
            <Form.Item name={["equipment", "status"]} label="Statut">
              <Select
                placeholder="Statut"
                defaultValue={equipment.status.stringValue}
              >
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
            >
              <Upload name="logo" action="equipments/" listType="picture">
                <Button>
                  <UploadOutlined /> Cliquer pour ajouter
                </Button>
                <div>
                  <img src={imgUrl}></img>
                </div>
              </Upload>
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
