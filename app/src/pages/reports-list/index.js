import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";

const TITLE = 'MTRG - Reports list'

class ReportsList extends React.Component {
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

        <h3>MTRG - Reports List</h3>
        <p>Here we will have a table of the reports in the database.</p>
        <ul>
          <li><a href="/reports/example-turtle">Example turtle</a></li>
        </ul>
      </>
    );
  }
}

export default ReportsList;
