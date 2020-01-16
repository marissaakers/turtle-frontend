import React, { Component } from 'react';

class NewReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}New Report</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default NewReport;
