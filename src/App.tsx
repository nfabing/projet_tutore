import React from 'react';
import './App.css';
import "antd/dist/antd.css";

// components
import Login from './components/Login/Login'

function App() {
  return (
    <div className="App">
      <Login>
          <p>ENFANT DU LOGIN</p>
      </Login>
    </div>
  );
}

export default App;
