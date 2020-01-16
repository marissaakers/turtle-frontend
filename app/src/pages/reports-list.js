import React, { Component } from 'react';

class ReportsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}Reports List</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default ReportsList;
