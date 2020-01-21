import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

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

        <h3>Choose new report format:</h3>
        <ul>
          <li><a href='new-report/lagoon'>Lagoon</a></li>
        </ul>
      </>
    );
  }
}

export default NewReport;
