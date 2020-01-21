import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";

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
    console.log(this.state.data)
  }

  render() {
    let displayBlock;

    if (this.state.isLoading) {
      displayBlock = (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    else {
      displayBlock = (
        <div>
          { this.state.data.encounter.type }
        </div>
      )
    }

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <h3>MTRG - Reports List</h3>
        <p>Here we will have a table of the reports in the database.</p>

        {displayBlock}
      </>
    )
  }
}

export default ReportsList;
