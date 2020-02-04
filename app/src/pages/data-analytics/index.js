import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {Link} from 'react-router-dom';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';

const TITLE = 'Data Analytics'

class DataAnalytics extends React.Component {
  constructor(props) {
    super(props);

    this.state = { }
  }

  render() {
    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/home">← back</a></p>

        <h3>MTRG - Data analytics page</h3>
        <p>Here we can analyze data. (WIP) This is <i>basically</i> what it'll look like. Probably</p>

        <img src="https://cdn.discordapp.com/attachments/612118988083822612/674085727637733385/qjFoPcEJKjQrCnsvVQvuCQqmby4vko74MIzpw5j-Z7oqQXFlTLidn7yeDPAhWazbBrSb-vZIckzfflzKZtt2a5wIm09p8fwIHATg.png" />

        <InternalFooter />
      </>
    )
  }
}

export default DataAnalytics;
