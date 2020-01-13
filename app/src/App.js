import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { Button } from 'reactstrap';
import Lagoon from './pages/lagoon';
import axios from 'axios';



function App() {
  return (
    <div className="App">
    <Router>
      <Switch>
        <Route exact path='/' component={Lagoon} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
