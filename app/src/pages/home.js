import React, { Component } from 'react';

class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}Home</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default Home;
