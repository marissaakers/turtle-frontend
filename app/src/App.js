// app/src is treated as the root directory. This is specified in package.json.

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import logo from 'logo.svg';
import 'App.css';
import { Button } from 'reactstrap';
import axios from 'axios';

// Import pages
// Unlogged in pages
import LandingPage from 'pages/landing-page';
import About from 'pages/about';
import Contact from 'pages/contact';
import Login from 'pages/login';
// Logged in pages
import Home from 'pages/home';
import ReportsList from 'pages/reports-list';
import SingleReport from 'pages/single-report';
import Error from 'pages/error';
// New report pages
import NewReport from 'pages/new-report';
import Lagoon from 'pages/lagoon';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* Non-logged in pages */}
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/about' component={About} />
          <Route exact path='/contact' component={Contact} />
          <Route exact path='/login' component={Login} />

          {/* Logged in pages */}
          <Route exact path='/home' component={Home} />
          <Route exact path='/reports' component={ReportsList} />
          <Route exact path='/reports/id' component={SingleReport} />
          <Route exact path='/new-report' component={NewReport} />
          <Route exact path='/new-report/lagoon' component={Lagoon} />

          <Route component={Error} />  {/* When no other route matches */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;