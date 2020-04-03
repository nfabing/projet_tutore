import React from "react";

import {Button, Modal} from "antd";
import { CheckOutlined,CloseOutlined, ExclamationCircleOutlined  } from "@ant-design/icons";
import store from "../../../redux/store";

const { confirm } = Modal;

export const BookedToLoan = (props: any) => {
    // console.log(props);
    let dateNow = new Date();
    let dateDebut = props.equipment[1].dateDebut;
    dateDebut = dateDebut.split("/");
    dateDebut = dateDebut[1]+"/"+dateDebut[0]+"/"+dateDebut[2];
    dateDebut = new Date(dateDebut);

    let dif = parseInt(Number((dateDebut.getTime() / 86400000) - (dateNow.getTime() / 86400000)).toFixed(0));


    const showConfirm = (id: any) => {
        confirm({
            title: 'Validation de récupération',
            icon: <ExclamationCircleOutlined />,
            content: 'Cliquer sur OK si l\'utilisateur à récupéré son équipement.',
            cancelText: 'Non',
            onOk() {
                store.dispatch({type: "SET_BOOKED_TO_LOAN", values: id})
            },
            onCancel() {
            },
        });
    };

    const showDienied = (id: any) => {
        confirm({
            title: 'Validation de récupération',
            icon: <ExclamationCircleOutlined />,
            content: 'Cliquer sur OUI si l\'utilisateur n\'à pas récupéré son équipement.',
            okText: 'OUI',
            okType: 'danger',
            cancelText: 'Non',
            onOk() {
                store.dispatch({type: "SET_BOOKED_TO_CANCEL", values: id})
            },
            onCancel() {
            },
        });
    };


    if(dif <= 0){
        return (
            <div>
                <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => showConfirm(props.equipment[1])}
                />
                <Button
                    type="default"
                    icon={<CloseOutlined />}
                    onClick={() => showDienied(props.equipment[1])}
                />
            </div>
        );
    }else{
        return (
            <div>
                <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    disabled={true}
                />
                <Button
                    type="default"
                    icon={<CloseOutlined />}
                    disabled={true}
                />
            </div>
        );
    }
};
