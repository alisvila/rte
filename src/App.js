import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PannelHome from './components/pannel';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Login} exact></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/pannel" component={PannelHome} exact />
        {/* <Route path="/pannel/upload" component={uploadPage} /> */}
        {/* <Route path="/pannel/demo" component={Demo} />  */}
        <Route component={Error}></Route>
      </Switch>
    </Router>
  );
}

export default App;
