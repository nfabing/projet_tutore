import React from 'react';
import './App.css';
import "antd/dist/antd.css";

// components
import Login from './components/Login/Login'
import DashboardFournisseur from './components/DashboardFournisseur';

function App() {
  return (
    <div className="App">
      <Login>
        <DashboardFournisseur/>
      </Login>
    </div>
  );
}

export default App;
