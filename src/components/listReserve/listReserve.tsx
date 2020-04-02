import React from 'react';
import store from "../../redux/store";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { CardReserve } from "./cards/cardReserve";

store.dispatch({ type: "GET_RESERVE" });
store.dispatch({ type: "LIST_EQUIPMENT" });

interface Iprops{
  listReserve:any;
  listEquipments:any;
}

const listReservec = ({ listReserve,listEquipments}:Iprops) => {
    console.log("lista");
    console.log(listReserve.listReserve.equipments);
    console.log("all")
    console.log(listEquipments.equipments.equipments);
    if(listReserve.listReserve.equipments != undefined){
    return (
        <div>
          <div className="site-card-wrapper">
          <Row gutter={{ xs: 8, sm: 16, md: 32, lg: 64 }}>
          {listEquipments.equipments.equipments != undefined ? listReserve.listReserve.equipments.map((reservation:any) => {
            var equip = listEquipments.equipments.equipments.filter(function (eq:any) {
              if(eq.id == reservation.idEquipment){
                return eq;
              }
            });   
              return ( <Col className="gutter-row"  key={reservation.id} xs={{ span: 14, offset:1 }} sm={{ span: 12 }} 
              md={{ span: 8 }} lg={{ span: 6}} >
              <CardReserve className="gutter-box" key={equip.id} equipo={equip[0]} reser={reservation}/>
              </Col>);
              }):'LISTE D`EQUIPMENT VIDE'}
            </Row>
          </div>
        </div>
      );}else{
        return(
          <div>
            nel
          </div>
        );
      }
};

const mapStateToProps = (state:any) => {
    return {
        listReserve: state.listReserve,
        listEquipments: state.dashboardFournisseur,
    };
};


export default connect(mapStateToProps,null)(listReservec);
