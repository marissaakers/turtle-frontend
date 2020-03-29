import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";


const metadata_investigators = 'MTRG - Lagoon Metadata'


class LagoonMetadata extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      error: false,
      redirect:false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderRedirect = () => {
   if (this.state.redirect) {
     return <Redirect to='/new-report/lagoon' />
   }
 }


  handleSubmit = async(e) => {
     e.preventDefault();


     const data = {

       metadata_date: this.state.metadata_date,
       metadata_location: this.state.metadata_location,
       metadata_investigators: this.state.metadata_investigators,
       number_of_cc_captured: parseFloat(this.state.number_of_cc_captured),
       number_of_cm_captured: parseFloat(this.state.number_of_cm_captured),
       number_of_other_captured: parseFloat(this.state.number_of_other_captured),

       nets: [{
         net_deploy_start_time: this.state.net_deploy_start_time,
         net_deploy_end_time: this.state.net_deploy_end_time,
         net_retrieval_start_time: this.state.net_retrieval_start_time,
         net_retrieval_end_time: this.state.net_deploy_end_time,
         loggerhead_captures:  null,
         green_captures: null,
         entered_by: null,
         green_cpue: null,
         loggerhead_cpue: null,
         net_kilometers: null,
         net_km_hours: null,
         net_type: null,
         soak_time: null
       }],

       incidental_captures: [{
        species: this.state.species,
   		  capture_time: this.state.capture_time,
   		  measurement: this.state.measurement,
   		  notes: this.state.notes
       }],

       water_sample: parseFloat(this.state.water_sample),
       wind_dir: this.state.wind_dir,
       environment_time:  this.state.environment_time,
       weather: this.state.weather,
       air_temp: parseFloat(this.state.air_temp),
       water_temp_surface: parseFloat(this.state.water_temp_surface),
       water_temp_1_m: parseFloat(this.state.water_temp_1_m),
       water_temp_2_m: parseFloat(this.state.water_temp_2_m),
       water_temp_6_m: null,
       water_temp_bottom: parseFloat(this.state.water_temp_bottom),
       salinity_surface: parseFloat(this.state.salinity_surface),
       salinity_1_m: parseFloat(this.state.salinity_1_m),
       salinity_2_m: parseFloat(this.state.salinity_2_m),
       salinity_6_m: null,
       salinity_bottom: parseFloat(this.state.salinity_bottom)

     };



     axios.post('https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/lagoon/metadata/insert',
       data, { headers: {'Content-Type': 'application/json'} })
         .then(res => {
           console.log(data)
           console.log("Successfully posted!")
           this.setState({redirect:true})
         })
         .catch(error => {
           console.log(error.response)
           console.log("Error.")
         });
  }
  render() {

    return(
      <>
        <Helmet>
          <metadata_investigators>{ metadata_investigators }</metadata_investigators>
        </Helmet>
        <InternalNavbar />

        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>
        <p align="right" className="pr-5"><a href="/new-report/lagoon">see lagoon sheet →</a></p>


          <h1><b>LAGOON METADATA SHEET</b></h1>

          <div className="container-fluid">
          <form onSubmit={this.handleSubmit}>


          <div className="justify-content-center row pb-2 pt-2">
          <div className="col-sm-10 mr-2 ml-2 border pr-3 pl-3 pb-3 pt-3">

          <div className="row text-left">
            <div className="col-sm-5">

            <div className="form-group row">
              <label htmlFor="date" className="col-4 col-form-label">Date</label>
              <div className="col-6">
                <input className="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="location" className="col-4 col-form-label">Location</label>
              <div className="col-6">
                <input className="form-control" type="text" name= "metadata_location" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="investigators" className="col-4 col-form-label">Investigators</label>
              <div className="col-6">
                <input className="form-control" type="text" name= "metadata_investigators" onChange={e => this.onChange(e)} />
              </div>
            </div>


            <h5><b>Turtle Capture Data: </b></h5>

            <div class="container border pt-3 mb-3">

              <div className="form-group row">
                <label htmlFor="cc-number" className="col-4 col-form-label">Cc:</label>
                <div className="col-6">
                  <input className="form-control" type="text" name="number_of_cc_captured" onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="cm-number" className="col-4 col-form-label">Cm:</label>
                <div className="col-6">
                  <input className="form-control" type="text" name= "number_of_cm_captured" onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="other-number" className="col-4 col-form-label">Other:</label>
                <div className="col-6">
                  <input className="form-control" type="text" name= "number_of_other_captured" onChange={e => this.onChange(e)} />
                </div>
              </div>

            </div>

            <h5><b>Net Set Data: </b></h5>

            <div class="container border pt-3 mb-3">

            <h5><b>Net Deploy: </b></h5>
            <div className="form-group row">
              <label htmlFor="net-start" className="col-4 col-form-label">Start:</label>
              <div className="col-6">
              <input className="form-control" type="time" name="net_deploy_start_time" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="net-end" className="col-4 col-form-label">End:</label>
              <div className="col-6">
              <input className="form-control" type="time" name="net_deploy_end_time"  id="example-time-input" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <h5><b>Net Retreival: </b></h5>

            <div className="form-group row">
              <label htmlFor="net-start" className="col-4 col-form-label">Start:</label>
              <div className="col-6">
              <input className="form-control" type="time" name="net_retrieval_start_time" id="example-time-input" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="net-end" className="col-4 col-form-label">End:</label>
              <div className="col-6">
              <input className="form-control" type="time" name="net_retrieval_end_time" id="example-time-input" onChange={e => this.onChange(e)} />
              </div>
            </div>
</div>
            </div>
            <div className="col-sm-7">

            <h5><b>Environmental Data: </b></h5>

            <div class="container border pt-3 mb-3">

                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="water-sample">Water Sample:</label>
                          <select className="form-control" name="water_sample" onChange={e => this.onChange(e)}>
                          <option value="1">Yes</option>
                          <option value="0">No</option>
                          </select>
                      </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="wind-spd">Wind Spd:</label>
                      <input className="form-control" type="text" name="wind_speed" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-2">
                      <label htmlFor="wind-dir">Wind Dir:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="environment_time">Time:</label>
                      <input className="form-control" type="time" name="environment_time" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>



                  <div className="form-row">
                    <div className="form-group col-md-4">
                      <label htmlFor="weather">Weather:</label>
                      <select className="form-control" name="weather" onChange={e => this.onChange(e)}>
                        <option value="Sunny">Sunny</option>
                        <option value="Partly Cloudy">Partly Cloudy</option>
                        <option value="Overcast">Overcast</option>
                        <option value="Rain">Rain</option>
                      </select>
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="other-weather">Other:</label>
                      <input className="form-control" type="text" name="weather" onChange={e => this.onChange(e)} />
                      </div>
                  </div>



              <div className="form-group row">
                    <label htmlFor="air-temp" className="col-2 col-form-label">Air Temp:</label>
                    <div className="col-3">
                        <input className="form-control" type="text" name="air_temp" onChange={e => this.onChange(e)} />
                    </div>
              </div>




                <div className="row">
                  <div className="col">

                      <h5><b>Water Temp: </b></h5>

                      <div className="form-group row">
                        <label htmlFor="surface-temp" className="col-4 col-form-label">Surface:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="water_temp_surface" onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="1m-temp" className="col-4 col-form-label">1m:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="water_temp_1_m" onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="2m-temp" className="col-4 col-form-label">2m:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="water_temp_2_m" onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="bottom-temp" className="col-4 col-form-label">Bottom:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="water_temp_bottom" onChange={e => this.onChange(e)} />
                        </div>
                      </div>


                  </div>
                  <div className="col">
                    <h5><b>Salinity: </b></h5>
                    <div className="form-group row">
                      <label htmlFor="surface-salinity" className="col-4 col-form-label">Surface:</label>
                      <div className="col-6">
                        <input className="form-control" type="text" name="salinity_surface" onChange={e => this.onChange(e)} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="1m-salinity" className="col-4 col-form-label">1m:</label>
                      <div className="col-6">
                        <input className="form-control" type="text" name="salinity_1_m" onChange={e => this.onChange(e)} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="2m-salinity" className="col-4 col-form-label">2m:</label>
                      <div className="col-6">
                        <input className="form-control" type="text" name="salinity_2_m" onChange={e => this.onChange(e)} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="bottom-salinity" className="col-4 col-form-label">Bottom:</label>
                      <div className="col-6">
                        <input className="form-control" type="text" name="salinity_bottom" onChange={e => this.onChange(e)} />
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              <h5><b>Incidental Capture Data: </b></h5>

              <div class="container border pt-3 mb-3">

              <div className="form-group row">
                <label htmlFor="incidental-species" className="col-4 col-form-label">Species:</label>
                <div className="col-6">
                  <input className="form-control" type="text" name="species" onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="incidental-time" className="col-4 col-form-label">Time:</label>
                <div className="col-6">
                <input className="form-control" type="time" name="capture_time" onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="incidental-measurement" className="col-4 col-form-label">Measurement:</label>
                <div className="col-6">
                  <input className="form-control" type="text" name="measurement" onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="incidental-notes" className="col-4 col-form-label">Notes:</label>
                <div className="col-6">
                  <input className="form-control" type="text" name="notes" onChange={e => this.onChange(e)} />
                </div>
              </div>
              </div>

              </div>
          </div>
        </div>
      </div>

      {this.renderRedirect()}
      <button type="submit" className="btn btn-primary">SUBMIT</button>

      </form>

        </div>

        <InternalFooter />
      </>
    );
  }
}



export default LagoonMetadata;
