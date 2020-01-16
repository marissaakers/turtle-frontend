import React, { Component } from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
      <div>
        <h1>{this.props.name}Login</h1>
        <p>
          {this.props.color}
        </p>
      </div>
    );
  }
}

export default Login;
