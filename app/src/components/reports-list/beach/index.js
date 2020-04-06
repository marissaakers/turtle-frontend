import React from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {Link} from 'react-router-dom';
import '../../../pages/shared/internal.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { Redirect } from 'react-router-dom';
import LoadingSpinner from '../../loading-spinner';

class ReportsListBeach extends React.Component {
  constructor(props) {
    super(props);

    this.formDefaults = {
      'tags': [],
      'species': 'all',
      'encounter_date_start': '',
      'encounter_date_end': '',

      'turtle_id': '',
      'encounter_id': '',
      'metadata_id': '',

      'verified_by': '',
      'investigated_by': '',
      'entered_by': ''
    }

    this.state = {
      isLoading: true,
      numTagInputs: 1,
      resultsPerPage: 20,
      currentPage: 1,
      data: {},
      form: {
        tags: this.formDefaults.tags,
        species: this.formDefaults.species,
        encounter_date_start: this.formDefaults.encounter_date_start,
        encounter_date_end: this.formDefaults.encounter_date_end,

        turtle_id: this.formDefaults.turtle_id,
        encounter_id: this.formDefaults.encounter_id,
        metadata_id: this.formDefaults.metadata_id,

        verified_by: this.formDefaults.verified_by,
        investigated_by: this.formDefaults.investigated_by,
        entered_by: this.formDefaults.entered_by
      }
    }
  }

  async loadReportsList(json) {
    this.setState({isLoading: true});
    console.log("Sent JSON = " + json);
    const data = await axios.post(
      'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/beach/mini_query',
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

  // HANDLERS
  mySubmitHandler = (event) => {
    event.preventDefault();
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
          if (value[i] !== '') {
            tagsAreEmpty = false;
          }
        }
        if (tagsAreEmpty) {
          return undefined;
        }
      }
      else if (key === 'turtle_id') {
        return parseInt(value);
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

  clearForm = (event) => {
    event.preventDefault();
    // Reset values
    this.setState({form: this.formDefaults});
    this.loadReportsList('{}');
  }

  setPageNum = (newNum) => {
    if (newNum < 1) {
      this.setState({currentPage: 1});
    }
    else if (newNum > Math.floor((this.state.data.length - 1) / this.state.resultsPerPage) + 1) {
      this.setState({currentPage: Math.floor((this.state.data.length - 1) / this.state.resultsPerPage) + 1});
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

  // RENDER HELPERS

  // Returns a list of HTML turtle rows, for use in the data table.
  getTurtleRows (m_key) {
    let key = m_key.key;
    let _data = this.state.data;
    let turtleRows = [];
    let startIndex = 0;
    let length = _data.length;

    // Get startIndex from the current page number
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

    // Get length of list of results to show
    if (_data.length > this.state.resultsPerPage) {
      if (_data.length - startIndex < this.state.resultsPerPage) {
        length = _data.length - startIndex;
      }
      else {
        length = this.state.resultsPerPage;
      }
    }

    // Fill out rows
    for (let i = startIndex; i < startIndex + length; i++) {
      let turtleRow = [];
      let turtleRowFields = [
        _data[i].encounter_id,
        _data[i].turtle_id,
        _data[i].encounter_date,
        _data[i].species,
        _data[i].type,
        _data[i].metadata_location
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

    m_key.key = key;
    return turtleRows;
  }

  // Returns the page number links at the bottom of the page, in the
  // format << < 1 2 3 4 5 > >>
  getPageNumberPicker (m_key) {
    let key = m_key.key;
    let _data = this.state.data;
    let temp = [];
    let pageNumberPicker = [];
    let numPageNumbers = Math.floor((_data.length - 1) / this.state.resultsPerPage) + 1;
    let startingPageNum = 1;
    let endingPageNum = numPageNumbers;

    console.log("Beach _data.length = " + _data.length);
    temp.push( <a href=" #" key={key++} onClick={() => this.setPageNum(1)}>&lt;&lt;</a> );
    temp.push( <a href=" #" key={key++} onClick={() => this.setPageNum(this.state.currentPage-1)}> &lt;</a> );

    // Limit visible page numbers to 15 on screen
    if (numPageNumbers > 15) {
      startingPageNum = this.state.currentPage - 7;
      endingPageNum = this.state.currentPage + 7;

      var adj = 0;
      if (startingPageNum < 1) {
        adj = 1 - startingPageNum;
      }
      else if (numPageNumbers < endingPageNum) {
        adj = numPageNumbers - endingPageNum;
      }
      startingPageNum += adj;
      endingPageNum += adj;
    }

    for (let i = startingPageNum; i <= endingPageNum; i++) {
      if (this.state.currentPage === i) {
        temp.push(
          <b key={key++}> {i}</b>
        )
      }
      else {
        temp.push(
          <a href=" #" key={key++} onClick={() => this.setPageNum(i)}> {i}</a>
        )
      }
    }
    temp.push( <a href=" #" key={key++} onClick={() => this.setPageNum(this.state.currentPage+1)}> &gt;</a> );
    temp.push( <a href=" #" key={key++} onClick={() => this.setPageNum(Math.floor((_data.length - 1) / this.state.resultsPerPage) + 1)}> &gt;&gt;</a> );

    // << < 1 2 3 4 5 > >>
    pageNumberPicker.push(
      <p key={key++}>{temp}</p>
    )

    m_key.key = key;
    return pageNumberPicker;
  }

  // Returns the HTML for the tag input fields in the 'tag' filter block.
  getTagInputBlock (m_key) {
    let key = m_key.key;
    let tagInputBlock = [];

    // Tag input fields
    for (let i = 0; i < this.state.numTagInputs; i++) {
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
        <div className="col-sm-3">
          <button onClick={this.removeTagInput} className="btn btn-light border-secondary">
            -
          </button>
        </div>
      </div>
    )

    m_key.key = key;
    return tagInputBlock;
  }

  render() {
    let displayBlock;
    let turtleRows = [];
    let tagInputBlock = [];
    let pageNumberPicker = [];

    let m_key = {key:0};

    if (this.state.isLoading) {
      displayBlock = (
        <div>
          <LoadingSpinner />
        </div>
      )
    }
    else {
      displayBlock = null;
      turtleRows = this.getTurtleRows(m_key);
      pageNumberPicker = this.getPageNumberPicker(m_key);
    }
    tagInputBlock = this.getTagInputBlock(m_key);

    let pageBody = (
      <>
        <h3>MTRG - Reports List for Beach</h3>
        <p>View list of database entries. Use filters to narrow down your search.</p>

        {/* FILTERS */}
        <div className="container-fluid">
          <form onSubmit={this.mySubmitHandler}>
            {/* Row 1 */}
            <div className="row pb-2 pt-2">

              {/* Tags filter */}
              <div className="col-sm-3 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <p className="mt-0 pt-1"><b>Tags</b></p>
                </div>
                <div className="pr-2 pl-2">
                  { tagInputBlock }
                </div>
              </div>

              {/* Species filter */}
              <div className="col-sm-3 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <p className="mt-0 pt-1"><b>Species</b></p>
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
              <div className="col-sm mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <p className="mt-0 pt-1"><b>Date</b></p>
                </div>

                <div className="pr-2 pl-2">
                  <div className="row pb-2 pt-1 pr-3">
                    <div className="col-sm-4">
                      Start date
                    </div>
                    <div className="col-sm-8">
                      <input className="form-control"
                        type="date"
                        name='encounter_date_start'
                        onChange={this.myChangeHandler} />
                    </div>
                  </div>
                  <div className="row pr-3">
                    <div className="col-sm-4">
                      End date
                    </div>
                    <div className="col-sm-8">
                      <input className="form-control"
                        type="date"
                        name='encounter_date_end'
                        onChange={this.myChangeHandler}/>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row pb-2 pt-2">

              {/* ID filter */}
              <div className="col-sm-6 mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <p className="mt-0 pt-1"><b>ID</b></p>
                </div>

                <div className="row pl-2">
                  <div className="col-sm-4 ml-1 mr-2 text-right">
                    <p>Turtle ID</p>
                  </div>
                  <div className="col-sm-7">
                    <input className="form-control"
                      type="text"
                      name='turtle_id'
                      onChange={this.myChangeHandler} />
                  </div>
                </div>
                <div className="row pl-2">
                  <div className="col-sm-4 ml-1 mr-2 text-right">
                    <p>Encounter ID</p>
                  </div>
                  <div className="col-sm-7">
                    <input className="form-control"
                      type="text"
                      name='encounter_id'
                      onChange={this.myChangeHandler} />
                  </div>
                </div>
                <div className="row pl-2">
                  <div className="col-sm-4 ml-1 mr-2 text-right">
                    <p>Metadata ID</p>
                  </div>
                  <div className="col-sm-7">
                    <input className="form-control"
                      type="text"
                      name='metadata_id'
                      onChange={this.myChangeHandler} />
                  </div>
                </div>
              </div>

              {/* People filter */}
              <div className="col-sm mr-1 ml-1 border pr-0 pl-0">
                <div className="filter-section-title">
                  <p className="mt-0 pt-1"><b>People</b></p>
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
               type="reset"
               className="btn btn-light filter-update-btn m-1 border-secondary"
               onClick={this.clearForm} >
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
            </tr>
          </thead>
          <tbody>
            { turtleRows }
          </tbody>
        </table>

        { pageNumberPicker }
        { displayBlock }
      </>
    );

    return(
      <>
        { pageBody }
      </>
    )
  }
}

export default ReportsListBeach;
