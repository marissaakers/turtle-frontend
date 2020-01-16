import React, { Component } from 'react';

class SingleReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}Single Report</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default SingleReport;
