import React, { Component } from 'react';

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}Contact</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default Contact;
