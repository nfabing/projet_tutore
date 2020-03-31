import React from 'react';
import store from "../../redux/store";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { CardReserve } from "./cards/cardReserve";

store.dispatch({ type: "GET_RESERVE" });

const listReservec = (listReserve:any) => {
    console.log("lista");
    console.log(listReserve.listReserve.listReserve.equipments);
    return (
        <div>
          <div className="site-card-wrapper">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {listReserve === undefined ? listReserve.listReserve.listReserve.equipments.map((data:any) => {
              return ( <Col className="gutter-row" span={50}>
              <CardReserve  key={data.id} equipo={data}/>
              </Col>);
              }) : 'LISTE D`EQUIPMENT VIDE'}
            </Row>
          </div>
        </div>
      );
};

const mapStateToProps = (state:any) => {
    return {
        listReserve: state.listReserve,
    };
};

export default connect(mapStateToProps,null)(listReservec);