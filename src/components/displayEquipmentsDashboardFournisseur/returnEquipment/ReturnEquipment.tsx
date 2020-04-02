import React, {useState} from "react";
import {connect} from "react-redux";

import store from "../../../redux/store";

import {
    Form,
    Input,
    Select,
    DatePicker,
    Button,
    Col,
    Row,
    Upload,
    Modal,
    Table
} from "antd";
import {UploadOutlined, RollbackOutlined, CheckOutlined,CloseOutlined} from "@ant-design/icons";
import {StatusBadge} from "../statusBadge/StatusBadge";

const {Option} = Select;
const {YearPicker} = DatePicker;
const {Column} = Table;

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
    listReturnEquipments: any;
    user: any;
}

const unSetCategories = () => {
    store.dispatch({type: "UNSET_CATEGORIES"});
};

const AjoutMateriel = ({getEquipment, categories, getCategories, user, listReturnEquipments}: Iprops) => {
    const [visibleReturn, setVisibleReturn] = useState(false);

    console.log(listReturnEquipments);
    const callDispatch = (values: any) => {
        getEquipment(values, user.useruid);
        setVisibleReturn(false);
        success();
    };

    const success = () => {
        Modal.success({
            content: "Votre équipement à bien été ajouter !"
        });
    };

    const showModal = () => {
        store.dispatch({type: "GET_RETURN_EQUIPMENT", user: user});
        setVisibleReturn(true);
        getCategories();
    };

    const handleOk = (e: any) => {
        setVisibleReturn(false);
    };

    const handleCancel = (e: any) => {
        setVisibleReturn(false);
        unSetCategories();
    };

    const returnOk = (idEquipment: any, idReserve: any) => {
        console.log(idEquipment);
        store.dispatch({type: "SET_STATUS_RETURN", idEquipment: idEquipment, idReserve: idReserve})
    };

    const returnDeclined = (idEquipment: any, idReserve: any) => {
        console.log(idEquipment);
        store.dispatch({type: "SET_STATUS_RETURN_PROBLEME", idEquipment: idEquipment, idReserve: idReserve})
    };

    if(listReturnEquipments.listReturnEquipments === undefined) {
        return (
            <Button onClick={showModal} size={"middle"} className="buttonDashboard">
                <RollbackOutlined/> Retourné(s)
            </Button>
        )
    }else{
        return (
            <div>
                <Modal
                    title="Liste de retour"
                    visible={visibleReturn}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={[
                        <Button key="back" onClick={handleCancel}>
                            Retour
                        </Button>,
                    ]}
                >
                    <Table
                        dataSource={listReturnEquipments.listReturnEquipments}
                        pagination={{
                            pageSize: 5
                        }}
                    >
                        <Column title="Utilisateur" dataIndex="nameUser" key="nameUser"/>
                        <Column title="Équipement" dataIndex="nameEquipment" key="nameEquipment"/>
                        <Column
                            title="État"
                            dataIndex="idEquipment"
                            key="id"
                            render={(idEquipment, id) => (
                                <div>
                                    <Button
                                        type="primary"
                                        icon={<CheckOutlined />}
                                        onClick={() => returnOk(idEquipment, id)}
                                    >OK</Button>
                                    <Button
                                        type="danger"
                                        icon={<CloseOutlined />}
                                        onClick={() => returnDeclined(idEquipment, id)}
                                    >Perdu/Détérioré</Button>
                                </div>

                            )}
                        />
                    </Table>


                </Modal>
                <Button onClick={showModal} size={"middle"} className="buttonDashboard">
                    <RollbackOutlined/> Retourné(s)
                </Button>
            </div>

        );
    }



};

const mapStateToProps = (state: any) => {
    return {
        addEquipment: state.ajoutMateriel.addEquipment,
        categories: state.ajoutMateriel.listCategoriesForFournisseur,
        listReturnEquipments: state.dashboardFournisseur.listReturnEquipments,
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
