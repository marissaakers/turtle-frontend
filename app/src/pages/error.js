import React, { Component } from 'react';

class Error extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}Error</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default Error;
