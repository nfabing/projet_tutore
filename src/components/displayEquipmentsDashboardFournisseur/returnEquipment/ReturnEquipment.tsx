import React, {useState} from "react";
import {connect} from "react-redux";

import store from "../../../redux/store";

import {
    Button,
    Modal,
    Table
} from "antd";
import {UploadOutlined, RollbackOutlined, CheckOutlined,CloseOutlined} from "@ant-design/icons";

const {Column} = Table;


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
