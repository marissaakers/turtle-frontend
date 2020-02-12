import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import turtleimg from '../images/lagoonturtle.png';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';

const TITLE = 'MTRG - View report'

class SingleReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turtleData: {},
      encounterNum: -1
    }
  }

  async componentDidMount() {
    this.setState({ turtleData: this.props.location.state.turtleData });
    this.setState({ encounterNum: this.props.location.state.encounterNum });
    //
    // this.setState({isLoading: true});
    // const data = await axios.get('https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon');
    // this.setState(data);
    // this.setState({isLoading: false});
    console.log("blabla turtle data = " + this.state.encounterNum);
  }

  render() {
    let displayBlock;

    if (this.state.encounterNum < 0) {
      displayBlock = (
        <div></div>
      )
    }
    else {
      let _data = this.state.turtleData;
      let _encounter = _data.encounters[this.state.encounterNum];

      const tagsList = [];
      for (var i = 0; i < _data.tags.length; i++) {
        tagsList.push( <li>{ _data.tags[i].tag_number }</li> )
      }
      const netsList = [];
      for (i = 0; i < _encounter.metadata.nets.length; i++) {
        netsList.push( <li>Net ID { _encounter.metadata.nets[i].net_id }</li> )
      }
      const incidentalCapturesList = [];
      for (i = 0; i < _encounter.metadata.incidental_captures.length; i++) {
        incidentalCapturesList.push( <li>Incidental capture ID { _encounter.metadata.incidental_captures[i].incidental_capture_id }</li> )
      }
      const sampleList = [];
      for (i = 0; i < _encounter.samples.length; i++) {
        sampleList.push( <li>Sample ID { _encounter.samples[i].samples_id }</li> )
      }

      displayBlock = (
        <div>
          <h3>MTRG - View report #{ this.state.encounterNum }</h3>
          <p>Here we display the values of the report.</p>

          <div class="container">

            <br></br><h2><b>ENCOUNTER DATA:</b></h2><br></br>

              <form>
              <div class="form-row">
                <div class="col-sm-6 text-left">


                  <div class="form-group row">
                    <label for="example-date-input" class="col-4 col-form-label">Date</label>
                    <div class="col-6">
                      <input class="form-control" type="date" value={ _encounter.encounter_date } id="example-date-input"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Species:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value={ _encounter.species } id="example-text-input"/>

                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Capture Time:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value={ _encounter.encounter_time } id="example-text-input"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Tag #'s:</label>
                    <div class="col-6">

                    <ul>
                      { tagsList }
                    </ul>

                    <input class="form-control" type="text" placeholder="Add More" id="example-text-input"/>

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
                    <label for="example-text-input" class="col-4 col-form-label">Living Tags:</label>
                    <div class="col-6">
                    <select class="form-control" id="exampleFormControlSelect1">
                       <option>Yes</option>
                       <option>No</option>
                       <option>Other</option>
                     </select>
                    </div>
                  </div>

                <h4>Morphometrics:</h4>


                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Curved Length (notch-tip) in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" value={ _encounter.morphometrics.curved_length } id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Straight Length (notch-tip) in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" value={ _encounter.morphometrics.straight_length } id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Minimum Length (notch-tip) in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" value={ _encounter.morphometrics.straight_length } id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Plastron Length (tape) in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" value={ _encounter.morphometrics.plastron_length } id="example-text-input"/>
                  </div>
                </div>


                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Weight in kg: *tare scale</label>
                  <div class="col-6">
                  <input class="form-control" type="text" value={ _encounter.morphometrics.weight } id="example-text-input"/>
                  </div>
                </div>

                <h5>Paps: { _encounter.paps.number_of_paps }</h5>


                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Regression:</label>
                      <div class="col-6">
                      <select class="form-control" id="exampleFormControlSelect1">
                         <option>Yes</option>
                         <option>No</option>
                         <option>Other</option>
                         <option>partial</option>
                         <option>complete</option>
                       </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Photos:</label>
                      <div class="col-6">
                      <select class="form-control" id="exampleFormControlSelect1">
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    </div>

                    <div class="form-group row">
                      <label for="example-text-input" class="col-4 col-form-label">Pap Photos:</label>
                      <div class="col-6">
                      <select class="form-control" id="exampleFormControlSelect1">
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    </div>


                <h5>Leeches:</h5>
                  <div class="btn-toolbar" role="toolbar" >
                      <div class="btn-group mr-2" role="group" >
                          <button type="button" class="btn btn-outline-success">Yes</button>
                      </div>
                      <div class="btn-group mr-2" role="group" >
                          <button type="button" class="btn btn-outline-success">No</button>
                      <div class="col-sm-11">
                      <input type="turtle" class="form-control" id="lagoonData"  placeholder="Where"/>
                      </div> </div>
                    </div>
                <h5>Leech Eggs:</h5>
                  <div class="btn-toolbar" role="toolbar" >
                      <div class="btn-group mr-2" role="group" >
                          <button type="button" class="btn btn-outline-success">Yes</button>
                      </div>
                      <div class="btn-group mr-2" role="group" >
                          <button type="button" class="btn btn-outline-success">No</button>
                      <div class="col-sm-11">
                      <input type="turtle" class="form-control" id="lagoonData"  placeholder="Where"/>
                      </div></div>
                    </div>
                <h5>Flipper Damage:</h5>
                  <div class="col-sm-11">
                  <input type="flipper" class="form-control" value={ _encounter.morphometrics.flipper_carapace } id="lagoonData" />
                  </div>
                <br></br>
                <h5>Shell Damage:</h5>
                  <div class="col-sm-11">
                  <input type="shell" class="form-control" value={ _encounter.morphometrics.carapace_damage } id="lagoonData" />
                  </div>
                <br></br>
                <h4>Notes:</h4>
                  <div class="col-sm-11">
                  <input type="notes" class="form-control" id="lagoonData" />
                  </div>
                <p><i>Describe scale and scute</i></p>
                <p><i>abnormalities, condition of</i></p>
                <p><i>turtle, etc.</i></p>


                </div>


                <div class="col-sm-5 text-left">

                <div class="form-group row">
                  <label for="example-text-input" class="col-5 col-form-label">Data Entered By:</label>
                  <div class="col-7">
                  <input class="form-control" type="text" value={ _encounter.entered_by } id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-5 col-form-label">Data Verified By:</label>
                  <div class="col-7">
                  <input class="form-control" type="text" value={ _encounter.verified_by } id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-date-input" class="col-5 col-form-label">Data Verified Date:</label>
                  <div class="col-5">
                    <input class="form-control" type="date" value={ _encounter.verified_date } id="example-date-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Capture Type:</label>
                  <div class="col-6">
                  <select class="form-control" value={ _encounter.type } id="exampleFormControlSelect1">
                     <option>New</option>
                     <option>Old</option>
                     <option>Strange Recap</option>
                   </select>
                  </div>
                </div>

                  <p><br></br><b>Tag Scars:</b></p>
                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">LF:</label>
                    <div class="col-6">
                    <select class="form-control" id="exampleFormControlSelect1">
                       <option>Yes</option>
                       <option>No</option>
                     </select>
                    </div>
                  </div>
                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">RF:</label>
                    <div class="col-6">
                    <select class="form-control" id="exampleFormControlSelect1">
                       <option>Yes</option>
                       <option>No</option>
                     </select>
                    </div>
                  </div>

                  <br></br>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Curved Width (widest) in cm:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value={ _encounter.morphometrics.curved_width } id="example-text-input"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Straight Width (widest) in cm:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value={ _encounter.morphometrics.straight_length } id="example-text-input"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Tail Length:PL-vent in cm:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value={ _encounter.morphometrics.tail_length_pl_vent } id="example-text-input"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">PL-tip in cm:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value= { _encounter.morphometrics.tail_length_pl_tip } id="example-text-input"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Head Width (straight) in cm:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value={ _encounter.morphometrics.head_width } id="example-text-input"/>
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Body Depth (straight) in cm:</label>
                    <div class="col-6">
                    <input class="form-control" type="text" value={ _encounter.morphometrics.body_depth } id="example-text-input"/>
                    </div>
                  </div>

                  <h4><br></br>Samples:</h4>

                  <p>Samples:</p>
                  <ul>
                    { sampleList }
                  </ul>

                  <h5>Blood:</h5>
                    <div class="btn-toolbar" role="toolbar" >
                        <div class="btn-group mr-2" role="group" >
                            <button type="button" class="btn btn-outline-success">Yes</button>
                        </div>
                        <div class="btn-group mr-2" role="group" >
                            <button type="button" class="btn btn-outline-success">No</button>
                        <div class="col-sm-11">
                        <input type="turtle" class="form-control" id="lagoonData"  placeholder="For"/>
                        </div></div>
                      </div>

                  <h5>Skin:</h5>
                        <div class="btn-toolbar" role="toolbar" >
                            <div class="btn-group mr-2" role="group" >
                                <button type="button" class="btn btn-outline-success">Yes</button>
                            </div>
                            <div class="btn-group mr-2" role="group" >
                                <button type="button" class="btn btn-outline-success">No</button>
                            <div class="col-sm-11">
                            <input type="turtle" class="form-control" id="lagoonData"  placeholder="For"/>
                            </div></div>
                        </div>

                  <h5>Scute:</h5>
                          <div class="btn-toolbar" role="toolbar" >
                              <div class="btn-group mr-2" role="group" >
                                  <button type="button" class="btn btn-outline-success">Yes</button>
                              </div>
                              <div class="btn-group mr-2" role="group" >
                                  <button type="button" class="btn btn-outline-success">No</button>
                              <div class="col-sm-11">
                              <input type="turtle" class="form-control" id="lagoonData"  placeholder="For"/>
                              </div></div>
                          </div>

                  <img src={turtleimg} width = "300"/>

                  <br></br>
                  <p>Investigated by:</p>
                    <div class="col-sm-11">
                    <input type="turtle" class="form-control" value={ _encounter.investigated_by } id="lagoonData" />
                    </div>
                    <p>Entered Date:</p>
                      <div class="col-sm-11">
                      <input type="turtle" class="form-control" value={ _encounter.entered_date } id="lagoonData" />
                      </div>

                </div>
                </div>
              </form>


              <br></br>

              <button type="submit" class="btn btn-primary">EDIT</button>

              <div class="container text-left">
              <h2><b>METADATA:</b></h2>

              <p>Metadata ID: { _encounter.metadata.metadata_id }</p>


                  <div class="form-group row">
                    <label for="example-date-input" class="col-4 col-form-label">Date</label>
                    <div class="col-4">
                      <input class="form-control" type="date" value={ _encounter.metadata.metadata_date } name="metadata_date" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Location</label>
                    <div class="col-4">
                      <input class="form-control" type="text" value={ _encounter.metadata.metadata_location } name= "metadata_location" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Investigators</label>
                    <div class="col-4">
                      <input class="form-control" type="text" value={ _encounter.metadata.metadata_investigators } name= "metadata_investigators" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <h5><b>Turtle Capture Data: </b></h5>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Cc:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.number_of_cc_captured } name= "number_of_cc_captured" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Cm:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.number_of_cm_captured } name= "number_of_cm_captured" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Other:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.number_of_other_captured } name= "number_of_other_captured" onChange={e => this.onChange(e)} />
                    </div>
                  </div>
                   <br></br>


                  <h5><b>Environmental Data: </b></h5>


                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Wind Spd:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.wind_speed } name="wind_dir" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Wind Dir:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.wind_dir } name="wind_dir" onChange={e => this.onChange(e)} />
                    </div>
                  </div>


                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Time:</label>
                    <div class="col-3">
                      <input class="form-control" value={ _encounter.metadata.environment.environment_time } name="environment_time" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Weather:</label>
                    { _encounter.metadata.environment.weather }
                </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Air Temp:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.air_temp } name="air_temp" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <h7><b>Water Temp: </b></h7>
                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Surface:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.water_temp_surface } name="water_temp_surface" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">1m:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.water_temp_1_m } name="water_temp_1_m" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">2m:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.water_temp_2_m } name="water_temp_2_m" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Bottom:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.water_temp_bottom } name="water_temp_bottom" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <h7><b>Salinity: </b></h7>
                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Surface:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.salinity_surface } name="salinity_surface" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">1m:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.salinity_1_m } name="salinity_1_m" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">2m:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.salinity_2_m } name="salinity_2_m" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div class="form-group row">
                    <label for="example-text-input" class="col-4 col-form-label">Bottom:</label>
                    <div class="col-3">
                      <input class="form-control" type="text" value={ _encounter.metadata.environment.salinity_bottom } name="salinity_bottom" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <h5>Nets:</h5>
                  <ul>
                    { netsList }
                  </ul>
                  <br></br>


                  <h5><b>Incidental Capture Data: </b></h5>

                  <ul>
                    { incidentalCapturesList }
                  </ul>



                </div>

            </div>


        </div>
      )
    }

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <InternalNavbar />
        { displayBlock }
        <InternalFooter />
      </>
    )
  }
}


export default SingleReport;
