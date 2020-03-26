import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";


const metadata_investigators = 'MTRG - Beach Data'


class Beach extends Component {

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


      <h1><b>BEACH DATA SHEET</b></h1>

      <div class="container-fluid">
      <form action="" onSubmit={this.handleSubmit}>

      <div className="justify-content-center row pb-2 pt-2">
      <div className="col-sm-10 mr-2 ml-2 border pr-2 pl-2 pb-3 pt-3">



      <div class="container-fluid text-left">
        <div class="row">
          <div class="col-sm-6">

          <div class="row">
          <div class="col-sm-6">

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">45 days:</label>
            <div class="col-6">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">70 days:</label>
            <div class="col-6">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Stake #:</label>
            <div class="col-6">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Species:</label>
            <div class="col-6">
            <select class="form-control" id="exampleFormControlSelect1">
               <option>Cc</option>
               <option>Cm</option>
               <option>Dm</option>
             </select>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Capture Type:</label>
            <div class="col-6">
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>New</option>
                    <option>Old</option>
                    <option>Strange Recap</option>
                </select>
              </div>
            </div>



          <div class="form-group row">
            <label for="example-date-input" class="col-4 col-form-label">Date:</label>
            <div class="col-6">
              <input class="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Time:</label>
            <div class="col-6">
            <input class="form-control" type="time"   id="example-time-input"/>
            </div>
          </div>


          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Activity:</label>
            <div class="col-6">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Location:</label>
            <div class="col-6">
              <input class="form-control" type="text" name= "metadata_location" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Lat N:</label>
            <div class="col-6">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Long W:</label>
            <div class="col-6">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>



          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Investigators:</label>
            <div class="col-6">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>


          </div>
          <div class="col-sm-6">

          <h5><b>Tag Information: </b></h5>
          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Prime Tag:</label>
            <div class="col-6">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Tag Scar:</label>
            <div class="col-6">
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>LF</option>
                    <option>RF</option>
                    <option>NONE</option>
                </select>
              </div>
            </div>

        <div class="form-group row">
              <label for="example-text-input" class="col-4 col-form-label">Tag #: LF/LR</label>
              <div class="col-6">
                    <input class="form-control" type="text" id="example-text-input"/>
              </div>
        </div>

          <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Tag #: RF/RR</label>
                <div class="col-6">
                    <input class="form-control" type="text" id="example-text-input"/>
                </div>
          </div>


          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Pit Tag: Scanned:</label>
            <div class="col-6">
            <select class="form-control" id="exampleFormControlSelect1">
               <option>Yes</option>
               <option>No</option>
             </select>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Pit Tag:</label>
            <div class="col-6">
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>New</option>
                    <option>Old</option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label for="example-date-input" class="col-4 col-form-label">Scanner #:</label>
              <div class="col-6">
                <input class="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div class="form-group row">
              <label for="example-text-input" class="col-4 col-form-label">Pit Tag: Location:</label>
              <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                      <option>RR</option>
                      <option>RF</option>
                  </select>
                </div>
              </div>
            </div>
            </div>


          <h5><b>Morphometrics: </b></h5>

          <form>
            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="curved-length">Curved Length (notch-tip):</label>
                <input class="form-control" type="text" id="example-text-input"/>
              </div>
              <div class="form-group col-md-5">
                <label for="curved-width">Curved Width (widest):</label>
                <input class="form-control" type="text" id="example-text-input"/>
              </div>
              <div class="form-group col-md-5">
                <label for="straight-length">Straight Length (notch-tip):</label>
                <input class="form-control" type="text" id="example-text-input"/>
              </div>
              <div class="form-group col-md-5">
                <label for="straight-width">Straight Width (widest):</label>
                <input type="form-control" class="form-control" placeholder="in cm"/>
              </div>
              <div class="form-group col-md-5">
                <label for="min-length">Minimum Length (notch-notch):</label>
                <input type="form-control" class="form-control" placeholder="in cm"/>
              </div>
              <div class="form-group col-md-5">
                <label for="tail-length">Tail Length: PL-vent</label>
                <input type="form-control" class="form-control" placeholder="in cm"/>
              </div>
              <div class="form-group col-md-5">
                <label for="plastron-length">Plastron Length (tape):</label>
                <input type="form-control" class="form-control" placeholder="in cm"/>
              </div>
              <div class="form-group col-md-5">
                <label for="pl-tip">PL-Tip:</label>
                <input type="form-control" class="form-control" placeholder="in cm"/>
              </div>
              <div class="form-group col-md-5">
                <label for="weight">Weight in kg: *tare scale</label>
                <input type="form-control" class="form-control" placeholder="in kg"/>
              </div>
              <div class="form-group col-md-5">
                <label for="head-width">Head Width (straight):</label>
                <input type="form-control" class="form-control"/>
              </div>
              <div class="form-group col-md-5">

              </div>
            </div>
          </form>

          <h5><b>For DC only: </b></h5>
            <form>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="inputEmail4">Outgoing crawl width:</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
                </div>

                <div class="form-group col-md-3">
                  <label for="inputPassword4">Yolkless Collected?</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
                </div>

                <div class="form-group col-md-3">
                  <label for="inputPassword4">Pink Spot Photo?</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
                </div>

                <div class="form-group col-md-3">
                  <label for="inputPassword4">Photo Taken By:</label>
                  <input type="password" class="form-control" id="inputPassword4" />

                </div>

              </div>
            </form>

          </div>
          <div class="col-sm-6 pl-5">


          <h5>Samples:</h5>
          <form>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Skin:</label>
              <div class="col-3">
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
              </div>
              <div class="col-4">
                <input type="text" class="form-control" placeholder="For"/>
              </div>
            </div>
          </form>

          <form>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Skin 2:</label>
              <div class="col-3">
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
              </div>
              <div class="col-4">
                <input type="text" class="form-control" placeholder="For"/>
              </div>
            </div>
          </form>

          <form>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label">Other:</label>
              <div class="col-3">
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
              </div>
              <div class="col-4">
                <input type="text" class="form-control" placeholder="For"/>
              </div>
            </div>
          </form>


          <h5>Flipper Damage:</h5>
          <div class="col-sm-15">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <h5>Shell Damage:</h5>
          <div class="col-sm-15">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>


          <br></br>
          <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label">Paps:</label>
            <div class="col-6">
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>seen</option>
                    <option>not seen</option>
                </select>
              </div>
            </div>


          <h5><b>Clutch Data: </b></h5>

          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">Clutch Deposited:</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                    <option>Yes</option>
                    <option>No</option>
                    </select>
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Sand Type:</label>
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Natural</option>
                  <option>Artificial</option>
                  </select>
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Placement:</label>
                <input type="password" class="form-control" id="inputPassword4" />
              </div>
            </div>
          </form>



          <h5><b>Nest Marking: </b></h5>
          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">HIDDEN STAKE:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Planted In:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">DIST TO DUNE:</label>
                <input type="password" class="form-control" id="inputPassword4" />
              </div>
            </div>
          </form>

          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">OBVIOUS STAKE:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Planted In:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">DIST TO HIGH TIDE:</label>
                <input type="password" class="form-control" id="inputPassword4" />
              </div>
            </div>
          </form>

          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">CAN BURIED:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">SIGN STAKE IN PLACE:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Turtle found scarp >=46cm:</label>
                <input type="password" class="form-control" id="inputPassword4" />
              </div>
            </div>
          </form>

          <form>
            <div class="form-row">
              <div class="form-group col-md-5">
                <label for="inputEmail4">Is the nest seaward of man-made structure?:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                <option>Yes</option>
                <option>No</option>
                </select>
              </div>
              <div class="form-group col-md-5">
                <label for="inputPassword4">If Yes, is it within 1m of the structure?:</label>
                <select class="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option>Yes</option>
                <option>No</option>
                </select>
              </div>
            </div>
          </form>


            <h4>Describe Structure:</h4>
              <div class="col-sm-15">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>


            <h4>Site Description:</h4>
              <div class="col-sm-15">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>


            <h4>Notes:</h4>
              <div class="col-sm-15">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>



          </div>
        </div>
        </div>
        </div>

      </div>

      <button type="submit" class="btn btn-primary">SUBMIT</button>

      </form>

        </div>

        <InternalFooter />
      </>
    );
  }
}



export default Beach;
