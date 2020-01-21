import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ExternalNavbar from '../../components/external-navbar';
import ExternalFooter from '../../components/external-footer';
import '../shared/external.css';

const TITLE = 'About'

class About extends React.Component {
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

        <div class="container-fluid bg-white about-description">
           <div class="row">
              <div class="col-sm-1"></div>
              <div class="col-sm-10">
                 <h2 class="pb-3">About This Database</h2>
                 <h4 class="pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip.</h4>
                 <p class="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                 <div class="button-wrapper">
                    <a href="contact">
                       <button class="btn btn-outline-secondary btn-lg">Get in Touch</button>
                    </a>
                 </div>
              </div>
              <div class="col-sm-1"></div>
           </div>
        </div>
        <div class="container-fluid bg-grey">
           <div class="row">
              <div class="col-sm-4 p-3 pt-4 pb-4 pl-4">
                 <img src={require('./sea-turtle.jpg')} width='100%' />
              </div>
              <div class="col-sm-4 p-3 pt-4 pb-4">
                 <img src={require('./baby-turtle.jpg')} width='100%' />
              </div>
              <div class="col-sm-4 p-3 pt-4 pb-4">
                 <img src={require('./holding-turtle.jpg')} width='100%' />
              </div>
           </div>
        </div>

        <ExternalFooter />
      </>
    );
  }
}

export default About;
