import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

const TITLE = 'MTRG - User homepage'

class Home extends React.Component {
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

        <h3>MTRG - User homepage</h3>
        <ul>
          <li><a href='new-report'>New Report</a></li>
          <li><a href='reports'>View Reports</a></li>
        </ul>
      </>
    );
  }
}

export default Home;
