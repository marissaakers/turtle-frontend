import React, { Component, useState } from 'react';
import { Helmet } from 'react-helmet';
import ExternalNavbar from '../../components/external-navbar';
import ExternalFooter from '../../components/external-footer';
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import '../shared/external.css';
import {withRouter} from 'react-router-dom';
import { Auth } from 'aws-amplify';

const TITLE = 'Login'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      newPassword: "",
      passwordVerify: "",
      currentState: "showLogin",
      userObject: "",
      verificationCode: ""
    }
  }

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  setUsername = (value) => {
    this.setState({ username: value });
  }
  setPassword = (value) => {
    this.setState({ password: value });
  }

  setNewPassword = (value) => {
    this.setState({ newPassword: value });
  }

  setpasswordVerify = (value) => {
    this.setState({ passwordVerify: value });
  }

  setCode = (value) => {
    this.setState({ code: value });
  }

  validateForm = () => {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  validateForgotPwSubmitForm = () => {
    return this.state.newPassword.length > 7 && this.state.passwordVerify.length > 7;
  }

  validateCode = () => {
    return this.state.code && String(this.state.code).length >= 6;
  }

  forgotPassword = () => {
    this.setState({ currentState: "forgotPassword" });
  }

  advanceForgotPwForm = () => {
    this.setState({ currentState: "forgotPasswordSubmit" });
  }

  sendEmailCode = async (event) => {
    event.preventDefault();

    try {
      const result = Auth.forgotPassword(this.state.username);
      this.setState({ username: "", currentState: "forgotPwEnterCode" });
      return;
    } catch (err) {
      // something went wrong, maybe an invalid username. tell the user to try again!
    }
  }

  changePassword = async (event) => {
    event.preventDefault();

    // Make sure the passwords match
    if (this.state.newPassword !== this.state.passwordVerify) {
      console.log("Passwords don't match"); // replace with a message to the user
      this.setState({ newPassword: "", passwordVerify: "" });
      return;
    }

    try {
      const currentUser = await Auth.currentAuthenticatedUser();
      const result = await Auth.changePassword
    } catch (err) {
      // something went wrong, tell the user
    }
  }

  forgotPasswordSubmit = async (event) => {
    event.preventDefault();

    // Make sure the passwords match
    if (this.state.newPassword !== this.state.passwordVerify) {
      console.log("Passwords don't match"); // replace with a message to the user
      this.setState({ newPassword: "", passwordVerify: "" });
      return;
    }

    try {
      const result = Auth.forgotPasswordSubmit(this.state.username, this.state.code, this.state.newPassword);
      // maybe show a confirmation here?
      this.setState({ currentState: "showLogin" });
    } catch (err) {
      // something went wrong, tell the user
    }
  }

  verifyEmail = async (event) => {
    event.preventDefault();

    try {
      const result = await Auth.verifyCurrentUserAttributeSubmit("email", this.state.code);
    } catch (err) {
      // user probably entered a bad code, tell them to try to log in again
      this.setState({ code: "", password: "", currentState: "showLogin" });
      return;
    }
    // If they successfully verified the email, no need to make them log in again.
    const session = await Auth.currentSession();
    localStorage.setItem('userToken', session.getAccessToken());
    this.props.history.push('/home');
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    let loginResult;
    try {
      // Try to sign in
      const loginResult = await Auth.signIn(this.state.username, this.state.password);
      const userInfo = await Auth.currentUserInfo();
      // This happens when they log in for the first time with their temp password
      if ("challengeName" in loginResult && loginResult["challengeName"] === "NEW_PASSWORD_REQUIRED") {
        this.setState({ userObject: loginResult, currentState: "showNewPassword" });
        return;
      }
      // This happens if they haven't yet verified their email
      if (!("email_verified" in userInfo["attributes"])) {
        await Auth.verifyCurrentUserAttribute("email");
        this.setState({ userObject: loginResult, currentState: "showVerifyEmail"})
        return;
      }
      // If we get this far, they are logged in. Add their token to local storage
      const session = await Auth.currentSession();
      localStorage.setItem('userToken', session.getAccessToken());
      this.props.history.push('/home');
    } catch(err) {
      // No match for the username/password
      if ("code" in err && err["code"] === "NotAuthorizedException") {
        document.getElementById("error").innerHTML = err.message;
      }
    }
  }

  handleNewPasswordSubmit = async (event) => {
    event.preventDefault();

    // Make sure the passwords match
    if (this.state.newPassword !== this.state.passwordVerify) {
      console.log("Passwords don't match"); // replace with a message to the user
      this.setState({ newPassword: "", passwordVerify: "" });
      return;
    }

    // Passwords match, so make the request to cognito
    try {
      const result = await Auth.completeNewPassword(this.state.userObject, this.state.newPassword);
      console.log(result);
      this.setState({ currentState: "showLogin", password: "" });
    } catch(err) {
      console.log(err); // should replace this with a message like "something went wrong, please try again"
    }
  }

  render() {
    if (this.state.currentState === "showLogin") {
      //////////////////////////////////////////////////////////
      ////////////////// Default login screen //////////////////
      //////////////////////////////////////////////////////////
      return (
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <ExternalNavbar />


        <div className="Login-div">
          <div className="row justify-content-center pt-5">
              <div className="Login border">
                <form onSubmit={this.handleSubmit}>
                  <FormGroup className="text-left"controlId="username">
                    <FormLabel>Username</FormLabel>
                    <FormControl
                      autoFocus
                      type="text"
                      value={this.state.username}
                      onChange={e => this.setUsername(e.target.value)}
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
                        Log In
                      </Button>
                    </div>
                    <div className="col-sm-7 pt-2">
                      <Button onClick={this.forgotPassword} className="pl-4 pr-4">
                        Forgot your password?
                      </Button>
                    </div>
                  </div>
                </form>
                <span id="error"></span>
              </div>
          </div>
        </div>

        <ExternalFooter />
      </>
      );
    } else if (this.state.currentState === "showNewPassword") {
      //////////////////////////////////////////////////////////
      /////////// User needs to change temp password ///////////
      //////////////////////////////////////////////////////////
      return (
        <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <ExternalNavbar />


        <div className="Login-div">
          <div className="row justify-content-center pt-5">
            <div className="Login border">
              <span>Please choose a new password.</span>
              <form onSubmit={this.handleNewPasswordSubmit}>
              <FormGroup className="text-left" controlId="newPassword">
                <FormLabel>New Password</FormLabel>
                <FormControl
                  value={this.state.newPassword}
                  onChange={e => this.setNewPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <FormGroup className="text-left" controlId="passwordVerify">
                <FormLabel>Verify Password</FormLabel>
                <FormControl
                  value={this.state.passwordVerify}
                  onChange={e => this.setpasswordVerify(e.target.value)}
                  type="password"
                />
              </FormGroup>
                <div className="row">
                  <div className="col-sm-5 text-left">
                    <Button id="login-page-button" className="pl-4 pr-4" type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ExternalFooter />
      </>
      );
    } else if (this.state.currentState === "forgotPassword") {
      //////////////////////////////////////////////////////////
      ///////// User enters username to reset password /////////
      //////////////////////////////////////////////////////////
      return (
        <>
          <Helmet>
            <title>{ TITLE }</title>
          </Helmet>

          <ExternalNavbar />

          <div className="Login-div">
            <div className="row justify-content-center pt-5">
              <div className="Login border">
                <span>Please enter your username to reset your password.</span>
                <form onSubmit={this.sendEmailCode}>
                    <FormGroup className="text-left" controlId="username">
                      <FormLabel>Username</FormLabel>
                      <FormControl
                        autoFocus
                        type="text"
                        value={this.state.username}
                        onChange={e => this.setUsername(e.target.value)}
                      />
                    </FormGroup>
                    <div className="row">
                      <div className="col-sm-5 text-left">
                        <Button id="login-page-button" className="pl-4 pr-4" type="submit">
                          Submit
                        </Button>
                      </div>
                  </div>
                  </form>
              </div>
            </div>
          </div>

          <ExternalFooter />
        </>
      );
    } else if (this.state.currentState === "forgotPwEnterCode") {
      /////////////////////////////////////////////////////////
      /////// User needs to enter code from their email ///////
      /////////////////////////////////////////////////////////
      return (
        <>
          <Helmet>
            <title>{ TITLE }</title>
          </Helmet>

          <ExternalNavbar />

          <div className="Login-div">
            <div className="row justify-content-center pt-5">
              <div className="Login border">
                <span>A verification code has been sent to the email associated with your account. Please enter it below.</span>
                <form onSubmit={this.advanceForgotPwForm}>
                    <FormGroup className="text-left" controlId="code">
                      <FormLabel>Code</FormLabel>
                      <FormControl
                        autoFocus
                        type="text"
                        value={this.state.code}
                        onChange={e => this.setCode(e.target.value)}
                      />
                    </FormGroup>
                    <div className="row">
                      <div className="col-sm-5 text-left">
                        <Button id="login-page-button" className="pl-4 pr-4" 
                                disabled={!this.validateCode()} type="submit">
                          Next
                        </Button>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>

          <ExternalFooter />
        </>
      );
    } else if (this.state.currentState === "forgotPasswordSubmit") {
      //////////////////////////////////////////////////////////
      ////// User enters new password after entering code //////
      //////////////////////////////////////////////////////////
      return (
        <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <ExternalNavbar />

        <div className="Login-div">
          <div className="row justify-content-center pt-5">
            <div className="Login border">
              <form onSubmit={this.forgotPasswordSubmit}>
              <FormGroup className="text-left" controlId="newPassword">
                <FormLabel>New Password</FormLabel>
                <FormControl
                  value={this.state.newPassword}
                  onChange={e => this.setNewPassword(e.target.value)}
                  type="password"
                />
              </FormGroup>
              <FormGroup className="text-left" controlId="passwordVerify">
                <FormLabel>Verify Password</FormLabel>
                <FormControl
                  value={this.state.passwordVerify}
                  onChange={e => this.setpasswordVerify(e.target.value)}
                  type="password"
                />
              </FormGroup>
                <div className="row">
                  <div className="col-sm-5 text-left">
                    <Button id="login-page-button" className="pl-4 pr-4" 
                            disabled={!this.validateForgotPwSubmitForm()} type="submit">
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <ExternalFooter />
      </>
      );
    } else if (this.state.currentState === "showVerifyEmail") {
      /////////////////////////////////////////////////////////
      ///////// User needs initial email verification /////////
      /////////////////////////////////////////////////////////
      return (
        <>
          <Helmet>
            <title>{ TITLE }</title>
          </Helmet>

          <ExternalNavbar />

          <div className="Login-div">
            <div className="row justify-content-center pt-5">
              <div className="Login border">
                <span>A verification code has been sent to the email associated with your account. Please enter it below.</span>
                <form onSubmit={this.verifyEmail}>
                    <FormGroup className="text-left" controlId="code">
                      <FormLabel>Code</FormLabel>
                      <FormControl
                        autoFocus
                        type="text"
                        value={this.state.code}
                        onChange={e => this.setCode(e.target.value)}
                      />
                    </FormGroup>
                    <div className="row">
                      <div className="col-sm-5 text-left">
                        <Button id="login-page-button" className="pl-4 pr-4" type="submit">
                          Submit
                        </Button>
                      </div>
                    </div>
                  </form>
              </div>
            </div>
          </div>

          <ExternalFooter />
        </>
      );
    }
  }
}

export default Login;
