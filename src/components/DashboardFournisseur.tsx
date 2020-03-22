import React from "react";
import { connect } from "react-redux";

import { Button, Col, Row } from "antd";
import { listEquipments } from "../redux/dashboardFournisseur/DashboardFournisseurAction";

interface Iprops {
  equipments: any;
  getEquipments: any;
}

let listEquipment = null;

const DashboardFournisseur = ({ equipments, getEquipments }: Iprops) => {
  if (equipments.length === 0) {
    listEquipment = null;
  } else {
    listEquipment = equipments.equipments;
    // listEquipment = equipments.equipments[0].doc.proto.fields.name.stringValue;
  }
  if (listEquipment != null) {
    return (
      <div>
        <Button onClick={getEquipments} size={"large"}>
          Get Equipments
        </Button>
        {listEquipment.map((equipment: any) => {
          return <p>{equipment.doc.proto.fields.name.stringValue}</p>;
        })}
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
    equipments: state.dashboardFournisseur.equipments
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
