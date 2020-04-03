import React from 'react';
import store from "../../redux/store";
import { connect } from "react-redux";
import { Row, Col, Spin } from "antd";
import { CardReserve } from "./cards/cardReserve";

store.dispatch({ type: "GET_RESERVE" });
store.dispatch({ type: "LIST_EQUIPMENT" });

interface Iprops{
  listReserve:any;
  listEquipments:any;
}

const listReservec = ({ listReserve,listEquipments}:Iprops) => {
    let date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    if(listReserve.listReserve.equipments != undefined){
    return (
        <div>
          <div className="site-card-wrapper">
          <Row gutter={{ xs: 8, sm: 16, md: 32, lg: 64 }}>
          {listEquipments.equipments.equipments != undefined ? listReserve.listReserve.equipments.map((reservation:any) => {

            let string = reservation.dateDebut;
            let dd = string.indexOf("/");
            let mm = string.lastIndexOf("/");
            let day = string.substr(0,dd);
            let mont = string.substr(dd+1,mm-dd-1);
            let year = string.substr(mm+1);
            let dateR = new Date(year+"/"+mont+"/"+day);

            var equip = listEquipments.equipments.equipments.filter(function (eq:any) {
              if(eq.id == reservation.idEquipment){
                return eq;
              }
            });
            if(dateR < date){
              return ( <Col className="gutter-row"  key={reservation.id} xs={{ span: 24, offset:0 }} sm={{ span: 12 }}
              md={{ span: 12 }} lg={{ span: 8}} >
              <CardReserve className="gutter-box" key={equip.id} equipo={equip[0]} reser={reservation}/>
              </Col>);
              }
              }):'LISTE D`EQUIPMENT VIDE'};
            </Row>
          </div>
        </div>
      );}else{
        return(
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}} ><Spin/></div>
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
