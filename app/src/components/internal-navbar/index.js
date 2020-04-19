import React, { Component } from 'react';
import './index.css';
import { Auth } from 'aws-amplify';
import { getUsername } from '../../util/auth-util';

class InternalNavbar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username : ''
    }
  }

  handleLogout = async event => {
    await Auth.signOut();
    localStorage.removeItem('userToken');
  }

  async componentDidMount() {
    let name = await getUsername();
    this.setState({username : name});
  }

  render() {
    return(
      <>
        <nav className="navbar navbar-expand-md">
           <a className="navbar-brand" href="/home"><img src="https://media.discordapp.net/attachments/612118988083822612/634929890273132557/turtle.png" width="60" />MTRG Database</a>
           <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#main-navigation">
              <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="main-navigation">
              <h5 className="pr-3 mt-2">Welcome, { this.state.username }!</h5>
              <ul className="navbar-nav">
              </ul>
              <a href="/login">
                 <button className="btn btn-outline-secondary" id="login-button" onClick={this.handleLogout}><b>Logout</b></button>
              </a>
           </div>
        </nav>
        <nav className="pb-5"></nav>
      </>
    );
  }
}

export default InternalNavbar;
