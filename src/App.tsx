import React from 'react';
import './App.css';
import "antd/dist/antd.css";

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
}

export default App;
