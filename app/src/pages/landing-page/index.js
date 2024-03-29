import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ExternalNavbar from '../../components/external-navbar';
import ExternalFooter from '../../components/external-footer';
import '../shared/external.css';

const TITLE = 'MTRG Database'

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  render() {
    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <ExternalNavbar />

        <header className="page-header header container-fluid">
          <div className="overlay"></div>
          <div className="description">
            <h1>Yeah, it's turtle time.</h1>
            <p className="pb-3">Welcome to the UCF Marine Turtle Research Group! This website hosts our database of sea turtle data, focusing on sea turtle biology, ecology, behavior, and conservation across all sea turtle life stages—from eggs to adults. </p>
            <a href="about">
              <button className="btn btn-outline-secondary btn-lg">Learn More</button>
            </a>
          </div>
        </header>

        <ExternalFooter />
      </>
    );
  }
}

export default LandingPage;
