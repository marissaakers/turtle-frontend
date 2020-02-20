import React, { Component, useState } from 'react';
import { Helmet } from 'react-helmet';
import ExternalNavbar from '../../components/external-navbar';
import ExternalFooter from '../../components/external-footer';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../shared/external.css';
import {withRouter} from 'react-router-dom'

const TITLE = 'Login'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    }
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  setEmail = (value) => {
    this.setState({ email: value });
  }
  setPassword = (value) => {
    this.setState({ password: value });
  }

  validateForm = () => {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // Handle submit here.
    this.props.history.push('/home');
  }

  render() {
    return(
    <>
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>

      <ExternalNavbar />


      <div className="Login-div">
        <div className="row justify-content-center pt-5">
            <div className="Login border">
              <form onSubmit={this.handleSubmit}>
                <FormGroup className="text-left"controlId="email">
                  <FormLabel>Email</FormLabel>
                  <FormControl
                    autoFocus
                    type="email"
                    value={this.state.email}
                    onChange={e => this.setEmail(e.target.value)}
                  />
                </FormGroup>
                <FormGroup className="text-left" controlId="password">
                  <FormLabel>Password</FormLabel>
                  <FormControl
                    value={this.state.password}
                    onChange={e => this.setPassword(e.target.value)}
                    type="password"
                  />
                </FormGroup>
                <div className="row">
                  <div className="col-sm-5 text-left">
                    <Button id="login-page-button" className="pl-4 pr-4" disabled={!this.validateForm()} type="submit">
                      Login
                    </Button>
                  </div>
                  <div className="col-sm-7 pt-2">
                    <a href="">
                      <p>Forgot your password?</p>
                    </a>
                  </div>
                </div>
              </form>
            </div>
        </div>

        <p><a href="home">Link to user homepage (as if logged in).</a></p>
      </div>

      <ExternalFooter />
    </>
    );
  }
}

export default Login;
