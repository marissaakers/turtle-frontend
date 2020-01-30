import React, { Component } from 'react';
import './index.css';

class InternalNavbar extends React.Component {
  render() {
    return(
      <>
        <nav class="navbar navbar-expand-md">
           <a class="navbar-brand" href="/"><img src="https://media.discordapp.net/attachments/612118988083822612/634929890273132557/turtle.png" width="60" />MTRG Database</a>
           <button class="navbar-toggler navbar-light" type="button" data-toggle="collapse" data-target="#main-navigation">
              <span class="navbar-toggler-icon"></span>
           </button>
           <div class="collapse navbar-collapse" id="main-navigation">
              <ul class="navbar-nav">
              </ul>
              <a href="/">
                 <button class="btn btn-outline-secondary" id="login-button"><b>Logout</b></button>
              </a>
           </div>
        </nav>
        <nav class="pb-5"></nav>
      </>
    );
  }
}

export default InternalNavbar;
