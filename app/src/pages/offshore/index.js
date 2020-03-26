import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';
import axios from "axios";


const TITLE = 'New Offshore Report'

class Offshore extends Component {

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

        <div className="container-fluid">

            <h1><b>OFFSHORE DATA SHEET</b></h1>

            <form>
            <div className="justify-content-center row pb-2 pt-2">
            <div className="col-sm-10 mr-2 ml-2 border pr-0 pl-5 pb-3 pt-3">

            <div class="form-row text-left">

              <div class="form-group col-sm-3 mr-5">
                    <label for="trip" class="col-10 col-form-label">Trip #:</label>
                    <input class="form-control" type="text" id="example-text-input"/>
              </div>



              <div class="form-group col-sm-3 mr-5 ml-5">
              <label for="species" class="col-10 col-form-label">Species:</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                       <option>Cc</option>
                       <option>Cm</option>
                     </select>
              </div>


              <div class="form-group col-sm-3 ml-5">
                <label for="species" class="col-10 col-form-label">Capture Habitat:</label>
                    <input class="form-control" type="text" id="example-text-input"/>
                    </div>
            </div>

            <div class="form-row">
              <div class="col-sm-6 text-left">

                <form>
                  <div class="form-row">
                  <label for="species" class="col-3 col-form-label">Species:</label>
                      <div class="col-2">
                      <select class="form-control" id="exampleFormControlSelect1">
                         <option>Cc</option>
                         <option>Cm</option>
                       </select>
                      </div>
                    <div class="col-5">
                      <input type="text" class="form-control" placeholder="other"/>
                    </div>
                  </div>
                </form>

                <br></br>


                <form>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="date">Date:</label>
                            <input class="form-control" type="date"  id="example-date-input"/>
                      </div>
                    <div class="form-group col-md-3">
                      <label for="capture-time">Capture Time:</label>
                            <input class="form-control" type="time"   id="example-time-input"/>
                        </div>
                    <div class="form-group col-md-3">
                      <label for="capture-type">Capture Type:</label>
                        <select class="form-control" id="exampleFormControlSelect1">
                            <option>New</option>
                            <option>Old</option>
                            <option>Strange Recap</option>
                        </select>
                      </div>
                    </div>
                </form>

                <form>
                  <div class="form-row">
                    <div class="form-group col-md-5">
                      <label for="data-entered-by">Data Entered By:</label>
                      <input class="form-control" type="text" id="example-text-input"/>
                    </div>
                    <div class="form-group col-md-5">
                      <label for="data-verified-by">Data Verified By:</label>
                      <input class="form-control" type="text" id="example-text-input"/>

                      </div>
                  </div>
                </form>

                <div class="form-group row">
                  <label for="tag-numbers" class="col-4 col-form-label">Tag #'s:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="pit-tag-scanned" class="col-4 col-form-label">Pit Tag: Scanned:</label>
                  <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                     <option>Yes</option>
                     <option>No</option>
                   </select>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="living-tags" class="col-4 col-form-label">Living Tags:</label>
                  <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                     <option>Yes</option>
                     <option>No</option>
                     <option>Other</option>
                   </select>
                  </div>
                </div>

                <h4>Tag Scars:</h4>

                <form>
                  <div class="form-row">
                    <div class="form-group col-md-5">
                      <label for="tag-scars-lf">LF:</label>
                      <select class="form-control" id="exampleFormControlSelect1">
                         <option>Yes</option>
                         <option>No</option>
                       </select>                    </div>
                    <div class="form-group col-md-5">
                      <label for="tag-scars-rf">RF:</label>
                      <select class="form-control" id="exampleFormControlSelect1">
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                  </div>
                </form>

              <h4>Morphometrics:</h4>
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
                  <div class="form-group col-md-5">
                    <label for="body-depth">Body Depth (straight):</label>
                    <input type="form-control" class="form-control"/>
                  </div>
                </div>
              </form>


              </div>

              <div class="col-sm-6 text-left">


                <h4>Samples:</h4>
                <form>
                  <div class="form-row">
                  <label for="blood" class="col-3 col-form-label">Blood:</label>
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
                </form> <br></br>

                <form>
                  <div class="form-row">
                  <label for="skin" class="col-3 col-form-label">Skin:</label>
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
                </form> <br></br>

                <form>
                  <div class="form-row">
                  <label for="scute" class="col-3 col-form-label">Scute:</label>
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

                <br></br>
                  <p><h5>Other Samples:</h5></p>
                  <div class="col-sm-10">
                  <textarea class="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
                  </div> <br></br>


                    <div class="form-group row">
                      <label for="paps" class="col-4 col-form-label">Paps:</label>
                          <div class="col-6">
                          <select class="form-control" id="exampleFormControlSelect1">
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                          </select>
                          </div>
                    </div>

                      <div class="form-group row">
                        <label for="regression" class="col-4 col-form-label">Regression:</label>
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
                        <label for="photos" class="col-4 col-form-label">Photos:</label>
                        <div class="col-6">
                        <select class="form-control" id="exampleFormControlSelect1">
                           <option>Yes</option>
                           <option>No</option>
                         </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="pap-photos" class="col-4 col-form-label">Pap Photos:</label>
                        <div class="col-6">
                        <select class="form-control" id="exampleFormControlSelect1">
                           <option>Yes</option>
                           <option>No</option>
                         </select>
                        </div>
                      </div>


                      <form>
                        <div class="form-row">
                        <label for="example-text-input" class="col-3 col-form-label">Leeches:</label>
                            <div class="col-3">
                            <select class="form-control" id="exampleFormControlSelect1">
                               <option>Yes</option>
                               <option>No</option>
                             </select>
                            </div>
                          <div class="col-4">
                            <input type="text" class="form-control" placeholder="Where"/>
                          </div>
                        </div>
                      </form>

                      <br></br>

                      <form>
                        <div class="form-row">
                        <label for="leech-eggs" class="col-3 col-form-label">Leech Eggs:</label>
                            <div class="col-3">
                            <select class="form-control" id="exampleFormControlSelect1">
                               <option>Yes</option>
                               <option>No</option>
                             </select>
                            </div>
                          <div class="col-4">
                            <input type="text" class="form-control" placeholder="Where"/>
                          </div>
                        </div>
                      </form>

                      <br></br>

                      <h5>Flipper Damage:</h5>
                        <div class="col-sm-10">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                      <br></br>
                      <h5>Shell Damage:</h5>
                        <div class="col-sm-10 mb-3">
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>
                      <h4>Notes:</h4>
                        <div class="col-sm-10">
                        <p><i>Describe scale and scute abnormalities, condition of turtle, etc.</i></p>
                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                        </div>


                        </div>
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



export default Offshore;
