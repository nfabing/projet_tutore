import React, {useEffect, useState} from 'react';
import './App.css';
import "antd/dist/antd.css";
import Card from "./UI/card";
import Loader from "./UI/infiniteLoader";
import {AutoSizer, InfiniteLoader} from 'react-virtualized';
import {FixedSizeList as List} from "react-window";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Search from "./UI/SearchPage";

import {Input} from 'antd';
import Details from "./UI/DetailsPage";


function App() {

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


/*
            <AutoSizer>
                {({height, width}) => (
                    <List
                        itemSize={160}
                        height={500}
                        itemCount={userTestStatus.length}
                        width={1000}
                    >
                        {Row}
                    </List>
                )}
            </AutoSizer>
 */
export default App;
