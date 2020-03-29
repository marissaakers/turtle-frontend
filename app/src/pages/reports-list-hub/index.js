import React from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {Link} from 'react-router-dom';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import ReportsListLagoon from '../../components/reports-list/lagoon';
import ReportsListTrident from '../../components/reports-list/trident';
import ReportsListBeach from '../../components/reports-list/beach';
import ReportsListOffshore from '../../components/reports-list/offshore';
import '../shared/internal.css';
import './index.css';


const TITLE = 'MTRG - Reports list'

class ReportsListHub extends React.Component {
  constructor(props) {
    super(props);
    this.state = { }
  }

  render () {
    return (
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <InternalNavbar />

        <p align="left" className="pl-4"><a href="/home">← back</a></p>
        <div className="container">
          <div className="panel with-nav-tabs panel-default">
            <div className="panel-heading">
              <ul className="nav nav-tabs">
                <>
                  <li className='nav-item'><a className='nav-link active' data-toggle='tab' href='#s1'>Lagoon</a></li>
                  <li className='nav-item'><a className='nav-link' data-toggle='tab' href='#s2'>Trident</a></li>
                  <li className='nav-item'><a className='nav-link' data-toggle='tab' href='#s3'>Beach</a></li>
                  <li className='nav-item'><a className='nav-link' data-toggle='tab' href='#s3'>Offshore</a></li>
                </>
              </ul>

              <div className="tab-content">
               <div className='tab-pane container fade in show active' id='s1'>{ <ReportsListLagoon /> }</div>
               <div className='tab-pane container fade' id='s2'>{ <ReportsListTrident /> }</div>
               <div className='tab-pane container fade' id='s3'>{ <ReportsListBeach /> }</div>
               <div className='tab-pane container fade' id='s4'>{ <ReportsListOffshore /> }</div>
              </div>
            </div>
          </div>
        </div>

        <InternalFooter />
      </>
    );
  }
}

export default ReportsListHub;
