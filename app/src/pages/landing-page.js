import React, { Component } from 'react';

class LandingPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}Landing Page</h1>
        <p>
          {this.props.color}
        </p>
        <ul>
          <li><a href="/">Landing Page</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/home">Home</a></li>
          <li><a href="/reports">Reports</a></li>
          <li><a href="/reports/1">Report id=1</a></li>
          <li><a href="/new-report">New Report</a></li>
          <li><a href="/new-report/lagoon">Lagoon Form</a></li>
          <li><a href="error">Error</a></li>
        </ul>

      </div>
    );
  }
}

export default LandingPage;
