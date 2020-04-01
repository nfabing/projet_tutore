  import React, {ReactDOM, useEffect} from "react";
import { connect } from "react-redux";

import store from "../redux/store";

import { CardLoan } from "./cardsDashboardFournisseur/CardLoan";
import { CardTotal } from "./cardsDashboardFournisseur/CardTotal";
import { CardWainting } from "./cardsDashboardFournisseur/CardWainting";
import { CardOverdue } from "./cardsDashboardFournisseur/CardOverdue";

import AjoutMateriel from "../components/AjoutMateriel";
import EditMateriel from "../components/EditMateriel";

import { ListEquipments } from "./displayEquipmentsDashboardFournisseur/ListEquipments";

import { Row, Col, Button, Card } from "antd";
import { WarningOutlined, CalendarOutlined } from "@ant-design/icons";
import {render} from "react-dom";
  import {CardBooked} from "./cardsDashboardFournisseur/CardBooked";

interface Iprops {
  equipments: any;
  getEquipments: any;
  listLoan: any;
  listWaiting: any;
  listBooked: any;
  listEquipments: any;
  user: any;
}



const DashboardFournisseur = ({
  equipments,
  listLoan,
  listWaiting,
  listEquipments,
  listBooked,
  user
}: Iprops) => {
  
  if (user.userType === "supplier") {
    
    if (equipments.length != 0) {
      const displayAllEquipments = () => {
        store.dispatch({ type: "GET_ALL_EQUIPMENTS", value: user.useruid });
      };
      const displayLoanEquipments = () => {
        store.dispatch({ type: "GET_LOAN_EQUIPMENTS", value: user.useruid });
      };
      const displayWaitingEquipment = () => {
        store.dispatch({ type: "GET_WAITING_EQUIPMENTS", value: user.useruid });
      };
      const displayBookedEquipment = () => {
        store.dispatch({ type: "GET_BOOKED_EQUIPMENTS", value: user.useruid });
      };
      return (
        <div>
          <AjoutMateriel />
          <div className="site-card-wrapper">
            <Row gutter={[16, 16]}>
              <Col span={5} offset={2} onClick={displayAllEquipments}>
                <CardTotal total={equipments.equipmentsForFournisseur} />
              </Col>
              <Col span={5} onClick={displayLoanEquipments}>
                <CardLoan loan={listLoan} />
              </Col>
              <Col span={5} onClick={displayBookedEquipment}>
                <CardBooked booked={listBooked}/>
              </Col>
              <Col span={5} onClick={displayWaitingEquipment}>
                <CardWainting waiting={listWaiting} />
              </Col>
            </Row>
          </div>
          <ListEquipments equipments={listEquipments} />
          <EditMateriel />
        </div>
      );
    } else {
      store.dispatch({ type: "GET_EQUIPMENTS", value: user.useruid});
      return <div>Une erreur est survenu !</div>;
    }
  } else {
    return <p>acces non autorisé</p>;
  }
};

const mapStateToProps = (state: any) => {
  console.log(state);
  return {
    equipments: state.dashboardFournisseur.equipmentsForFournisseur,
    listLoan: state.dashboardFournisseur.listLoan,
    listWaiting: state.dashboardFournisseur.listWaiting,
    listEquipments: state.dashboardFournisseur.listEquipments,
    listBooked: state.dashboardFournisseur.listBooked,
    user: state.user.profil
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
