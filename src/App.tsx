import React from 'react';
import './App.css';


// components
import Login from "./components/login";
import CakeContainer from "./components/CakeContainer";
import HooksCakeContainer from "./components/HooksCakeContainer";
import IceCreamContainer from "./components/IceCreamContainer";

function App() {
    return (
        <div className="App">
            {/* <Login/>*/}

                <CakeContainer/>
                <HooksCakeContainer/>

                <IceCreamContainer/>


        </div>
    );
}

export default App;
