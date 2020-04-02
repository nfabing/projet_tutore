import React, {useState} from "react";
import {connect} from "react-redux";

import store from "../redux/store";

import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Upload,
    Modal
} from "antd";
import {UploadOutlined, PlusCircleOutlined} from "@ant-design/icons";

const {Option} = Select;
const {YearPicker} = DatePicker;

const layout = {
    labelCol: {span: 4},
    wrapperCol: {span: 18}
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


const AjoutMateriel = ({getEquipment, categories, getCategories, user}: Iprops) => {
    const [visible, setVisible] = useState(false);

    const callDispatch = (values: any) => {
        getEquipment(values, user.useruid);
        store.dispatch({type: "UNSET_CATEGORIES"});
        setVisible(false);
        success();
    };
    const unSetCategories = () => {
        setVisible(false);
        store.dispatch({type: "UNSET_CATEGORIES"});
    };
    const success = () => {
        Modal.success({
            content: "Votre équipement à bien été ajouter !"
        });
    };

    const showModal = () => {
        setVisible(true);
        getCategories();
    };

    const handleOk = (e: any) => {
        setVisible(false);
        store.dispatch({type: "UNSET_CATEGORIES"});
    };

    const handleCancel = (e: any) => {
        setVisible(false);
        store.dispatch({type: "UNSET_CATEGORIES"});
    };


    if (categories.length != 0) {
        if (categories.categoriesForFournisseur.length != 0) {
            return (
                <div>
                    <Modal
                        title="Ajouter un équipement"
                        visible={visible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        footer={[
                            <Button
                                className="cancelBtnAddEquipment"
                                onClick={unSetCategories}
                            >
                                Annuler
                            </Button>
                        ]}
                    >
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
                                rules={[{required: true}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name={["equipment", "description"]}
                                label="Description"
                                rules={[{required: true}]}
                            >
                                <Input.TextArea/>
                            </Form.Item>
                            <Form.Item
                                name={["equipment", "buyingDate"]}
                                label="Année d'achat"
                                rules={[{required: true}]}
                            >
                                <YearPicker/>
                            </Form.Item>
                            <Form.Item
                                name={["equipment", "category"]}
                                label="Catégorie"
                                rules={[{required: true}]}
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
                                rules={[{required: true}]}
                            >
                                <Input/>
                            </Form.Item>
                            <Form.Item
                                name={["equipment", "modele"]}
                                label="Modèle"
                                rules={[{required: true}]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                name="upload"
                                label="Image"
                                valuePropName="fileList"
                                getValueFromEvent={normFile}
                                rules={[{required: true}]}
                            >
                                <Upload name="logo" action="equipments/" listType="picture">
                                    <Button>
                                        <UploadOutlined/> Cliquer pour ajouter
                                    </Button>
                                </Upload>
                            </Form.Item>

                            <Form.Item wrapperCol={{...layout.wrapperCol, offset: 4}}>
                                <Button type="primary" htmlType="submit">
                                    Envoyer
                                </Button>

                            </Form.Item>
                        </Form>
                    </Modal>
                </div>

            );
        } else {
            return (
                <Button onClick={showModal} size={"middle"} className="buttonDashboard">
                    <PlusCircleOutlined/> Ajouter un équipement
                </Button>
            );
        }
    } else {
        return (
            <Button onClick={showModal} size={"middle"} className="buttonDashboard">
                <PlusCircleOutlined/> Ajouter un équipement
            </Button>
        );
    }
};

const mapStateToProps = (state: any) => {
    return {
        addEquipment: state.ajoutMateriel.addEquipment,
        categories: state.ajoutMateriel.listCategoriesForFournisseur,
        user: state.user.profil
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getEquipment: (values: any, user: any) => {
            dispatch({type: "ADD_EQUIPMENT", values: values, user: user});
        },
        getCategories: () => {
            dispatch({type: "GET_CATEGORIES_FORM_FOURNISSEUR"});
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AjoutMateriel);
