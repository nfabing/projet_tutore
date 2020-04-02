import React, {useState} from "react";
import {connect} from "react-redux";

import store from "../redux/store";

import {CardLoan} from "./cardsDashboardFournisseur/CardLoan";
import {CardTotal} from "./cardsDashboardFournisseur/CardTotal";
import {CardWainting} from "./cardsDashboardFournisseur/CardWainting";
import {CardOverdue} from "./cardsDashboardFournisseur/CardOverdue";
import {CardBooked} from "./cardsDashboardFournisseur/CardBooked";

import AjoutMateriel from "../components/AjoutMateriel";
import EditMateriel from "../components/EditMateriel";
import ReturnMateriel from "../components/displayEquipmentsDashboardFournisseur/returnEquipment/ReturnEquipment";
import {ListEquipments} from "./displayEquipmentsDashboardFournisseur/ListEquipments";

import {Row, Col} from "antd";
import {WarningOutlined, CalendarOutlined} from "@ant-design/icons";

interface Iprops {
    equipments: any;
    getEquipments: any;
    listLoan: any;
    listWaiting: any;
    listBooked: any;
    listEquipments: any;
    listOverdue: any;
    user: any;
}


const DashboardFournisseur = ({equipments, listLoan, listWaiting, listEquipments, listBooked, listOverdue, user}: Iprops) => {
    const [nameList, setNameList] = useState("");

    if (user.userType === "supplier") {

        if (equipments.length != 0) {
            const displayAllEquipments = () => {
                store.dispatch({type: "GET_ALL_EQUIPMENTS", value: user.useruid});
                setNameList("Tout les équipmements");
            };
            const displayLoanEquipments = () => {
                store.dispatch({type: "GET_LOAN_EQUIPMENTS", value: user.useruid});
                setNameList("Équipement(s) prêtés");
            };
            const displayWaitingEquipment = () => {
                store.dispatch({type: "GET_WAITING_EQUIPMENTS", value: user.useruid});
                setNameList("Équipement(s) en attente de confirmation (réservation)");
            };
            const displayBookedEquipment = () => {
                store.dispatch({type: "GET_BOOKED_EQUIPMENTS", value: user.useruid});
                setNameList("Équipement(s) réservés");
            };
            const displayOverdueEquipment = () => {
                store.dispatch({type: "GET_OVERDUE_EQUIPMENTS", value: user.useruid});
                setNameList("Équipement(s) en retard");
            };
            return (
                <div className="divDashboardFournisseur">

                    <div className="site-card-wrapper divCardFournisseur">
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={12} md={8} lg={4} onClick={displayAllEquipments}>
                                <CardTotal total={equipments.equipmentsForFournisseur}/>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={4} onClick={displayLoanEquipments}>
                                <CardLoan loan={listLoan}/>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={4} onClick={displayBookedEquipment}>
                                <CardBooked booked={listBooked}/>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={4} onClick={displayWaitingEquipment}>
                                <CardWainting waiting={listWaiting}/>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={4} onClick={displayOverdueEquipment}>
                                <CardOverdue overdue={listOverdue}/>
                            </Col>
                            <Col xs={24} sm={12} md={8} lg={4}>
                                <AjoutMateriel/>
                                <ReturnMateriel/>
                            </Col>
                        </Row>
                    </div>
                    <h3 className="titreListDashboard">{nameList}</h3>
                    <ListEquipments equipments={listEquipments}/>
                    <EditMateriel/>
                </div>
            );
        } else {
            store.dispatch({type: "GET_EQUIPMENTS", value: user.useruid});
            return <div>Loading ...</div>;
        }
    } else {
        return <p>acces non autorisé</p>;
    }
};

const mapStateToProps = (state: any) => {
    console.log(state);
    return {
        equipments: state.dashboardFournisseur.equipmentsForFournisseur,
        listLoan: state.dashboardFournisseur.listLoanFournisseur,
        listWaiting: state.dashboardFournisseur.listWaiting,
        listEquipments: state.dashboardFournisseur.listEquipments,
        listBooked: state.dashboardFournisseur.listBooked,
        listOverdue: state.dashboardFournisseur.listOverdue,
        user: state.user.profil
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getAllEquipments: () => dispatch({type: "GET_ALL_EQUIPMENTS"})
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardFournisseur);
