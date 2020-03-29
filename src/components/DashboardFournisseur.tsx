import React from "react";
import { connect } from "react-redux";

import store from "../redux/store";

import { CardLoan } from "./cardsDashboardFournisseur/CardLoan";
import { CardTotal } from "./cardsDashboardFournisseur/CardTotal";
import { CardBooked } from "./cardsDashboardFournisseur/CardBooked";
import { CardOverdue } from "./cardsDashboardFournisseur/CardOverdue";

import AjoutMateriel from '../components/AjoutMateriel';
import EditMateriel from '../components/EditMateriel';

import { ListEquipments } from "./displayEquipmentsDashboardFournisseur/ListEquipments";

import { Row, Col, Button } from "antd";

interface Iprops {
  equipments: any;
  listLoan: any;
  listEquipments: any;
}

store.dispatch({ type: "GET_EQUIPMENTS" });

const DashboardFournisseur = ({
  equipments,
  listLoan,
  listEquipments
}: Iprops) => {
  if (equipments.length != 0) {
    console.log(equipments.equipments[0]);
    const displayAllEquipments = () => {
      store.dispatch({ type: "GET_ALL_EQUIPMENTS" });
    };
    const displayLoanEquipments = () => {
      store.dispatch({ type: "GET_LOAN_EQUIPMENTS" });
    };
    return (
      <div>
        <AjoutMateriel/>
        <div className="site-card-wrapper">
          <Row gutter={[16, 16]}>
            <Col span={5} offset={2} onClick={displayAllEquipments} >
              <CardTotal total={equipments.equipments} />
            </Col>
            <Col span={5} onClick={displayLoanEquipments}>
              <CardLoan loan={listLoan} />
            </Col>
            <Col span={5}>
              <CardOverdue overdue={11} />
            </Col>
            <Col span={5}>
              <CardBooked booked={123} />
            </Col>
          </Row>
        </div>
        <ListEquipments equipments={listEquipments}/>
        <EditMateriel/>
      </div>
    );
  } else {
    return <div>Une erreur est survenu !</div>;
  }
};

const mapStateToProps = (state: any) => {
  console.log(state)
  return {
    equipments: state.dashboardFournisseur.equipments,
    listLoan: state.dashboardFournisseur.listLoan,
    listEquipments: state.dashboardFournisseur.listEquipments
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getAllEquipments: () => dispatch({ type: "GET_ALL_EQUIPMENTS" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardFournisseur);
