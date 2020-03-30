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
import ReportsListHub from 'pages/reports-list-hub';

import SingleReport from 'pages/single-report';
import DataAnalytics from 'pages/data-analytics'
import Error from 'pages/error';
// New report pages
import NewReport from 'pages/new-report';
import Lagoon from 'pages/lagoon';
import EditLagoon from 'pages/edit-lagoon';
import Beach from 'pages/beach';
import BeachInventory from 'pages/beach-inventory';
import Trident from 'pages/trident';
import Offshore from 'pages/offshore';
import TridentMetadata from 'pages/trident-metadata';
import LagoonMetadata from 'pages/lagoon-metadata';
import SurveyMidreach from 'pages/survey-midreach';
import SurveyDepredations from 'pages/survey-depredations';
import SurveyScarp from 'pages/survey-scarp';
import SurveyFalseCrawl from 'pages/survey-false-crawls';


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
          <Route exact path='/reports-list' component={ReportsListHub} />
          <Route exact path='/reports/example-turtle' component={SingleReport} />
          <Route exact path='/reports/:id' component={SingleReport} />
          <Route exact path='/data-analytics' component={DataAnalytics} />

          <Route exact path='/new-report' component={NewReport} />
          <Route exact path='/new-report/lagoon' component={Lagoon} />
          <Route exact path='/edit/lagoon' component={EditLagoon} />
          <Route exact path='/new-report/beach' component={Beach} />
          <Route exact path='/new-report/trident' component={Trident} />
          <Route exact path='/new-report/offshore' component={Offshore} />
          <Route exact path='/new-report/lagoon-metadata' component={LagoonMetadata} />
          <Route exact path='/new-report/trident-metadata' component={TridentMetadata} />
          <Route exact path='/new-report/survey-midreach' component={SurveyMidreach} />
          <Route exact path='/new-report/survey-depredations' component={SurveyDepredations} />
          <Route exact path='/new-report/survey-scarp' component={SurveyScarp} />
          <Route exact path='/new-report/survey-false-crawl' component={SurveyFalseCrawl} />

          <Route exact path='/new-report/beach-inventory' component={BeachInventory} />

          <Route component={Error} />  {/* When no other route matches */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
