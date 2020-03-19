import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';

const ReportsListNav = ({ content, selectedTab }) => {

  // index = 1;
  function getTabs() {
    if (selectedTab === "lagoon") {
      return (
        <>
          <li className="active"><a href="/reports-list/lagoon">Lagoon</a></li>
          <li><a href="/reports-list/trident">Trident</a></li>
          <li><a href="/reports-list/beach">Beach</a></li>
          <li><a href="/reports-list/offshore">Offshore</a></li>
        </>
      )
    }
    else if (selectedTab === "trident") {
      return (
        <>
          <li><a href="/reports-list/lagoon">Lagoon</a></li>
          <li className="active"><a href="/reports-list/trident">Trident</a></li>
          <li><a href="/reports-list/beach">Beach</a></li>
          <li><a href="/reports-list/offshore">Offshore</a></li>
        </>
      )
    }
    else if (selectedTab === "beach") {
      return (
        <>
          <li><a href="/reports-list/lagoon">Lagoon</a></li>
          <li><a href="/reports-list/trident">Trident</a></li>
          <li className="active"><a href="/reports-list/beach">Beach</a></li>
          <li><a href="/reports-list/offshore">Offshore</a></li>
        </>
      )
    }
    else if (selectedTab === "offshore") {
      return (
        <>
          <li><a href="/reports-list/lagoon">Lagoon</a></li>
          <li><a href="/reports-list/trident">Trident</a></li>
          <li><a href="/reports-list/beach">Beach</a></li>
          <li className="active"><a href="/reports-list/offshore">Offshore</a></li>
        </>
      )
    }
    else {
      console.error("Please pass a proper tab name to reports-list-nav.");
    }
  }

  return (
    <>
      <Helmet>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      </Helmet>

      <div className="container">
        <div className="panel with-nav-tabs panel-default">
          <div className="panel-heading">
            <ul className="nav nav-tabs">
              { getTabs() }
            </ul>
          </div>
          <div className="tab-pane fade in active">{ content }</div>
        </div>
      </div>
    </>
  );
}

export default ReportsListNav;
