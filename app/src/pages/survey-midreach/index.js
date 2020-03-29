import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";
import '../shared/internal.css';
import { DepredationList } from '../../components/depredations/depredation-list';
import { FalseCrawlList } from '../../components/false-crawls/false-crawl-list';


const TITLE = 'Midreach Survey Sheet'

class SurveyMidreach extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      redirect: false,
    }

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
     // axios.get('https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon')
     //   .then(res => {
     //     const data = res.data.data; // get the data array instead of object
     //     this.setState({ data});
     //   })
     //   .catch(err => { // log request error and prevent access to undefined state
     //     this.setState({ isLoading: false});
     //     console.error(err);
     //   })
   }

  handleSubmit(e) {
     e.preventDefault();
     const data = {}

     axios.post('http://localhost:5555/data', { data })
      .then(res => {
        console.log(data);
        console.log(this.state.data[0]);
    })
  }


  // RENDER HELPERS

  // Returns a list of HTML turtle rows, for use in the data table.
  getNests_tableRows (m_key, startKm, endKm) {
    let key = m_key.key;
    let tableRows = [];

    // Fill out rows
    for (let i = startKm; i < endKm; i += 0.5) {
      tableRows.push (
        <>
          <tr key={key++}>
            <td rowSpan="2" className="center-td" key={key++}> { i.toFixed(1) }-{ (i+0.5).toFixed(1) }</td>
            <td key={key++} className="center-td">Cc</td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>
          </tr>
          <tr key={key++}>
            <td key={key++} className="center-td">Cm</td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>
          </tr>
        </>
      );
    }

    // Total rows
    tableRows.push (
      <>
        <tr key={key++} className="bold-top-border">
          <td colSpan="2" className="grey-td center-td" key={key++}><b>Cc Totals</b></td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
        </tr>
        <tr key={key++}>
          <td colSpan="2" className="grey-td center-td" key={key++}><b>Cm Totals</b></td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
        </tr>
      </>
    );

    m_key.key = key;
    return tableRows;
  }

  getFalseCrawls_tableRows (m_key, startKm, endKm) {
    let key = m_key.key;
    let tableRows = [];

    // Fill out rows
    for (let i = startKm; i < endKm; i += 0.5) {
      tableRows.push (
        <>
          <tr key={key++}>
            <td rowSpan="2" className="center-td" key={key++}> { i.toFixed(1) }-{ (i+0.5).toFixed(1) }</td>
            <td key={key++} className="bold-right-border center-td">Cc</td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>

            <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>
          </tr>
          <tr key={key++}>
            <td key={key++} className="bold-right-border center-td">Cm</td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>

            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++}> <input className="form-control" type="text" id="example-text-input"/> </td>
            <td key={key++} className="bold-right-border"> <input className="form-control" type="text" id="example-text-input"/> </td>

            <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>
          </tr>
        </>
      );
    }

    // Total rows
    tableRows.push (
      <>
        <tr key={key++} className="bold-top-border">
          <td colSpan="2" className="grey-td center-td bold-right-border" key={key++}>
            <b>Cc Totals</b>
          </td>

          {/* Before */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* Transition */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* On Dune */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>

        </tr>
        <tr key={key++}>
          <td colSpan="2" className="grey-td center-td bold-right-border" key={key++}>
            <b>Cm Totals</b>
          </td>

          {/* Before */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* Transition */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          {/* On Dune */}
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>
          <td key={key++} className="bold-right-border grey-td">
            <input className="form-control" type="text" id="example-text-input" disabled/>
          </td>

          <td key={key++} className="grey-td"> <input className="form-control" type="text" id="example-text-input" disabled/> </td>

        </tr>
      </>
    );

    m_key.key = key;
    return tableRows;
  }

  getDcCrawls_tableRows (m_key) {
    let key = m_key.key;
    let tableRows = [];

    // Fill out rows
    for (let i = 0; i < 3; i++) {
      tableRows.push (
        <>
          <tr>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
            <td>
              <select className="form-control" id="exampleFormControlSelect1">
                  <option>Nest</option>
                  <option>FC</option>
              </select>
            </td>
          </tr>
        </>
      );
    }

    m_key.key = key;
    return tableRows;
  }

  getDepredations_tableRows (m_key) {
    let key = m_key.key;
    let tableRows = [];

    // Fill out rows
    for (let i = 0; i < 3; i++) {
      tableRows.push (
        <>
          <tr>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
            <td>
              <select className="form-control" id="exampleFormControlSelect1">
                  <option>Cc</option>
                  <option>Cm</option>
                  <option>Dc</option>
              </select>
            </td>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
          </tr>
        </>
      );
    }

    m_key.key = key;
    return tableRows;
  }

  getEmergences_tableRows (m_key) {
    let key = m_key.key;
    let tableRows = [];

    // Fill out rows
    for (let i = 0; i < 3; i++) {
      tableRows.push (
        <>
          <tr>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
            <td> <input className="form-control" type="text" id="example-text-input" /> </td>
          </tr>
        </>
      );
    }

    m_key.key = key;
    return tableRows;
  }

  render() {
    let nests_tableRows = [];
    let falseCrawls_tableRows = [];
    let dcCrawls_tableRows = [];
    let depredations_tableRows = [];
    let emergences_tableRows = [];
    let startKm = 2.5;
    let endKm = 15.5;

    let m_key = {key:0};

    nests_tableRows = this.getNests_tableRows(m_key, startKm, endKm);
    falseCrawls_tableRows = this.getFalseCrawls_tableRows(m_key, startKm, endKm);
    dcCrawls_tableRows = this.getDcCrawls_tableRows(m_key);
    depredations_tableRows = this.getDepredations_tableRows(m_key);
    emergences_tableRows = this.getEmergences_tableRows(m_key);

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>

        <div className="container-fluid survey-container">
          <h1><b>MIDREACH SURVEY SHEET</b></h1><br></br>
          <hr />
          <div className="pb-4"></div>

          <form>

            <FalseCrawlList />

            <hr />

            <DepredationList />

            <div className="form-row">
              {/* Date */}
              <div className="col-md-2 mr-4">
                <div className="form-group row">
                  <label htmlFor="example-date-input" className="col-3 col-form-label">Date</label>
                  <div className="col-9">
                    <input className="form-control" type="date" id="example-date-input"/>
                  </div>
                </div>
              </div>
              {/* Initials */}
              <div className="col-md-2 mr-4">
                <div className="form-group row">
                  <label htmlFor="example-date-input" className="col-3 col-form-label">Initials</label>
                  <div className="col-9">
                    <input className="form-control" type="text" id="example-text-input" />
                  </div>
                </div>
              </div>
              {/* Notes */}
              <div className="col-md">
                <div className="form-group row">
                  <label htmlFor="example-date-input" className="col-3 col-form-label">Notes</label>
                  <textarea name="message" rows="6" cols="80">
                  </textarea>
                </div>
              </div>
            </div>

            <div className="form-row pt-3">
              {/* NESTS */}
              <div className="col-md-4 pr-3">
                <div className="survey-section-div">
                  <h3><b>Nests</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr><th colSpan='6'>&nbsp;</th></tr>
                    <tr>
                      <th style={{width:  '95px'}} scope="col">km</th>
                      <th scope="col"></th>
                      <th scope="col">B</th>
                      <th scope="col">T</th>
                      <th scope="col" className="bold-right-border">O</th>
                      <th scope="col" className="grey-td">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    { nests_tableRows }
                  </tbody>
                </table>
              </div>

              {/* FALSE CRAWLS */}
              <div className="col-md">
                <div className="survey-section-div">
                  <h3><b>False crawls</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th style={{width:  '95px'}} scope="col"></th>
                      <th scope="col" className="bold-right-border"></th>
                      <th scope="col" colSpan='3' className="bold-right-border">Before</th>
                      <th scope="col" colSpan='3' className="bold-right-border">Transition</th>
                      <th scope="col" colSpan='3' className="bold-right-border">On Dune</th>
                      <th scope="col"></th>
                    </tr>
                    <tr>
                      <th style={{width:  '95px'}} scope="col">km</th>
                      <th scope="col" className="bold-right-border"></th>

                      <th scope="col">L</th>
                      <th scope="col">P</th>
                      <th scope="col" className="bold-right-border">A</th>

                      <th scope="col">L</th>
                      <th scope="col">P</th>
                      <th scope="col" className="bold-right-border">A</th>

                      <th scope="col">L</th>
                      <th scope="col">P</th>
                      <th scope="col" className="bold-right-border">A</th>

                      <th scope="col" className="grey-td">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    { falseCrawls_tableRows }
                  </tbody>
                </table>
              </div>
            </div>

            <div className="form-row pt-3">
              {/* Dc CRAWLS */}
              <div className="col-md-3 pr-3">
                <div className="survey-section-div">
                  <h3><b>Dc Crawls</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th style={{width:  '95px'}} scope="col">km</th>
                      <th scope="col">Nest or FC?</th>
                    </tr>
                  </thead>
                  <tbody>
                    { dcCrawls_tableRows }
                  </tbody>
                </table>
              </div>

              {/* DEPREDATIONS */}
              <div className="col-md-6">
                <div className="survey-section-div">
                  <h3><b>Depredations</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th style={{width:  '95px'}} scope="col">km</th>
                      <th style={{width:  '180px'}} scope="col">Species</th>
                      <th scope="col">Predator</th>
                      <th style={{width:  '95px'}} scope="col"># Eggs Destroyed</th>
                      <th style={{width:  '95px'}} scope="col">Stake #</th>
                    </tr>
                  </thead>
                  <tbody>
                    { depredations_tableRows }
                  </tbody>
                </table>
              </div>

              {/* EMERGENCES */}
              <div className="col">
                <div className="survey-section-div">
                  <h3><b>Emergences</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th scope="col">Stake #</th>
                      <th scope="col">Stake #</th>
                    </tr>
                  </thead>
                  <tbody>
                    { emergences_tableRows }
                  </tbody>
                </table>
              </div>
            </div>

            <div className="form-row pt-3 justify-content-md-center">
              {/* BELOW HTL */}
              <div className="col-md-3">
                <div className="survey-section-div">
                  <h3><b>Below HTL</b></h3>
                </div>
                <table className="table table-bordered table-dark-border">
                  <thead>
                    <tr>
                      <th style={{width:  '95px'}} scope="col"></th>
                      <th scope="col">Nest</th>
                      <th style={{width:  '95px'}} scope="col">FC</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Cc</td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                    </tr>
                    <tr>
                      <td>Cm</td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                    </tr>
                    <tr>
                      <td>Dc</td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                      <td> <input className="form-control" type="text" id="example-text-input" /> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </form>

          <button type="submit" className="btn btn-primary mt-3">SUBMIT</button>
        </div>

        <InternalFooter />
      </>
    );
  }
}



export default SurveyMidreach;
