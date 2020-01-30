import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import turtleimg from '../images/lagoonturtle.png';
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";


const TITLE = 'New Lagoon report'
console.log(turtleimg);

class Lagoon extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      redirect: false,
    }

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

/*
         encounter_date:
          //species:
         capture_time:
         tag_number:
         NEED PIT TAG
         living_tags:
         curved_length:
         straight_length:
         minimum_length:
         plastron_length:
         curved_width:
         straight_width:
         tail_length_pl_vent:
         tail_length_pl_tip:
         head_width:
         body_depth:
         paps:
         paps_regression:
         photos:
         pap_photos:
         leeches:
         leech_eggs:
         FLIPPER DAMAGE
         SHELL DAMAGE
         entered_date:
         entered_by:
         TAG SCARS
         blood:
         skin_1:
         scute:
         other_for:
         */

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
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>

        <div class="container">

            <h1><b>LAGOON DATA SHEET</b></h1><br></br><br></br>

            <form>
            <div class="form-row">
              <div class="col-sm-6 text-left">


                <div class="form-group row">
                  <label for="example-date-input" class="col-4 col-form-label">Date</label>
                  <div class="col-6">
                    <input class="form-control" type="date"  id="example-date-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Species:</label>
                  <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                     <option>Cc</option>
                     <option>Cm</option>
                     <option>Other</option>
                   </select>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Capture Time:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Tag #'s':</label>
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
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Straight Length (notch-tip) in cm:</label>
                <div class="col-6">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Minimum Length (notch-tip) in cm:</label>
                <div class="col-6">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Plastron Length (tape) in cm:</label>
                <div class="col-6">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>


              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Weight in kg: *tare scale</label>
                <div class="col-6">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <h5>Paps:
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox1" value="option0"/>
                    <label class="form-check-label" for="inlineCheckbox1">0</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox2" value="option1"/>
                    <label class="form-check-label" for="inlineCheckbox2">1</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option2"/>
                    <label class="form-check-label" for="inlineCheckbox3">2</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="checkbox" id="inlineCheckbox3" value="option3"/>
                    <label class="form-check-label" for="inlineCheckbox4">3</label>
                  </div> </h5>

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
                <input type="flipper" class="form-control" id="lagoonData" />
                </div>
              <br></br>
              <h5>Shell Damage:</h5>
                <div class="col-sm-11">
                <input type="shell" class="form-control" id="lagoonData" />
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
                <label for="example-text-input" class="col-4 col-form-label">Data Entered By:</label>
                <div class="col-8">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Data Verified By:</label>
                <div class="col-8">
                <input class="form-control" type="text" id="example-text-input"/>
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
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Straight Width (widest) in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Tail Length:PL-vent in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">PL-tip in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Head Width (straight) in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Body Depth (straight) in cm:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <h4><br></br>Samples:</h4>
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

                <h5>Other Samples:</h5>
                <div class="col-sm-11">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>

                <img src={turtleimg} width = "300"/>

                <br></br>
                <p>Double Checked By:</p>
                  <div class="col-sm-11">
                  <input type="turtle" class="form-control" id="lagoonData" />
                  </div>

              </div>
              </div>
            </form>

            <button type="submit" class="btn btn-primary">SUBMIT</button>
          </div>

        <InternalFooter />
      </>
    );
  }
}



export default Lagoon;
