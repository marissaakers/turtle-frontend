import React, { Component } from 'react';
import './index.css';

class InternalNavbar extends React.Component {
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
              </ul>
              <a href="/">
                 <button className="btn btn-outline-secondary" id="login-button"><b>Logout</b></button>
              </a>
           </div>
        </nav>
        <nav className="pb-5"></nav>
      </>
    );
  }
}

export default InternalNavbar;
