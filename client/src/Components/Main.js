import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import Chat from "./pages/Chat";

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}/>
            <Route exact path='/chat' component={Chat}></Route>
        </Switch>
    );
}

export default Main;