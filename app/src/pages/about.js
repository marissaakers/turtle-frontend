import React, { Component } from 'react';

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}About</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default About;