import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {Link} from 'react-router-dom';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';

const TITLE = 'MTRG - Reports list'

class ReportsList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {}
    }
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    const data = await axios.get('https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon');
    this.setState(data);
    this.setState({isLoading: false});
    console.log(this.state.data);
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
              <td>
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
            <tr>
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
