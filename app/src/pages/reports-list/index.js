import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {Link} from 'react-router-dom';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';

const TITLE = 'MTRG - Reports list'

class ReportsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {},
      form: {
        species: 'all',
        encounter_date_start: '01/01/0000',
        encounter_date_end: '12/31/9999',
        verified_by: '',
        investigated_by: '',
        entered_by: ''
      }
    }
  }

  async loadReportsList(json) {
    this.setState({isLoading: true});
    console.log("Sent JSON = " + json);
    const data = await axios.post(
      'https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon/query',
      json,
      { headers: {'Content-Type': 'application/json'} }
    );

    this.setState(data);
    this.setState({isLoading: false});
    console.log(data);
  }

  async componentDidMount() {
    this.loadReportsList('{}');
  }

  mySubmitHandler = (event) => {
    event.preventDefault();

    function formReplacer(key, value) {
      // Filter out unassigned properties
      if (value === '' ||
         (key === 'species' && value === 'all')) {
        return undefined;
      }
      return value;
    }

    let myJson = JSON.stringify(this.state.form, formReplacer)
    // alert("JSON = " + myJson);

    // Update rows
    this.loadReportsList(myJson);
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    let myForm = { ...this.state.form };

    if (nam === 'encounter_date_start' || nam === 'encounter_date_end') {
      console.log(val + " has type of " + typeof val);
      let arr = val.split('-');
      let year = arr[0];
      let month = arr[1];
      let date = arr[2];
      console.log(month + "/" + date + "/" + year);
      myForm[nam] = month + "/" + date + "/" + year;
    }
    else {
      myForm[nam] = val;
    }
    this.setState({form: myForm});
  }

  render() {
    let displayBlock;
    let _data = this.state.data;
    let turtleRows = [];

    if (this.state.isLoading) {
      displayBlock = (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    else {
      let key = 0;
      for (let i = 0; i < _data.length; i++) {
        for (let j = 0; j < _data[i].encounters.length; j++) {

          let turtleRow = [];

          let turtleRowFields = [
            _data[i].encounters[j].encounter_id,
            _data[i].turtle_id,
            _data[i].encounters[j].encounter_date,
            _data[i].encounters[j].species,
            _data[i].encounters[j].type,
            _data[i].encounters[j].metadata.metadata_location,
            _data[i].encounters[j].entered_by
          ];

          for (let k = 0; k < turtleRowFields.length; k++) {
            turtleRow.push(
              <td key={key++}>
                <Link to={{
                  pathname: '/reports/' + _data[i].encounters[j].encounter_id,
                  state: {
                    turtleData: _data[i],
                    encounterNum: j
                  }}}>
                  { turtleRowFields[k] }
                </Link>
              </td>
            );
          }

          turtleRows.push(
            <tr key={key++}>
              { turtleRow }
            </tr>
          );
        }
      }

      displayBlock = null;
    }

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/home">← back</a></p>

        <h3>MTRG - Reports List</h3>
        <p>Here we will have a table of the reports in the database.</p>

        <div className="container">
          <form onSubmit={this.mySubmitHandler}>
            <div className="row">
              <div className="filter-section col-sm-3 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <h5><b>Species</b></h5>
                </div>
                <div className="pr-2 pl-2">
                  <select className="form-control"
                    name='species'
                    onChange={this.myChangeHandler}
                    value={this.state.form.species}>
                     <option value="all">All</option>
                     <option value="Loggerhead">Loggerhead</option>
                     <option value="Green sea turtle">Green sea turtle</option>
                     <option value="Leatherback">Leatherback</option>
                     <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="col-sm-3 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <h5><b>Date</b></h5>
                </div>

                <div className="pr-2 pl-2">
                  <div className="row pb-2 pt-1">
                    <div className="col-sm-3">
                      Start date
                    </div>
                    <div className="col-sm-9">
                      <input className="form-control"
                        type="date"
                        name='encounter_date_start'
                        onChange={this.myChangeHandler} />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-3">
                      End date
                    </div>
                    <div className="col-sm-9">
                      <input className="form-control"
                        type="date"
                        name='encounter_date_end'
                        onChange={this.myChangeHandler}/>
                    </div>
                  </div>
                </div>

              </div>
              <div className="col-sm-5 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <h5><b>People</b></h5>
                </div>
                <div className="row pl-2">
                  <div className="col-sm-4 ml-1 mr-2 text-right">
                    <p>Verified by</p>
                  </div>
                  <div className="col-sm-7">
                    <input className="form-control"
                      type="text"
                      name='verified_by'
                      onChange={this.myChangeHandler} />
                  </div>
                </div>
                <div className="row pl-2">
                  <div className="col-sm-4 ml-1 mr-2 text-right">
                    <p>Investigated by</p>
                  </div>
                  <div className="col-sm-7">
                    <input className="form-control"
                      type="text"
                      name='investigated_by'
                      onChange={this.myChangeHandler} />
                  </div>
                </div>
                <div className="row pl-2">
                  <div className="col-sm-4 ml-1 mr-2 text-right">
                    <p>Entered by</p>
                  </div>
                  <div className="col-sm-7">
                    <input className="form-control"
                      type="text"
                      name='entered_by'
                      onChange={this.myChangeHandler} />
                  </div>
                </div>
              </div>
            </div>

            <div className="row p-3 justify-content-center">
              <button
               type="submit"
               className="btn btn-primary filter-update-btn">
                Update
              </button>
            </div>
          </form>
        </div>

        <hr className="pb-4" />

        <table className="table table-striped table-hover">
          <thead>
            <tr>
              <th scope="col">Encounter ID</th>
              <th scope="col">Turtle ID</th>
              <th scope="col">Encounter date</th>
              <th scope="col">Species</th>
              <th scope="col">Encounter type</th>
              <th scope="col">Location</th>
              <th scope="col">Entered by</th>
            </tr>
          </thead>
          <tbody>
            { turtleRows }
          </tbody>
        </table>

        { displayBlock }

        <InternalFooter />

      </>
    )
  }
}

export default ReportsList;
