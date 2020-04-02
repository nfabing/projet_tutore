import React from "react";

import {Button} from "antd";
import { CheckOutlined,CloseOutlined } from "@ant-design/icons";
import store from "../../../redux/store";



export const BookedToLoan = (props: any) => {
    // console.log(props);
    let dateNow = new Date();
    let dateDebut = props.equipment[1].dateDebut;
    dateDebut = dateDebut.split("/");
    dateDebut = dateDebut[1]+"/"+dateDebut[0]+"/"+dateDebut[2];
    dateDebut = new Date(dateDebut);

    let dif = parseInt(Number((dateDebut.getTime() / 86400000) - (dateNow.getTime() / 86400000)+1).toFixed(0));
    console.log(props);

    const bookedToLoan = (id: any) => {
        store.dispatch({type: "SET_BOOKED_TO_LOAN", values: id})
    };

    const bookedToCancel = (id: any) => {
        store.dispatch({type: "SET_BOOKED_TO_CANCEL", values: id})
    };


    if(dif <= 0){
        return (
            <div>
                <Button
                    type="primary"
                    icon={<CheckOutlined />}
                    onClick={() => bookedToLoan(props.equipment[1].id)}
                />
                <Button
                    type="default"
                    icon={<CloseOutlined />}
                    onClick={() => bookedToCancel(props.equipment[1].id)}
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
