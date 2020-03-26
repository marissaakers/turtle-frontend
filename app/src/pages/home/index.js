import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';

const TITLE = 'MTRG - User homepage'

class Home extends React.Component {
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

        <InternalNavbar />
        <h3>MTRG - User homepage</h3>

        <div class="container-fluid bg-white">
          <div class="row pt-4 pb-4">
            <div class="col-sm-1"></div>
            <div class="col-sm-10">
              <div class="row d-flex justify-content-center">
                <div class="col-sm-4 p-6">
                  <a href="/new-report">
                    <img src={require('./data.png')} width='90%' />
                    <h4 class="pt-4">New report</h4>
                  </a>
                </div>
                <div class="col-sm-4 p-6">
                  <a href="/reports-list/lagoon">
                    <img src={require('./search.png')} width='90%' />
                    <h4 class="pt-4">View data</h4>
                  </a>
                </div>
              </div>
            </div>
            <div class="col-sm-1"></div>
          </div>
        </div>

        <InternalFooter />
      </>
    );
  }
}

export default Home;
