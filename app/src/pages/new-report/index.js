import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';

const TITLE = 'MTRG - Choose new report'

class NewReport extends React.Component {
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

        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/home">← back</a></p>
        <h3>Choose new report format:</h3>
        <ul>
          <li><a href='new-report/lagoon'>Lagoon</a></li>
          <li><a href='new-report/lagoonmetadata'>Lagoon Metadata</a></li>
        </ul>
        <InternalFooter />
      </>
    );
  }
}

export default NewReport;
