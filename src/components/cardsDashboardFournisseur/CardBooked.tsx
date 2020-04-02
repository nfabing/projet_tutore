import React from "react";

import {Card} from "antd";
import {CalendarOutlined} from "@ant-design/icons";

let nbrBooked = null;

export const CardBooked = (props: any) => {


    if (props.booked != undefined) {
        if (props.booked.listBooked != undefined) {
            if (props.booked.listBooked.length > 0) {
                nbrBooked = props.booked.listBooked.length;
            } else {
                nbrBooked = 0;
            }
            return (
                <Card title="Réservé" bordered={true} hoverable={true} headStyle={{backgroundColor: '#fafafa'}}>
                    {nbrBooked} <CalendarOutlined />
                </Card>
            );
        } else {
            return <div>Loading ...</div>;
        }


    } else {
        return <div>Loading ...</div>;
    }
};
