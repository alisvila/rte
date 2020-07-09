import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PannelHome from './components/pannel';
import Login from './components/login';
import NewAd from './components/pannel/newAd'
import EditAd from './components/pannel/editAd'
import PrivateRoute from './privateRoute'
import NoMatch from './components/noMatch'
import Reports from './components/pannel/reports'
import Profile from './components/pannel/profile'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <PrivateRoute path="/panel" exact>
          <PannelHome />
        </PrivateRoute>
        <PrivateRoute path="/panel/newad">
          <NewAd />
        </PrivateRoute>
        <PrivateRoute path="/panel/reports">
          <Reports />
        </PrivateRoute>
        <PrivateRoute path="/panel/profile">
          <Profile />
        </PrivateRoute>
        <PrivateRoute path="/panel/editad/:adId">
          <EditAd />
        </PrivateRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
