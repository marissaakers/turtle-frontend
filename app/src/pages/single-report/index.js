import React, { Component } from 'react';
import { Helmet } from 'react-helmet';

const TITLE = 'MTRG - View report'

class SingleReport extends React.Component {
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

        <h3>MTRG - View report [id #]</h3>
        <p>Here we display the values of the report.</p>
      </>
    );
  }
}

export default SingleReport;
