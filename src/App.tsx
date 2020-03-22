import React from 'react';
import './App.css';
import "antd/dist/antd.css";

// components
import Login from './components/Login'
import DashboardFournisseur from './components/DashboardFournisseur'

function App() {
  return (
    <div className="App">
      <Login/>
      <DashboardFournisseur/>
    </div>
  );
}

export default App;
