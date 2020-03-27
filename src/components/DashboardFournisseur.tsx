import React, {ReactDOM, useEffect} from "react";
import { connect } from "react-redux";

import { CardLoan } from "./cardsDashboardFournisseur/CardLoan";
import { CardTotal } from "./cardsDashboardFournisseur/CardTotal";
import { CardBooked } from "./cardsDashboardFournisseur/CardBooked";
import { CardOverdue } from "./cardsDashboardFournisseur/CardOverdue";

import { Row, Col, Button, Card } from "antd";
import { WarningOutlined, CalendarOutlined } from "@ant-design/icons";
import {render} from "react-dom";

interface Iprops {
  equipments: any;
  getEquipments: any;
  listLoan: any;
}

const DashboardFournisseur = ({
  equipments,
  getEquipments,
  listLoan
}: Iprops) => {
  if (equipments.length != 0) {
    equipments.equipments.map( (data: any) => {
      const equipement: any = data.doc.proto.fields;
      const key: any = data.doc.key.path.segments[6];
      console.log(key);
      console.log(equipement.name.stringValue);
    });

    
    return (
      <div>
        <div className="site-card-wrapper">
          <Row gutter={[16, 16]}>
            <Col span={5} offset={2}>
              <CardTotal total={equipments}/>
            </Col>
            <Col span={5}>
              <CardLoan loan={listLoan}/>
            </Col>
            <Col span={5}>
              <CardOverdue overdue={11}/>
            </Col>
            <Col span={5}>
              <CardBooked booked={123}/>
            </Col>
          </Row>
        </div>
      </div>
    );
  } else {
    return (
      <Button onClick={getEquipments} size={"large"}>
        Get Equipments
      </Button>
    );
  }
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    equipments: state.dashboardFournisseur.equipments,
    listLoan: state.dashboardFournisseur.listLoan
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getEquipments: () => dispatch({ type: "GET_EQUIPMENTS" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardFournisseur);
