import React from 'react';
import './App.css';
import "antd/dist/antd.css";

import {Input} from 'antd';
import Details from "./UI/DetailsPage";

// components
import Login from './components/Login';
import DashboardFournisseur from './components/DashboardFournisseur';
import AjoutMateriel from './components/AjoutMateriel';
import EditMateriel from './components/EditMateriel';

function App() {
  return (
    <div className="App">
      <Login/>
      <DashboardFournisseur/>
      <EditMateriel/>
      {/* <AjoutMateriel/> */}
    </div>
  );

    return (
        <div className="App">
            <Router>
                <div>

                    {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
                    <Switch>
                        <Route exact={true} path="/" component={Search}/>
                        <Route path="/Details/:materialId" component={Details} />
                    </Switch>
                </div>
            </Router>

        </div>
    );
}

export default App;
