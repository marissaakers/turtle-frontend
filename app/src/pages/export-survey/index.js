import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';
import { SurveyExports } from '../../components/exports/SurveyExports.js'

const TITLE = 'Export survey'

class ExportSurvey extends React.Component {
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
        <p align="left" className="pl-4"><a href="/export">← back</a></p>

        <div className="container" align="center">
          <SurveyExports />
        </div>

        <InternalFooter />
      </>
    );
  }
}

export default ExportSurvey;
