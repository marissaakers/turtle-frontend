// app/src is treated as the root directory. This is specified in package.json.

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { PrivateRoute } from './util/auth-util';
import './App.css';
import { Amplify, Auth } from 'aws-amplify';
import config from "./aws-exports";

// Import pages
import Error from './pages/error';

// Unlogged in pages
import LandingPage from './pages/landing-page';
import About from './pages/about';
import Contact from './pages/contact';
import Login from './pages/login';

// Logged in pages
import Home from './pages/home';
import ReportsListHub from './pages/reports-list-hub';
import SingleReport from './pages/single-report';

// New report pages
import NewReport from './pages/new-report';
import Lagoon from './pages/lagoon';
import EditLagoon from './pages/edit-lagoon';
import Beach from './pages/beach';
import BeachInventory from './pages/beach-inventory';
import Trident from './pages/trident';
import Offshore from './pages/offshore';
import TridentMetadata from './pages/trident-metadata';
import LagoonMetadata from './pages/lagoon-metadata';
import SurveyMidreach from './pages/survey-midreach';
import SurveyPAFB from './pages/survey-pafb';
import SurveySouthReach from './pages/survey-south-reach';

import SurveyDepredations from './pages/survey-depredations';
import SurveyScarp from './pages/survey-scarp';
import SurveyFalseCrawl from './pages/survey-false-crawls';

// Export pages
import ExportPick from './pages/export-pick';
import ExportCapture from './pages/export-capture';
import ExportSurvey from './pages/export-survey';

Amplify.configure(config);

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
          isAuthenticated: false
      }
  }

  userHasAuthenticated = (value) => {
      this.setState({ isAuthenticated: value });
  }

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.userHasAuthenticated(true);
      console.log(await Auth.currentSession);
    }
    catch(e) {
      if (e !== 'No current user') {
        alert(e);
        this.props.history.push("/login");
      }
    }
}

  render() {
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
            <PrivateRoute exact path='/home' component={Home} />
            <PrivateRoute exact path='/reports-list' component={ReportsListHub} />
            <PrivateRoute exact path='/reports/example-turtle' component={SingleReport} />
            <PrivateRoute exact path='/reports/:id' component={SingleReport} />

            <PrivateRoute exact path='/new-report' component={NewReport} />
            <PrivateRoute exact path='/new-report/lagoon' component={Lagoon} />
            <PrivateRoute exact path='/edit/lagoon' component={EditLagoon} />
            <PrivateRoute exact path='/new-report/beach' component={Beach} />
            <PrivateRoute exact path='/new-report/trident' component={Trident} />
            <PrivateRoute exact path='/new-report/offshore' component={Offshore} />
            <PrivateRoute exact path='/new-report/lagoon-metadata' component={LagoonMetadata} />
            <PrivateRoute exact path='/new-report/trident-metadata' component={TridentMetadata} />
            <PrivateRoute exact path='/new-report/survey-midreach' component={SurveyMidreach} />
            <PrivateRoute exact path='/new-report/survey-pafb' component={SurveyPAFB} />
            <PrivateRoute exact path='/new-report/survey-south-reach' component={SurveySouthReach} />

            <PrivateRoute exact path='/new-report/survey-depredations' component={SurveyDepredations} />
            <PrivateRoute exact path='/new-report/survey-scarp' component={SurveyScarp} />
            <PrivateRoute exact path='/new-report/survey-false-crawl' component={SurveyFalseCrawl} />

            <PrivateRoute exact path='/new-report/beach-inventory' component={BeachInventory} />

            <PrivateRoute exact path='/export' component={ExportPick} />
            <PrivateRoute exact path='/export/capture' component={ExportCapture} />
            <PrivateRoute exact path='/export/survey' component={ExportSurvey} />

            <Route component={Error} />  {/* When no other route matches */}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
