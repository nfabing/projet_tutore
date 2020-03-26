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
import moment from "moment";
// import { editEquipments } from "../redux/editMateriel/EditMaterielAction";
import store from "../redux/store";

const { Option } = Select;
const { YearPicker } = DatePicker;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
};

interface Iprops {
  equipment: any;
  getEquipment: any;
  editEquipment: any;
}

export const getEquipmentID = (state: any) => "NVY1JxmbYwhmMfwZwLmu";
const DashboardFournisseur = ({ equipment, getEquipment, editEquipment }: Iprops) => {
  if (equipment.length != 0) {
    console.log(equipment)
    equipment = equipment.getOneEquipment;


    let date = equipment.buyingDate.stringValue;
    date = moment(date);
    
    const onFinish = (values: any) => {
      if(values.equipment.name == undefined){
        values.equipment.name = equipment.name.stringValue
      }
      if(values.equipment.description == undefined){
        values.equipment.description = equipment.description.stringValue
      }
      if(values.equipment.buyingDate == undefined){
        values.equipment.buyingDate = equipment.buyingDate.stringValue
      }
      if(values.equipment.category == undefined){
        values.equipment.category = equipment.category.stringValue
      }
      if(values.equipment.marque == undefined){
        values.equipment.marque = equipment.brand.stringValue
      }
      if(values.equipment.modele == undefined){
        values.equipment.modele = equipment.modele.stringValue
      }
      if(values.equipment.status == undefined){
        values.equipment.status = equipment.status.stringValue
      }
      store.dispatch({type: "EDIT_THAT_EQUIPMENT", values: values})
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
                <Option value="Jardin">Jardin</Option>
                <Option value="Mécanique">Mécanique</Option>
                <Option value="Maçonnerie">Maçonnerie</Option>
                <Option value="Cuisine">Cuisine</Option>
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
    return (
      <Button onClick={getEquipment} size={"large"}>
        Edit Equipment
      </Button>
    );
  }
};

const mapStateToProps = (state: any) => {
  return {
    equipment: state.editMateriel.getOneEquipment
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEquipment: () => dispatch({ type: "GET_THAT_EQUIPMENT" }),
    editEquipment: (values: any) => dispatch({type: "EDIT_THAT_EQUIPMENT", values: values})
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardFournisseur);
