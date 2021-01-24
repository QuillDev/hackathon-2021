import React from 'react';
import { Switch, Route } from 'react-router-dom';

import CreateRoom from "./pages/CreateRoom";
import Home from './pages/Home';
import Chat from "./pages/Chat";
import Join from "./pages/Join";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}/>
        <div>
            <App/>
            <Route exact path='/chat' component={Chat}/>
            <Route exact path='/join' component={Join}/>
            <Route exact path='/create-room' component={CreateRoom}/>
        </div>
        </Switch>
    );
}

export default Main;