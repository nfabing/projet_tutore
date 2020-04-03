import React from "react";

import {
    Button,
    Table,
} from "antd";

import {
    EditOutlined,
    CheckOutlined,
    SearchOutlined,
    ExclamationCircleTwoTone,
    CloseOutlined
} from "@ant-design/icons";
import store from "../../redux/store";

import {StatusBadge} from "./statusBadge/StatusBadge";
import {CardConfirmReservation} from "./cardConfirmReservation/CardValidReservation";
import {BookedToLoan} from "./bookedToLoan/bookedToLoan";

const {Column} = Table;

export const ListEquipments = (props: any) => {
    if (props.equipments.listEquipments != undefined) {
        console.log(props);

        const editEquipment = (id: any) => {
            store.dispatch({type: "GET_THAT_EQUIPMENT_FOR_EDIT", id: id});
        };

        if (props.equipments.listEquipments.length != 0) {
            // SI ON EST PAS DANS UNE LISTE DE LA COLLECTION RESERVATION
            if (props.equipments.listEquipments[0].idEquipment === undefined) {
                return (
                    <div className="listEquipment">
                        <Table
                            dataSource={props.equipments.listEquipments}
                            pagination={{
                                pageSize: 5
                            }}
                        >
                            <Column title="Nom" dataIndex="name" key="name"/>
                            <Column title="Marque" dataIndex="brand" key="brand"/>
                            <Column title="Modele" dataIndex="modele" key="modele"/>
                            <Column
                                title="Statut"
                                dataIndex="status"
                                key="status"
                                render={status => <StatusBadge status={status}/>}
                            />
                            <Column
                                title="Editer"
                                dataIndex="id"
                                key="id"
                                render={id => (
                                    <Button
                                        type="primary"
                                        icon={<EditOutlined/>}
                                        onClick={() => editEquipment(id)}
                                    />
                                )}
                            />
                        </Table>
                    </div>
                );
            } else {
                if (props.equipments.listEquipments[0].idEquipment != undefined && props.equipments.listEquipments[0].status === "1") {
                    return (
                        <div className="listEquipment">
                            <Table
                                dataSource={props.equipments.listEquipments}
                                pagination={{
                                    pageSize: 5
                                }}
                            >
                                <Column title="Utilisateur" dataIndex="nameUser" key="nameUser"/>
                                <Column title="E-Mail" dataIndex="mailUser" key="mailUser"/>
                                <Column title="Equipement" dataIndex="nameEquipment" key="nameEquipment"/>
                                <Column title="Date Début" dataIndex="dateDebut" key="dateDebut"/>
                                <Column title="Date Fin" dataIndex="dateFin" key="dateFin"/>
                                <Column
                                    title="Équipement récupéré ?"
                                    dataIndex="id"
                                    key="id"
                                    render={(id, dateDebut) => (
                                        <div>
                                            <BookedToLoan equipment={[id, dateDebut]}/>
                                        </div>

                                    )}
                                />
                            </Table>
                        </div>
                    );
                } else {
                    if (props.equipments.listEquipments[0].idEquipment != undefined && props.equipments.listEquipments[0].status === "3"){
                        return (
                            <div className="listEquipment">
                                <Table
                                    dataSource={props.equipments.listEquipments}
                                    pagination={{
                                        pageSize: 5
                                    }}
                                >
                                    <Column title="Utilisateur" dataIndex="nameUser" key="nameUser"/>
                                    <Column title="E-Mail" dataIndex="mailUser" key="mailUser"/>
                                    <Column title="Equipement" dataIndex="nameEquipment" key="nameEquipment"/>
                                    <Column title="Date de Fin" dataIndex="dateFin" key="dateFin"/>
                                </Table>
                            </div>
                        );
                    }else{
                        return (
                            <div className="listEquipment">
                                <CardConfirmReservation equipment={props.equipments.listEquipments}/>
                            </div>
                        );
                    }

                }

            }
        } else {
            // AFFICHE LA LISTE VIDE SI AUCUN EQUIPEMENT N EST RETOURNER
            return (
                <div className="listEquipment">
                    <Table
                        dataSource={[]}
                        pagination={{
                            pageSize: 5
                        }}
                    >
                        <Column title="Nom" dataIndex="name" key="name"/>
                        <Column title="Marque" dataIndex="brand" key="brand"/>
                        <Column title="Modele" dataIndex="modele" key="modele"/>
                        <Column
                            title="Statut"
                            dataIndex="status"
                            key="status"
                            render={status => <StatusBadge status={status}/>}
                        />
                        <Column
                            title="Editer"
                            dataIndex="id"
                            key="id"
                            render={id => (
                                <Button
                                    type="primary"
                                    icon={<EditOutlined/>}
                                    onClick={() => editEquipment(id)}
                                />
                            )}
                        />
                    </Table>
                </div>
            );
        }

    } else {
        return <div></div>;
    }
};
