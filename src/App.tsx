import React from 'react';
import './App.css';
import "antd/dist/antd.css";

import {Input, Space} from 'antd';
import Details from "./components/Search/DetailsPage";

// components
import listReserve from "./components/listReserve/listReserve";
import LoginContainer from "./components/LoginScreen/LoginContainer";
import DashboardFournisseur from './components/DashboardFournisseur';
import AjoutMateriel from './components/AjoutMateriel';
import EditMateriel from './components/EditMateriel';
import {Route, BrowserRouter as Router, Switch, Link} from "react-router-dom";
import Search from "./components/Search/SearchPage";
import {Layout, Menu} from 'antd';
import Reservation from "./components/Reservation/Reservations";
import ReservationUser from "./components/Reservation/ReservationUser";
import {connect} from "react-redux";
import store from "./redux/store";


const {Header, Content, Footer} = Layout;
interface IProps {
    uid: any;
}
function App( {uid} : IProps) {

const deconnection = () => {
            return (
                <Menu.Item key={'2'}  style={{alignItems: "right", textAlign: "right", float: "right"}}><p onClick={() => store.dispatch({type: 'LOGOUT_REQUEST'})}>Déconnection</p></Menu.Item>
            )
    }

    return (
        <div className="App">
            <Router>
                <Layout>
                    <Header style={{position: 'fixed', zIndex: 1, width: '100%',alignItems: 'left',textAlign: 'left'}} >
                        <Menu
                            theme={'dark'}
                            mode={'horizontal'}
                        >

                            <Menu.Item key={'1'}><Link to={'/'}>Recherche</Link></Menu.Item>
                            <Menu.Item key={'3'}><Link to={'/DashboardFournisseur'}>Dashboard
                                Fournisseur</Link></Menu.Item>
                            <Menu.Item key={'6'}><Link to={'/ListReserve'}>ListReserve</Link></Menu.Item>
                            {uid !== undefined ?
                                <Menu.Item key={'10'}  style={{alignItems: "right", textAlign: "right", float: "right"}}><a href={'#'} onClick={() => store.dispatch({type: 'LOGOUT_REQUEST'})}>Déconnexion</a></Menu.Item>
                                : null}
                            <Menu.Item key={'2'}  style={{alignItems: "right", textAlign: "right", float: "right"}}><Link to={'/Login'}>{ uid == undefined ? 'Connexion' : 'Mon compte'}</Link></Menu.Item>
                            <Menu.Item key={'7'}  style={{alignItems: "right", textAlign: "right", float: "right"}}><Link to={'/Reservation'}>Mes réservations</Link></Menu.Item>

                        </Menu>
                    </Header>

                    <Content className={'site-layout'}
                             style={{padding: '0 50px', marginTop: 64}}>

                        <div className={'site-layout-background'}
                             style={{padding: 24, minHeight: '90vh'}}>
                            <Switch>
                               <Route exact={true} path="/" component={Search}/>
                                <Route path="/Details/:materialId" component={Details}/>
                                <Route path="/Login" component={LoginContainer}/>
                                <Route path="/DashboardFournisseur" component={DashboardFournisseur}/>
                                <Route path="/ListReserve" component={listReserve}/>
                                <Route path="/Reservation" component={Reservation}/>
                            </Switch>
                        </div>
                    </Content>
                </Layout>
            </Router>
        </div>
    );
}

const mapStateToProps = (state: any) => {
    return {
        uid: state.login.user.uid
    };
};

export default connect(mapStateToProps)(App);
