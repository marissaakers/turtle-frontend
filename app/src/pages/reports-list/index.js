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
      numTagInputs: 1,
      resultsPerPage: 20,
      currentPage: 1,
      data: {},
      form: {
        species: 'all',
        encounter_date_start: '',
        encounter_date_end: '',
        tags: [],
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
      'https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon/mini_query',
      json,
      { headers: {'Content-Type': 'application/json'} }
    );

    this.setState(data);
    this.setState({isLoading: false});
    console.log(data);
  }

  async componentDidMount() {
    this.loadReportsList('{"encounter_date_start":"01/01/0001"}');
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    console.log('this.state.numTagInputs = ' + this.state.numTagInputs);
    let numTagInputs = this.state.numTagInputs;

    function formReplacer (key, value) {
      // Filter out unassigned properties
      if (value === '' ||
         (key === 'species' && value === 'all')) {
        return undefined;
      }
      else if (key === 'tags') {
        if (numTagInputs === 0) {
          return undefined;
        }
        let tagsAreEmpty = true
        for (let i = 0; i < value.length; i++) {
          if (value[i] != '') {
            tagsAreEmpty = false;
          }
        }
        if (tagsAreEmpty) {
          return undefined;
        }
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

    // Date
    if (nam === 'encounter_date_start' || nam === 'encounter_date_end') {
      let arr = val.split('-');
      let year = arr[0];
      let month = arr[1];
      let date = arr[2];
      myForm[nam] = month + "/" + date + "/" + year;
    }
    // Tags
    else if (nam.split('-')[0] === 'tag') {
      myForm['tags'][nam.split('-')[1]] = val;
    }
    else {
      myForm[nam] = val;
    }
    this.setState({form: myForm});
  }

  setPageNum = (newNum) => {
    console.log("Old currentPage # = " + this.state.currentPage + ", new # = " + newNum);
    if (newNum < 1) {
      this.setState({currentPage: 1});
    }
    else if (newNum > Math.floor(this.state.data.length / this.state.resultsPerPage) + 1) {
      this.setState({currentPage: Math.floor(this.state.data.length / this.state.resultsPerPage)});
    }
    else {
      this.setState({currentPage: newNum});
    }
  }

  addTagInput = (event) => {
    event.preventDefault();
    let n = this.state.numTagInputs;
    if (n < 20) {
      this.setState({numTagInputs: n+1});
    }
  }
  removeTagInput = (event) => {
    event.preventDefault();
    let n = this.state.numTagInputs;
    if (n > 0) {
      this.setState({numTagInputs: n-1});
    }
    this.state.form.tags.pop();
  }

  render() {
    let displayBlock;
    let _data = this.state.data;
    let turtleRows = [];
    let tagInputBlock = [];
    let pageNumberPicker = [];

    let key = 0;

    // Reports list
    if (this.state.isLoading) {
      displayBlock = (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    else {
      displayBlock = null;

      // Fill out data table
      let startIndex = 0;
      let length = _data.length;
      console.log("current page = " + this.state.currentPage);
      if (this.state.currentPage > 1) {
        if ((this.state.currentPage - 1) * this.state.resultsPerPage > _data.length) {
          console.error("Trying to load results greater than " + _data.length + ", when " +
                        "max number of results that can be displayed is " +
                        (this.state.currentPage - 1) * this.state.resultsPerPage + ".");
        }
        else {
          startIndex = (this.state.currentPage - 1) * this.state.resultsPerPage;
        }
      }
      if (_data.length > this.state.resultsPerPage) {
        if (_data.length - startIndex < this.state.resultsPerPage) {
          length = _data.length - startIndex;
        }
        else {
          length = this.state.resultsPerPage;
        }
      }
      console.log("startIndex = " + startIndex + ", length = " + length + ", _data.length = " + _data.length);
      for (let i = startIndex; i < startIndex + length; i++) {
        let turtleRow = [];
        let turtleRowFields = [
          _data[i].encounter_id,
          _data[i].turtle_id,
          _data[i].encounter_date,
          _data[i].species,
          _data[i].type,
          _data[i].metadata_location,
          _data[i].entered_by
        ];

        // Replace null values with 'Null'
        for (let j = 0; j < turtleRowFields.length; j++) {
          if (turtleRowFields[j] === null) {
            turtleRowFields[j] = "–";
          }
        }

        for (let k = 0; k < turtleRowFields.length; k++) {
          turtleRow.push(
            <td key={key++}>
              <Link to={{
                pathname: '/reports/' + _data[i].encounter_id,
                state: {
                  encounterId: _data[i].encounter_id
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

      // Create page number picker
      let temp = [];
      console.log("_data.length = " + _data.length);
      temp.push( <a href="#" key={key++} onClick={() => this.setPageNum(1)}>&lt;&lt;</a> );
      temp.push( <a href="#" key={key++} onClick={() => this.setPageNum(this.state.currentPage-1)}> &lt;</a> );
      for (let i = 1; i <= Math.floor(_data.length / this.state.resultsPerPage) + 1; i++) {
        if (this.state.currentPage === i) {
          temp.push(
            <b key={key++}> {i}</b>
          )
        }
        else {
          temp.push(
            <a href="#" key={key++} onClick={() => this.setPageNum(i)}> {i}</a>
          )
        }
      }
      temp.push( <a href="#" key={key++} onClick={() => this.setPageNum(this.state.currentPage+1)}> &gt;</a> );
      temp.push( <a href="#" key={key++} onClick={() => this.setPageNum(Math.floor(_data.length / this.state.resultsPerPage))}> &gt;&gt;</a> );
      // (this.state.currentPage - 1) * this.state.resultsPerPage;
      // << < 1 2 3 4 5 > >>
      pageNumberPicker.push(
        <p key={key++}>{temp}</p>
      )
    }

    // this.renderTagInputBlock();
    // Tag input block
    for (let i = 0; i < this.state.numTagInputs; i++) {
      let tagName = 'tag-' + i;
      tagInputBlock.push(
        <div className="row pb-1" key={key++}>
          <div className="col-sm-12">
            <input className="form-control"
              type="text"
              name={'tag-' +  i}
              onChange={this.myChangeHandler} />
          </div>
        </div>
      );
    }
    // Plus button
    tagInputBlock.push(
      <div className="row pb-1" key={key++}>
        <div className="col-sm-3">
          <button onClick={this.addTagInput} className="btn btn-light border-secondary">
            +
          </button>
        </div>
        <div className="col-sm-3 pr-1">
          <button onClick={this.removeTagInput} className="btn btn-light border-secondary">
            -
          </button>
        </div>
      </div>
    )


    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/home">← back</a></p>

        <h3>MTRG - Reports List</h3>
        <p>View list of database entries. Use filters to narrow down your search.</p>

        {/* FILTERS */}
        <div className="container">
          <form onSubmit={this.mySubmitHandler}>
            {/* Row 1 */}
            <div className="row pb-2 pt-2">
              <div className="col-sm-3 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <h5><b>Tags</b></h5>
                </div>
                <div className="pr-2 pl-2">
                  { tagInputBlock }
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row pb-2 pt-2">

              {/* Species filter */}
              <div className="col-sm-3 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <h5><b>Species</b></h5>
                </div>
                <div className="pr-2 pl-2">
                  <select className="form-control"
                    name='species'
                    onChange={this.myChangeHandler}
                    value={this.state.form.species}>
                     <option value="all">All</option>
                     <option value="Caretta caretta">Loggerhead (Caretta caretta)</option>
                     <option value="Chelonia mydas">Green sea turtle (Chelonia mydas)</option>
                     <option value="Eretmochelys imbricata">Leatherback (Eretmochelys imbricata)</option>
                     <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Date filter */}
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

              {/* People filter */}
              <div className="col-sm mr-1 ml-1 border pr-0 pl-0">
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

            {/* Submit buttons */}
            <div className="row p-3 justify-content-center">
              <button
               type="submit"
               className="btn btn-primary filter-update-btn m-1">
                Update
              </button>
              <button
               type="submit"
               className="btn btn-light filter-update-btn m-1 border-secondary">
                Clear all
              </button>
            </div>
          </form>
        </div>

        <hr className="pb-4" />

        {/* Data table header */}
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

        { pageNumberPicker }
        { displayBlock }

        <InternalFooter />

      </>
    )
  }
}

export default ReportsList;
