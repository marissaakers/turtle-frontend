import React, { Component } from 'react';
import './index.css';

class ExternalNavbar extends React.Component {
  render() {
    return(
      <>
        <nav className="navbar navbar-expand-md">
           <a className="navbar-brand" href="/"><img src="https://media.discordapp.net/attachments/612118988083822612/634929890273132557/turtle.png" width="60" />MTRG Database</a>
           <button className="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#main-navigation">
              <span className="navbar-toggler-icon"></span>
           </button>
           <div className="collapse navbar-collapse" id="main-navigation">
              <ul className="navbar-nav">
                 <li className="nav-item ml-auto">
                    <a className="nav-link" href="about">About</a>
                 </li>
                 <li className="nav-item ml-auto">
                    <a className="nav-link" href="contact">Contact us</a>
                 </li>

              </ul>
              <a href="login">
                 <button className="btn btn-outline-secondary" id="login-button"><b>Login</b></button>
              </a>
           </div>
        </nav>
      </>
    );
  }
}

export default ExternalNavbar;
