import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";
import '../shared/internal.css';
import { DepredationList } from '../../components/survey/depredations/depredation-list';


const TITLE = 'Depredations Sheet'

class SurveyDepredations extends Component {

  constructor(props){
    super(props)

    this.state = {}
  }

  render() {
    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>

        <div className="container-fluid survey-container">
          <h1><b>DEPREDATIONS SHEET</b></h1><br></br>
          <hr />
          <div className="pb-4"></div>

          <DepredationList />
        </div>

        <InternalFooter />
      </>
    );
  }
}

export default SurveyDepredations;
