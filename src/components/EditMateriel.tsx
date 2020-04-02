import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Modal
} from "antd";
import moment from "moment";
import store from "../redux/store";
import {UploadOutlined} from "@ant-design/icons";

const {Option} = Select;
const {YearPicker} = DatePicker;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18}
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

const unSetCategories = () => {
    store.dispatch({type: "UNSET_CATEGORIES"});
};


const EditMateriel = ({equipment, categories}: Iprops) => {

    const [visible, setVisible] = useState(false);
    const [equip, setEquipment] = useState<any>({});

    useEffect(() => {
        if (equipment.length != 0) {
            setEquipment(equipment.getOneEquipmentForEdit);
            setVisible(true);
        }
    }, [equipment]);


    const handleOk = (e: any) => {
        setVisible(false);
        store.dispatch({type: "UNSET_CATEGORIES"});
    };

    const handleCancel = (e: any) => {
        setVisible(false);
        store.dispatch({type: "UNSET_CATEGORIES"});
    };

    if (categories.length != 0) {
        if (categories.getListCategoriesForEdit.length != 0) {
            if (visible) {
                console.log(equipment);

                let date = equip.buyingDate;
                date = moment(date);

                const validForm = (values: any) => {
                    onFinish(values);
                    unSetCategories();
                    success();
                };

                const success = () => {
                    Modal.success({
                        content: "Votre équipement à bien été modifier !"
                    });
                };

                const onFinish = (values: any) => {
                    if (values.equipment.name == undefined) {
                        values.equipment.name = equip.name;
                    }
                    if (values.equipment.description == undefined) {
                        values.equipment.description = equip.description;
                    }
                    if (values.equipment.buyingDate == undefined) {
                        values.equipment.buyingDate = equip.buyingDate;
                    }
                    if (values.equipment.category == undefined) {
                        values.equipment.category = equip.category;
                    }
                    if (values.equipment.marque == undefined) {
                        values.equipment.marque = equip.brand;
                    }
                    if (values.equipment.modele == undefined) {
                        values.equipment.modele = equip.modele;
                    }
                    if (values.equipment.status == undefined) {
                        values.equipment.status = equip.status;
                    }
                    if (values.equipment.id == undefined) {
                        values.equipment.id = equip.id;
                    }
                    store.dispatch({type: "EDIT_THAT_EQUIPMENT", values: values});
                    setVisible(false)
                };

                return (
                    <div className="formEdit" id="formEdit">
                        <Modal
                            title="Édition équipement"
                            visible={visible}
                            onOk={handleOk}
                            onCancel={handleCancel}
                            footer={[]}
                        >
                            <Form
                                {...layout}
                                name="nest-messages"
                                onFinish={validForm}
                                className="formAddMateriel"
                            >
                                <Form.Item name={["equipment", "name"]} label="Libellé">
                                    <Input defaultValue={equip.name}/>
                                </Form.Item>
                                <Form.Item
                                    name={["equipment", "description"]}
                                    label="Description"
                                >
                                    <Input defaultValue={equip.description}/>
                                </Form.Item>
                                <Form.Item
                                    name={["equipment", "buyingDate"]}
                                    label="Année d'achat"
                                >
                                    <YearPicker defaultValue={date}/>
                                </Form.Item>
                                <Form.Item name={["equipment", "category"]} label="Catégorie">
                                    <Select
                                        placeholder="Catégorie"
                                    >
                                        {categories.getListCategoriesForEdit.map((cat: any) => {
                                            return <Option value={cat.id}>{cat.name}</Option>;
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item name={["equipment", "marque"]} label="Marque">
                                    <Input defaultValue={equip.brand}/>
                                </Form.Item>
                                <Form.Item name={["equipment", "modele"]} label="Modèle">
                                    <Input defaultValue={equip.modele}/>
                                </Form.Item>
                                <Form.Item name={["equipment", "status"]} label="Statut">
                                    <Select placeholder="Statut" defaultValue={equip.status}>
                                        <Option value="0">Disponible</Option>
                                        <Option value="1">Réservé</Option>
                                        <Option value="2">Emprunté</Option>
                                        <Option value="3">Perdu/Détérioré</Option>
                                    </Select>
                                </Form.Item>
                                <div className="inputIdEdit">
                                    <Form.Item name={["equipment", "id"]} label="Modèle">
                                        <Input defaultValue={equip.id} disabled={true}/>
                                    </Form.Item>
                                </div>

                                <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
                                    <Button type="primary" htmlType="submit">
                                        Envoyer
                                    </Button>
                                    <Button
                                        className="cancelBtnAddEquipment"
                                        onClick={unSetCategories}
                                    >
                                        Annuler
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </div>
                );
            } else {
                return <div></div>;
            }
        } else {
            return <div></div>;
        }
    } else {
        return <div></div>;
    }

};

const mapStateToProps = (state: any) => {
    console.log(state);
    return {
        equipment: state.editMateriel.getOneEquipmentForEdit,
        categories: state.editMateriel.listCategoriesForEdit
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEquipment: () => dispatch({type: "GET_THAT_EQUIPMENT"}),
        editEquipment: (values: any) =>
            dispatch({type: "EDIT_THAT_EQUIPMENT", values: values})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMateriel);
