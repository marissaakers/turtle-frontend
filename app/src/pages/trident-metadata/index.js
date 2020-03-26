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

class TridentMetadata extends Component {

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
         this.setState({ data});
       })
       .catch(err => { // log request error and prevent access to undefined state
         this.setState({ isLoading: false});
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
       water_sample: this.state.water_sample ? this.state.water_sample : this.state.data[0].water_sample,
       wind_dir: this.state.wind_dir ? this.state.wind_dir : this.state.data[0].wind_dir,
       environment_time: this.state.environment_time ? this.state.environment_time : this.state.data[0].environment_time,
       weather: this.state.weather ? this.state.weather : this.state.data[0].weather,
       air_temp: this.state.air_temp ? this.state.air_temp : this.state.data[0].air_temp,
       water_temp_surface: this.state.water_temp_surface ? this.state.water_temp_surface : this.state.data[0].water_temp_surface,
       water_temp_1_m: this.state.water_temp_1_m ? this.state.water_temp_1_m : this.state.data[0].water_temp_1_m,
       water_temp_2_m: this.state.water_temp_2_m ? this.state.water_temp_2_m : this.state.data[0].water_temp_2_m,
       water_temp_bottom: this.state.water_temp_bottom ? this.state.water_temp_bottom : this.state.data[0].water_temp_bottom,
       salinity_surface: this.state.salinity_surface ? this.state.salinity_surface : this.state.data[0].salinity_surface,
       salinity_1_m: this.state.salinity_1_m ? this.state.salinity_1_m : this.state.data[0].salinity_1_m,
       salinity_2_m: this.state.salinity_2_m ? this.state.salinity_2_m : this.state.data[0].salinity_2_m,
       salinity_bottom: this.state.salinity_bottom ? this.state.salinity_bottom : this.state.data[0].salinity_bottom,
       species: this.state.species ? this.state.species : this.state.data[0].species,
       capture_time: this.state.capture_time ? this.state.capture_time : this.state.data[0].capture_time,
       measurement: this.state.measurement ? this.state.measurement : this.state.data[0].measurement,
       notes: this.state.notes ? this.state.notes : this.state.data[0].notes,

       blank: this.state.blank ? this.state.blank : this.state.data[0].blank
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

        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>


      <h2><b>TRIDENT BASIN METADATA SHEET</b></h2><br></br>

      <form action="" onSubmit={this.handleSubmit}>

      <div class="container-fluid text-left">

      <div className="justify-content-center row pb-2 pt-2">
      <div className="col-sm-10 mr-2 ml-2 border pr-3 pl-3 pb-3 pt-3">

        <div class="row no-gutters">
          <div class="col-sm-3 pr-0 pl-0">

            <div class="form-group row">
              <label for="example-date-input" class="col-4 col-form-label">Date</label>
              <div class="col-7">
                <input class="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div class="form-group row">
              <label for="example-text-input" class="col-4 col-form-label">Location</label>
              <div class="col-7">
                <input class="form-control" type="text" name= "metadata_location" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div class="form-group row">
              <label for="example-text-input" class="col-4 col-form-label">Investigators</label>
              <div class="col-7">
                <input class="form-control" type="text" name= "metadata_investigators" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <h5><b>Turtle Capture Data: </b></h5>

            <div class="container border pt-3 mb-3">
                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Cc:</label>
                  <div class="col-7">
                    <input class="form-control" type="text" name= "number_of_cc_captured" onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Cm:</label>
                  <div class="col-7">
                    <input class="form-control" type="text" name= "number_of_cm_captured" onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Other:</label>
                  <div class="col-7">
                    <input class="form-control" type="text" name= "number_of_other_captured" onChange={e => this.onChange(e)} />
                  </div>
                </div>
            </div>

                <h5><b>Net Set Data: </b></h5>

                <div class="container border pt-2">

                    <h7><b>Net Deploy #1: </b></h7>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <h7><b>Net Retreival #1: </b></h7>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>
                </div>

                <div class="container border pt-2 mt-3">

                    <h7><b>Net Deploy #2: </b></h7>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <h7><b>Net Retreival #2: </b></h7>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>
                </div>

                </div>

                <div class="col-sm-4 pl-5 pr-5">

                <div class="container border pt-3 mb-3">
                    <h7><b>Net Deploy #3: </b></h7>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <h7><b>Net Retreival #3: </b></h7>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>

                      </div>
                    </div>
              </div>

              <div class="container border pt-3 mb-3">

                    <h7><b>Net Deploy #4: </b></h7>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <h7><b>Net Retreival #4: </b></h7>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>

                      </div>
                    </div>
                  </div>

              <div class="container border pt-3">

                    <h7><b>Net Deploy #5: </b></h7>
                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <h7><b>Net Retreival #5: </b></h7>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Start:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">End:</label>
                      <div class="col-7">
                        <input class="form-control" type="time"   id="example-time-input"/>

                      </div>
                    </div>
                  </div>

              </div>
              <div class="col-sm-5 pr-0 pl-0">

              <h5><b>Environmental Data: </b></h5>

                  <form>
                  <div class="container border pt-3">
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="inputEmail4">Water Sample:</label>
                            <select class="form-control" id="exampleFormControlSelect1" name="water_sample" onChange={e => this.onChange(e)}>
                            <option>Yes</option>
                            <option>No</option>
                            </select>
                        </div>
                      <div class="form-group col-md-4">
                        <label for="inputPassword4">Wind Spd/Dir:</label>
                        <input class="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                        </div>
                      <div class="form-group col-md-4">
                        <label for="inputPassword4">Time:</label>
                        <input class="form-control" type="time" name="environment_time" onChange={e => this.onChange(e)}/>
                      </div>
                    </div>

                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="inputEmail4">Weather:</label>
                        <select class="form-control" name="weather" onChange={e => this.onChange(e)}>
                          <option>Sunny</option>
                          <option>Partly Cloudy</option>
                          <option>Overcast</option>
                          <option>Rain</option>
                        </select>
                        </div>
                      <div class="form-group col-md-4">
                        <label for="inputPassword4">Other:</label>
                        <input class="form-control" type="text" name="weather" onChange={e => this.onChange(e)} />
                        </div>
                    </div>


                <div class="form-group row">
                      <label for="example-text-input" class="col-3 col-form-label">Air Temp:</label>
                      <div class="col-4">
                          <input class="form-control" type="text" name="air_temp" onChange={e => this.onChange(e)} />
                      </div>
                </div>

                  <div class="row">
                    <div class="col pr-0">

                        <h7><b>Water Temp: </b></h7>

                        <div class="form-group row">
                          <label for="example-text-input" class="col-4 col-form-label">Surface:</label>
                          <div class="col-7">
                            <input class="form-control" type="text" name="water_temp_surface" onChange={e => this.onChange(e)} />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label for="example-text-input" class="col-4 col-form-label">1m:</label>
                          <div class="col-7">
                            <input class="form-control" type="text" name="water_temp_1_m" onChange={e => this.onChange(e)} />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label for="example-text-input" class="col-4 col-form-label">2m:</label>
                          <div class="col-7">
                            <input class="form-control" type="text" name="water_temp_2_m" onChange={e => this.onChange(e)} />
                          </div>
                        </div>

                        <div class="form-group row">
                          <label for="example-text-input" class="col-4 col-form-label">Bottom:</label>
                          <div class="col-7">
                            <input class="form-control" type="text" name="water_temp_bottom" onChange={e => this.onChange(e)} />
                          </div>
                        </div>


                    </div>
                    <div class="col">

                      <h7><b>Salinity: </b></h7>
                      <div class="form-group row">
                        <label for="example-text-input" class="col-4 col-form-label">Surface:</label>
                        <div class="col-7">
                          <input class="form-control" type="text" name="salinity_surface" onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="example-text-input" class="col-4 col-form-label">1m:</label>
                        <div class="col-7">
                          <input class="form-control" type="text" name="salinity_1_m" onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="example-text-input" class="col-4 col-form-label">2m:</label>
                        <div class="col-7">
                          <input class="form-control" type="text" name="salinity_2_m" onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="example-text-input" class="col-4 col-form-label">Bottom:</label>
                        <div class="col-7">
                          <input class="form-control" type="text" name="salinity_bottom" onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                    </div>
                  </div>
                  </div>
                </form>


                <br></br>

                <h5><b>Incidental Capture Data: </b></h5>

                <div class="container border pt-3">
                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Species:</label>
                    <div class="col-6">
                      <input class="form-control" type="text" name="species" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Time:</label>
                    <div class="col-6">
                    <input class="form-control" type="time" name="capture_time" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Measurement:</label>
                    <div class="col-6">
                      <input class="form-control" type="text" name="measurement" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Notes:</label>
                    <div class="col-6">
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>
      </div>
          <button type="submit" class="btn btn-primary">SUBMIT</button>

      </form>


        <InternalFooter />
      </>
    );
  }
}



export default TridentMetadata;
