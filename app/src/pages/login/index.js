import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ExternalNavbar from '../../components/external-navbar';
import ExternalFooter from '../../components/external-footer';
import '../shared/external.css';

const TITLE = 'Login'

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  render() {
    return(
    <>
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>

      <ExternalNavbar />

      <h1 class="pt-4 pb-3">Login page - Work in progress</h1>

      <ExternalFooter />
    </>
    );
  }
}

export default Login;
