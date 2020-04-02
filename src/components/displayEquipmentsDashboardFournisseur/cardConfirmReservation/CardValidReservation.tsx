import React, {useState} from "react";

import {
    Button,
    Table,
    Modal,
    DatePicker,
    Form,
    Input
} from "antd";

import {
    EditOutlined,
    CheckOutlined,
    SearchOutlined,
    ExclamationCircleTwoTone,
    CloseOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import moment from "moment";

import store from "../../../redux/store";
    const {Column} = Table;
    const { confirm } = Modal;

export const CardConfirmReservation = (props: any) => {
    const [visible, setVisible] = useState(false);
    const [idReserve, setId] = useState("");
    const [idEquip, setIdEquipment] = useState("");
    let equip = props.equipment;
    console.log(equip);

    const validateMessages = {
        required: "Ce champ est requis"
    };

    const valideReservation = (values: any) => {
        if (values.equipment.id === undefined) {
            values.equipment.id = idReserve;
        }
        if(values.equipment.idEquipment === undefined){
            values.equipment.idEquipment = idEquip;
        }
        setVisible(false);
        store.dispatch({type: "CONFIRM_RESERVATION", values: values})
    };

    const showModal = (id: any, idEqmt: any) => {
        console.log(idEqmt.idEquipment);
        setVisible(true);
        setId(id);
        setIdEquipment(idEqmt.idEquipment);
    };

    const showConfirm = (id: any, idEquipment: any) => {
        confirm({
            title: 'Confirmer ?',
            icon: <ExclamationCircleOutlined />,
            content: 'En cliquant sur Oui vous confirmez la validation de cette reservation.',
            okText: 'Oui',
            okType: 'primary',
            cancelText: 'Non',
            onOk() {
                console.log(idEquipment);
                store.dispatch({type: "CONFIRM_RESERVATION", values: idEquipment})
            },
            onCancel() {},
        });
    };
    const showDeleteConfirm = (values: any) => {
        confirm({
            title: 'Confirmer ?',
            icon: <ExclamationCircleOutlined />,
            content: 'En cliquant sur OK vous confirmez le refus de cette reservation.',
            okText: 'OK',
            okType: 'danger',
            cancelText: 'Non',
            onOk() {
                store.dispatch({type: "REFUSE_RESERVATION", values: values})
            },
            onCancel() {},
        });
    };

    const handleOk = (e: any) => {
        setVisible(false);
        setId("");
        setIdEquipment("");
    };

    const handleCancel = (e: any) => {
        setVisible(false);
        setId("");
        setIdEquipment("");
    };

    function disabledDate(current: any) {
        return current && current < moment().endOf('day');
    }


    return (
        <div>
            <Table
                dataSource={equip}
                pagination={{
                    pageSize: 5
                }}
            >
                <Column title="Utilisateur" dataIndex="nameUser" key="nameUser"/>
                <Column title="Email" dataIndex="mailUser" key="mailUser"/>
                <Column title="Equipement" dataIndex="nameEquipment" key="nameEquipment"/>
                <Column title="Date Début" dataIndex="dateDebut" key="dateDebut"/>
                <Column title="Date Fin" dataIndex="dateFin" key="dateFin"/>
                <Column
                    title="Actions"
                    dataIndex="id"
                    render={(id, idEquipment) => (
                        <div>
                            <Button
                                type="primary"
                                icon={<CheckOutlined/>}
                                onClick={() => showConfirm(id, idEquipment)}
                            />
                            <Button
                                type="default"
                                icon={<CloseOutlined/>}
                                onClick={() => showDeleteConfirm(id)}
                            />
                        </div>
                    )}
                />
            </Table>
        </div>
    );
};
