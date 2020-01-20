import React, { Component } from 'react';
import './index.css';

class ExternalNavbar extends React.Component {
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
                 <li class="nav-item ml-auto">
                    <a class="nav-link" href="about">About</a>
                 </li>
                 <li class="nav-item ml-auto">
                    <a class="nav-link" href="contact">Contact us</a>
                 </li>

              </ul>
              <a href="login">
                 <button class="btn btn-outline-secondary" id="login-button"><b>Login</b></button>
              </a>
           </div>
        </nav>
      </>
    );
  }
}

export default ExternalNavbar;
