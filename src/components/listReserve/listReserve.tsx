import React from 'react';
import store from "../../redux/store";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import { CardReserve } from "./cards/cardReserve";



const listReservec = (listReserve:any) => {      
    //console.log("lista");
    //console.log(listReserve.listReserve.listReserve.equipments);
    if(listReserve.listReserve.listReserve.equipments == undefined){
      console.log(listReserve);
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }else{
    return (
        <div>
          <div className="site-card-wrapper">
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {listReserve.listReserve.listReserve.equipments.map((data:any) => {
              return ( <Col className="gutter-row" key={data.id}span={50}>
              <CardReserve  equipo={data}/>
              </Col>);
              })}
            </Row>
          </div>
        </div>
      );}
            
          
};

const mapStateToProps = (state:any) => {
    return {
        listReserve: state.listReserve,
    };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    getReserve: () => dispatch({ type: "GET_RESERVE" })
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(listReservec);