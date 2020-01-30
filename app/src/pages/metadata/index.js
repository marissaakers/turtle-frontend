import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import turtleimg from '../images/lagoonturtle.png';
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";


const metadata_investigators = 'MTRG - Lagoon Metadata'

console.log(turtleimg);

class LagoonMetadata extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      error: false,

    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  componentDidMount() {
     axios.get('https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon')
       .then(res => {
         const data = res.data.data; // get the data array instead of object
         this.setState({ data, loading: false });
       })
       .catch(err => { // log request error and prevent access to undefined state
         this.setState({ loading: false, error: true });
         console.error(err);
       })
   }
   handleSubmit(e) {
     e.preventDefault();

     const data = {
       metadata_date: this.state.metadata_date ? this.state.metadata_date : this.state.data[0].metadata_date,
       metadata_location: this.state.metadata_location ? this.state.metadata_location : this.state.data[0].metadata_location,
       metadata_investigators: this.state.metadata_investigators ? this.state.metadata_investigators : this.state.data[0].metadata_investigators,
       number_of_cc_captured: this.state.number_of_cc_captured ? this.state.number_of_cc_captured : this.state.data[0].number_of_cc_captured,
       number_of_cm_captured: this.state.number_of_cm_captured ? this.state.number_of_cm_captured : this.state.data[0].number_of_cm_captured,
       number_of_other_captured: this.state.number_of_other_captured ? this.state.number_of_other_captured : this.state.data[0].number_of_other_captured,
       net_deploy_start_time: this.state.net_deploy_start_time ? this.state.net_deploy_start_time : this.state.data[0].net_deploy_start_time,
       net_deploy_end_time: this.state.net_deploy_end_time ? this.state.net_deploy_end_time : this.state.data[0].net_deploy_end_time,
       net_retrieval_start_time: this.state.net_retrieval_start_time ? this.state.net_retrieval_start_time : this.state.data[0].net_retrieval_start_time,
       net_retrieval_end_time: this.state.net_retrieval_end_time ? this.state.net_retrieval_end_time : this.state.data[0].net_retrieval_end_time,




       introText: this.state.introText ? this.state.introText : this.state.data[0].introText
     };


    axios.post('http://localhost:5555/data', { data })
      .then(res => {
        console.log(data);
        console.log(this.state.data[0]);
      })
  }
  render() {

    return(
      <>
        <Helmet>
          <metadata_investigators>{ metadata_investigators }</metadata_investigators>
        </Helmet>
        <InternalNavbar />


          <h1><b>LAGOON METADATA SHEET</b></h1><br></br><br></br>

  <div class="container text-left">
  <form action="" onSubmit={this.handleSubmit}>


          <div class="form-group row">
            <label for="example-date-input" class="col-2 col-form-label">Date</label>
            <div class="col-8">
              <input class="form-control" type="date" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Location</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Investigators</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <h5><b>Turtle Capture Data: </b></h5>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Cc:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Cm:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Other:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>
           <br></br>

          <h5><b>Net Set Data: </b></h5>

          <h7><b>Net Deploy: </b></h7>
          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Start:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">End:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <h7><b>Net Retreival: </b></h7>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Start:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">End:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>



          <h5><b>Environmental Data: </b></h5>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Water Sample:</label>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
            <label class="form-check-label" for="inlineRadio1">Yes</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
            <label class="form-check-label" for="inlineRadio2">No</label>
          </div>
          </div>


          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Wind Spd/Dir:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Time:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Weather:</label>

          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1"/>
            <label class="form-check-label" for="inlineRadio1">Sunny</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2"/>
            <label class="form-check-label" for="inlineRadio2">Partly Cloudy</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3"/>
            <label class="form-check-label" for="inlineRadio3">Overcast</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio4" value="option4"/>
            <label class="form-check-label" for="inlineRadio3">Rain</label>
          </div>
        </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Air Temp:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <h7><b>Water Temp: </b></h7>
          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Surface:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">1m:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">2m:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Bottom:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <h7><b>Salinity: </b></h7>
          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Surface:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">1m:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">2m:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Bottom:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>


          <h5><b>Incidental Capture Data: </b></h5>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Species:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Time:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Measurement:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Notes:</label>
            <div class="col-8">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>
          <button type="button" class="btn btn-primary">SUBMIT</button>

      </form>

        </div>

        <InternalFooter />
      </>
    );
  }
}



export default LagoonMetadata;
