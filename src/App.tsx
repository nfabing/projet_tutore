import React from 'react';
import './App.css';
import "antd/dist/antd.css";

import {Input} from 'antd';
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


const {Header, Content, Footer} = Layout;

function App() {
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
                            <Menu.Item key={'2'}><Link to={'/Login'}>Connexion</Link></Menu.Item>
                            <Menu.Item key={'3'}><Link to={'/DashboardFournisseur'}>Dashboard
                                Fournisseur</Link></Menu.Item>
                            <Menu.Item key={'4'}><Link to={'/EditMateriel'}>EditMateriel</Link></Menu.Item>
                            <Menu.Item key={'5'}><Link to={'/AjoutMateriel'}>AjoutMateriel</Link></Menu.Item>
                            <Menu.Item key={'6'}><Link to={'/ListReserve'}>ListReserve</Link></Menu.Item>
                            <Menu.Item key={'7'}><Link to={'/Reservation'}>Mes réservations</Link></Menu.Item>
                        </Menu>
                    </Header>
                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}

                    <Content className={'site-layout'}
                             style={{padding: '0 50px', marginTop: 64}}>

                        <div className={'site-layout-background'}
                             style={{padding: 24, minHeight: '90vh'}}>
                            <Switch>
                               <Route exact={true} path="/" component={Search}/>
                                <Route path="/Details/:materialId" component={Details}/>
                                <Route path="/Login" component={LoginContainer}/>
                                <Route path="/DashboardFournisseur" component={DashboardFournisseur}/>
                                <Route path="/EditMateriel" component={EditMateriel}/>
                                <Route path="/AjoutMateriel" component={AjoutMateriel}/>
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

export default App;
