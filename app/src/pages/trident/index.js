import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";


const TITLE = 'New Trident report'

class Trident extends Component {

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
       axios.get('https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/Trident')
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


        <div class="container-fluid">

            <h1><b>TRIDENT BASIN DATA SHEET</b></h1><br></br>

            <form>
            <div class="form-row">
              <div class="col-sm-4 text-left">

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
                  <input class="form-control" type="time"   id="example-time-input"/>
                  </div>
                </div>


                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Data Entered By:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Data Verified By:</label>
                  <div class="col-6">
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

                <h4>Tag Scars:</h4>
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


                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Paps:</label>
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


              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Leeches:</label>
                    <div class="col-6">
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Leech Eggs:</label>
                    <div class="col-6">
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>Yes</option>
                        <option>No</option>
                    </select>
                    </div>
              </div>


              </div>




              <div class="col-sm-4 text-left">

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Capture Location:</label>
                <div class="col-6">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">Capture Type:</label>
                <div class="col-6">
                    <select class="form-control" id="exampleFormControlSelect1">
                        <option>Dip net</option>
                        <option>Tangle net</option>
                    </select>
                  </div>
                </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-4 col-form-label">No. On Carapace:</label>
                <div class="col-6">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <br></br>

              <h4>Morphometrics:</h4>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Curved Length (notch-tip) in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Curved Width (widest) in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Straight Length (notch-tip) in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>



              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Straight Width (widest) in cm:</label>
                  <div class="col-4">
                  <input class="form-control" type="text" id="example-text-input"/>
                  </div>
              </div>


              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Minimum Length (notch-tip) in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Plastron Length (tape) in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>


              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Weight in kg: *tare scale</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Tail Length: PL-vent in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Tail Length: PL-tip in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Head Width (straight) in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>

              <div class="form-group row">
                <label for="example-text-input" class="col-6 col-form-label">Body Depth (straight) in cm:</label>
                <div class="col-4">
                <input class="form-control" type="text" id="example-text-input"/>
                </div>
              </div>


              </div>

              <div class="col-sm-3 text-left">

              <h5>Flipper Damage:</h5>
                <div class="col-sm-11">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                </div>
              <br></br>
              <h5>Shell Damage:</h5>
                <div class="col-sm-11">
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="5"></textarea>
                </div>
              <br></br>
              <h4>Notes:</h4>
                <div class="col-sm-11">
                <p><i>Describe scale and scute abnormalities, condition of turtle, etc.</i></p>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>


                <br></br><h4>Samples:</h4>
                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Blood:</label>
                  <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                     <option>Yes</option>
                     <option>No</option>
                   </select>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Skin:</label>
                  <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                     <option>Yes</option>
                     <option>No</option>
                   </select>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="example-text-input" class="col-4 col-form-label">Scute:</label>
                  <div class="col-6">
                  <select class="form-control" id="exampleFormControlSelect1">
                     <option>Yes</option>
                     <option>No</option>
                   </select>
                  </div>
                </div>

                <h5>Other Samples:</h5>
                <div class="col-sm-11">
                <input type="turtle" class="form-control" id="TridentData" />
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



export default Trident;
