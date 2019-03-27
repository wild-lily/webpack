import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import Home from './Home/index';
import Detail from './Detail/index';
import NotFound from './NotFound';
import { Link } from 'react-router-dom';

function BasicRoute() {
    return (
        <Router>
            <Link to="/">Home</Link>
            <Link to="/detail">detail</Link>
            <Link to="/notFound">notFound</Link>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/detail" component={Detail} />
                <Route path="/notFound" component={NotFound} />
                <Redirect to='/notFound'></Redirect>
            </Switch>
        </Router>
    )
}

export default BasicRoute;