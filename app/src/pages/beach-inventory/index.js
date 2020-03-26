import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";


const metadata_investigators = 'MTRG - Beach Inventory Data'


class BeachInventory extends Component {

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
            <label for="example-text-input" class="col-5 col-form-label">Stake #:</label>
            <div class="col-7">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-5 col-form-label">Species:</label>
            <div class="col-7">
            <select class="form-control" id="exampleFormControlSelect1">
               <option>Cc</option>
               <option>Cm</option>
               <option>Dm</option>
             </select>
            </div>
          </div>


          <div class="form-group row">
            <label for="example-date-input" class="col-5 col-form-label">Emergence Date:</label>
            <div class="col-7 mb-0">
              <input class="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-date-input" class="col-5 col-form-label">Inventory Date:</label>
            <div class="col-7">
              <input class="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-5 col-form-label">Stakes in place?:</label>
            <div class="col-7">
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>HID</option>
                    <option>OBV</option>
                </select>
              </div>
            </div>



          <div class="form-group row">
            <label for="example-text-input" class="col-5 col-form-label">Hatched:</label>
            <div class="col-7">
              <input class="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <p><h5><b>HATCHLINGS:</b></h5></p>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="curved-length">Live:</label>
              <input class="form-control" type="text" id="example-text-input"/>
            </div>
            <div class="form-group col-md-6">
              <label for="curved-width">Dead:</label>
              <input class="form-control" type="text" id="example-text-input"/>
            </div>
            <div class="form-group col-md-12">
              <label for="curved-width">Hatchlings Emerged:</label>
              <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>



          <p><h5><b>PIPPED:</b></h5></p>
          <div class="form-row">
            <div class="form-group col-md-5">
              <label for="curved-length">Pipped Live:</label>
              <input class="form-control" type="text" id="example-text-input"/>
            </div>
            <div class="form-group col-md-5">
              <label for="curved-width">Pipped Dead:</label>
              <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>


          </div>
          <div class="col-sm-6">

          <div class="form-group row">
            <label for="example-text-input" class="col-5 col-form-label">Inventoried by:</label>
            <div class="col-6">
            <input class="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div class="form-group row">
            <label for="example-text-input" class="col-5 col-form-label">Emergence:</label>
            <div class="col-6">
                <select class="form-control" id="exampleFormControlSelect1">
                    <option>Yes</option>
                    <option>No</option>
                </select>
              </div>
            </div>

            <div class="form-group row">
              <label for="example-text-input" class="col-5 col-form-label">Can(s) in place:</label>
              <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                      <option>S</option>
                      <option>N</option>
                  </select>
                </div>
              </div>

            <div class="form-group row">
              <label for="example-text-input" class="col-5 col-form-label">Predated:</label>
              <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                      <option>Yes</option>
                      <option>No</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-5 col-form-label">Post Hatch:</label>
                <div class="col-6">
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-5 col-form-label">Washed over:</label>
                  <div class="col-6">
                      <select class="form-control" id="exampleFormControlSelect1">
                          <option>Yes</option>
                          <option>No</option>
                      </select>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-5 col-form-label">Inundated:</label>
                    <div class="col-6">
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                      </div>
                    </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-5 col-form-label">Washed out:</label>
                    <div class="col-6">
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Complete</option>
                            <option>Partial</option>
                            <option>No</option>
                        </select>
                      </div>
                    </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-5 col-form-label">Washed out post hatch:</label>
                    <div class="col-6">
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                      </div>
                    </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-5 col-form-label">Poached:</label>
                    <div class="col-6">
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>Yes</option>
                            <option>No</option>
                        </select>
                      </div>
                    </div>
                </div>
            </div>

            <h5><b>WHOLE EGGS:</b></h5>

            <form>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputEmail4">Addled:</label>
                  <input type="password" class="form-control" id="inputPassword4" />

                  </div>
                <div class="form-group col-md-4">
                  <label for="inputPassword4">Undeveloped:</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                  </div>
                <div class="form-group col-md-4">
                  <label for="inputPassword4">Sampled for SAC:</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputEmail4">1/4 Embryo:</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                  </div>
                <div class="form-group col-md-4">
                  <label for="inputPassword4">1/2 Embryo:</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                  </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="inputEmail4">3/4 Embryo:</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                  </div>
                <div class="form-group col-md-4">
                  <label for="inputPassword4">Full Embryo:</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                  </div>
              </div>
            </form>


          </div>
          <div class="col-sm-6">

          <h5><b>DAMAGED EGGS:</b></h5>

          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">Raccoons:</label>
                <input type="password" class="form-control" id="inputPassword4" />

                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Ghost crabs:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Plant roots*:</label>
                <input type="password" class="form-control" id="inputPassword4" />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">Another turtle:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Bobcat:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Other:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
            </div>
            <div class="form-row">
              <label for="form-check-label">*check those involved: </label>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option1"/>
              <label class="form-check-label" for="inlineCheckbox1">sea oats</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
              <label class="form-check-label" for="inlineCheckbox2">sea purslane</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
              <label class="form-check-label" for="inlineCheckbox2">railroad vine</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
              <label class="form-check-label" for="inlineCheckbox2">beach sunflower</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option2"/>
              <label class="form-check-label" for="inlineCheckbox2">seagrape</label>
            </div>
            </div>
          </form>


          <h5><b>OTHER:</b></h5>

          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">Broken:</label>
                <input type="password" class="form-control" id="inputPassword4" />

                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Washout:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">**Other:</label>
                <input type="password" class="form-control" id="inputPassword4" />
              </div>
            </div>
            <h5>** Specify other details:</h5>
            <div class="col-sm-15 mb-3">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
          </form>

          <h5><b>YOLKLESS: (not included in clutch total)</b></h5>
          <form>
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">Hydrated:</label>
                <input type="password" class="form-control" id="inputPassword4" />

                </div>
              <div class="form-group col-md-4">
                <label for="inputPassword4">Dehydrated:</label>
                <input type="password" class="form-control" id="inputPassword4" />
                </div>
            </div>
          </form>

          <form>
            <div class="form-group row">
            <label for="example-text-input" class="col-4 col-form-label"><h5>Inventoried clutch total:</h5></label>
              <div class="col-5">
                <input type="text" class="form-control"/>
              </div>
              <label for="example-text-input" class="ml-3">(=Hatched + Pipped + Whole eggs + Damaged eggs + Other)</label>

            </div>
          </form>

          <form>
            <div class="form-group row">
            <label for="example-text-input" class="col-2 col-form-label"><h5>SUBSTRATE:</h5></label>
              <div class="col-4">
                  <select class="form-control" id="exampleFormControlSelect1">
                  <option>Natural Beach Sand</option>
                  <option>Artificial Sand</option>
                  </select>
              </div>
              <div class="col-4">
                <input type="text" class="form-control" placeholder="Other"/>
              </div>
            </div>
          </form>

          <h5>NOTES:</h5>
          <div class="col-sm-15 mb-3">
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

            <form>
              <div class="form-row">
              <div class="form-group col-md-3">
                <label for="inputPassword4">Data entered by:</label>
                <input type="password" class="form-control" id="inputPassword4" />
              </div>

                <div class="form-group col-md-3">
                  <label for="inputPassword4">Date:</label>
                  <input class="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
                </div>

                <div class="form-group col-md-3">
                  <label for="inputPassword4">Verified by:</label>
                  <input type="password" class="form-control" id="inputPassword4" />
                </div>

                <div class="form-group col-md-3">
                  <label for="inputPassword4">Date:</label>
                  <input class="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
                </div>

            </div>
          </form>


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



export default BeachInventory;
