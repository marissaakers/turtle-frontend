import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import turtleimg from './images/lagoonturtle.png';


console.log(turtleimg);

class Lagoon extends Component {

  constructor(props){
    super(props)

    this.state = {
      turtle_id: '',
      tags: [],
      morphometrics: '',
      clutches: [],
      encounter: '',
      metadata: '',
      //jwt: this.props.location.state.jwt,
      result: '',
      redirect: false,
    }

  //  this.handleSubmit = this.handleSubmit.bind(this)

  }

  render() {
    return(
      <div class="container">

          <h1><b>LAGOON DATA SHEET</b></h1><br></br><br></br>

          <form>
          <div class="form-row">
            <div class="col-sm-6 text-left">


              <label for="validationDefault01">Date: </label>
               <input class="form-control" id="date" name="date" placeholder="MM/DD/YYY" type="text"/> <br></br>


              <label for="validationDefault01">Species: </label>
              <div class="btn-toolbar" role="toolbar" aria-label="Species Options">
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">Cc</button>
                  </div>
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">Cm</button>
                  </div>
                  <div class="btn-group" role="group" >
                      <button type="button" class="btn btn-outline-success">Other</button>
                      <div class="col-sm-11">
                      <input type="other" class="form-control" id="lagoonData" />
                      </div>
                  </div>
                </div><br></br>

            <label for="validationDefault01">Capture Time: </label>
                <div class="col-sm-11">
                <input type="captureTime" class="form-control" id="lagoonData"  placeholder="Capture Time"/>
                </div><br></br>


            <p>Tag #'s:</p>
            <div class="col-sm-11">
            <input type="turtle" class="form-control" id="lagoonData"  placeholder="LF RF"/>
            </div><br></br>


            <p>PIT Tag:  Scanned:</p>
              <div class="col-sm-11">
              <div class="btn-toolbar" role="toolbar" aria-label="Living Tags">
                  <div class="btn-group mr-2" role="group" aria-label="Yes Option">
                      <button type="button" class="btn btn-outline-success">Yes</button>
                  </div>
                  <div class="btn-group mr-2" role="group" aria-label="No Option">
                      <button type="button" class="btn btn-outline-success">No</button>
                  </div>
                </div>
              </div><br></br>

            <p>Living Tags:</p>
              <div class="btn-toolbar" role="toolbar" aria-label="Living Tags">
                  <div class="btn-group mr-2" role="group" aria-label="Yes Option">
                      <button type="button" class="btn btn-outline-success">Yes</button>
                  </div>
                  <div class="btn-group mr-2" role="group" aria-label="No Option">
                      <button type="button" class="btn btn-outline-success">No</button>
                  </div>
                  <div class="btn-group" role="group" aria-label="Other Option">
                      <button type="button" class="btn btn-outline-success">Other</button>
                      <div class="col-sm-11">
                      <input type="tags" class="form-control" id="lagoonData" />
                      </div>
                  </div>
                </div>
                <br></br>


            <h4>Morphometrics:</h4>

            <p>Curved Length (notch-tip) in cm:</p>
              <div class="col-sm-5">
              <input type="morphometrics" class="form-control" id="curved_width" />
              </div>
            <p>Straight Length (notch-tip) in cm:</p>
              <div class="col-sm-5">
              <input type="morphometrics" class="form-control" id="straight_width" />
              </div>
            <p>Minimum Length (notch-tip) in cm:</p>
              <div class="col-sm-5">
              <input type="morphometrics" class="form-control" id="minimum_length" />
              </div>
            <p>Plastron Length (tape) in cm:</p>
              <div class="col-sm-5">
              <input type="morphometrics" class="form-control" id="plastron_length" />
              </div>
            <p>Weight in kg:</p>
              <div class="col-sm-5">
              <input type="morphometrics" class="form-control" id="weight" />
              </div>
            <p> * tare scale </p>


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

            <h5>Regression:
            <div class="btn-toolbar" role="toolbar" >
                <div class="btn-group mr-2" role="group" aria-label="Yes Option">
                    <button type="button" class="btn btn-outline-success">Yes</button>
                </div>
                <div class="btn-group mr-2" role="group" aria-label="No Option">
                    <button type="button" class="btn btn-outline-success">No</button>
                </div>
                <div class="btn-group" role="group" aria-label="Not Avail Option">
                    <button type="button" class="btn btn-outline-success">N/A</button>
                    <div class="col-sm-11">
                    <input type="regression" class="form-control" id="lagoonData" />
                    </div>
                </div>
              </div>
              </h5>
            <h5>Photos:</h5>
              <div class="btn-toolbar" role="toolbar">
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">Yes</button>
                  </div>
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">No</button>
                  </div>
                </div>
            <h5>Pap Photos:</h5>
              <div class="btn-toolbar" role="toolbar">
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">Yes</button>
                  </div>
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">No</button>
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

            <p>Capture Type:</p>
              <div class="btn-toolbar" role="toolbar" >
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">New</button>
                  </div>
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">Old</button>
                  </div>
                  <div class="btn-group" role="group" >
                      <button type="button" class="btn btn-outline-success">Strange Recap</button>
                  </div> <br></br>
              </div>

              <p><br></br><b>Tag Scars:</b></p>
              <p>LF:</p>
              <div class="btn-toolbar" role="toolbar" >
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">Y</button>
                  </div>
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">N</button>
                  </div>
              </div>
              <p>RF:</p>
              <div class="btn-toolbar" role="toolbar" >
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">Y</button>
                  </div>
                  <div class="btn-group mr-2" role="group" >
                      <button type="button" class="btn btn-outline-success">N</button>
                  </div>
              </div>
              <br></br>

              <p><br></br><br></br>Curved Width (widest) in cm:</p>
                <div class="col-sm-5">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>
              <p>Straight Width (widest) in cm:</p>
                <div class="col-sm-5">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>
              <p>Tail Length:PL-vent in cm:</p>
                <div class="col-sm-5">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>
              <p>PL-tip in cm:</p>
                <div class="col-sm-5">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>
              <p>Head Width (straight) in cm:</p>
                <div class="col-sm-5">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>
              <p>Body Depth (straight) in cm:</p>
                  <div class="col-sm-5">
                  <input type="turtle" class="form-control" id="lagoonData" />
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

              <h4><br></br><br></br>Dispostition of Specimen:</h4>
              <p>Entered By:</p>
                <div class="col-sm-11">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>
              <p>Checked By By:</p>
                <div class="col-sm-11">
                <input type="turtle" class="form-control" id="lagoonData" />
                </div>

            </div>
            </div>
          </form>

          <button type="button" class="btn btn-primary">SUBMIT</button>
        </div>

    )
  }
}



export default Lagoon;
