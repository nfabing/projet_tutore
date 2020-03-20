import React from 'react';
import './App.css';
import "antd/dist/antd.css";
import Card from "./UI/card";

function App() {
let data: any[];

  return (
    <div className="App">
        <Card img={'https://cdn.manomano.com/tronconneuse-thermique-62cc-38cv-38cv-lame-20-legere-puissante-greencut-P-1045889-2746607_1.jpg'} name={'tronçonneuse'} status={1} id={1} />
    </div>
  );
}

export default App;
