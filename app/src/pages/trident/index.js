import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';
import axios from "axios";

const apiEndpoint = 'https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/Trident';


const TITLE = 'New Trident report'

class Trident extends Component {

  constructor(props){
    super(props)

    this.state = {
      data : [],
      redirect: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }


    onChange(e) {
      this.setState({ [e.target.name]: e.target.value })
    }

    handleSubmit = async(e) => {
       e.preventDefault();

       const data = {
        species: this.state.species,
       	entered_date: this.state.entered_date,
       	entered_by: this.state.entered_by,
       	verified_date: null,
       	verified_by: this.state.verified_by,
       	encounter_date: this.state.encounter_date,
       	encounter_time: this.state.encounter_time,
       	investigated_by: this.state.investigated_by,
       	capture_type: this.state.capture_type,
       	living_tags: JSON.parse(this.state.living_tags),
       	pap_category: parseFloat(this.state.pap_category),
       	paps_present: JSON.parse(this.state.paps_present),
       	paps_regression: this.state.paps_regression,
       	leech_eggs: JSON.parse(this.state.leech_eggs),
       	leech_eggs_where: this.state.leech_eggs_where,
       	leeches: JSON.parse(this.state.leeches),
       	leeches_where: this.state.leeches_where,
       	pap_photos: JSON.parse(this.state.pap_photos),
       	photos: JSON.parse(this.state.photos),
       	samples: [{
       			sample_type: "Blood",
       			received_by: null,
       			purpose_of_sample: this.state.blood_sample,
       			notes: null,
       			entered_date: null,
       			entered_by: null,
       		},
          {
         			sample_type: "Skin",
         			received_by: null,
         			purpose_of_sample: this.state.skin_sample,
         			notes: null,
         			entered_date: null,
         			entered_by: null,
         	},
          {
         			sample_type: "Scute",
         			received_by: null,
         			purpose_of_sample: this.state.scute_sample,
         			notes: null,
         			entered_date: null,
         			entered_by: null,
         	}
       	],
       	notes: this.state.notes,
       	other: this.state.other,
       	morphometrics: {
       		plastron_length: parseFloat(this.state.plastron_length),
       		flipper_damage: this.state.flipper_damage,
       		weight: parseFloat(this.state.weight),
       		curved_length: parseFloat(this.state.curved_length),
       		minimum_length: parseFloat(this.state.minimum_length),
       		straight_length: parseFloat(this.state.straight_length),
       		curved_width: parseFloat(this.state.curved_width),
       		straight_width: parseFloat(this.state.straight_width),
       		tail_length_pl_tip: parseFloat(this.state.tail_length_pl_tip),
       		head_width: parseFloat(this.state.head_width),
       		body_depth: parseFloat(this.state.body_depth),
       		tail_length_pl_vent: parseFloat(this.state.tail_length_pl_tip),
       		carapace_damage: this.state.carapace_damage
       	},
       	tags: [{
       			tag_number: this.state.tag_number,
       			tag_type: this.state.tag_type,
       			active: true,
       			tag_scars: JSON.parse(this.state.tag_scars),
       			pit: true,
       			scanned: JSON.parse(this.state.scanned),
       			scanner_number: null
       		}]
       };


      axios.post('https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/Trident/insert', { data })
      .then(res => {
        console.log(data)
        console.log("Successfully posted!")
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
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>

        <div className="container-fluid">

            <h1><b>TRIDENT DATA SHEET</b></h1>

            <form>
            <div className="justify-content-center row pb-2 pt-2">
            <div className="col-sm-10 mr-2 ml-2 border pr-0 pl-5 pb-3 pt-3">

            <div class="form-row">
              <div class="col-sm-6 text-left">

                <form>
                  <div class="form-row">
                  <label for="species" class="col-3 col-form-label">Species:</label>
                      <div class="col-2">
                      <select class="form-control" name="species" onChange={e => this.onChange(e)}>
                         <option value="Cc">Cc</option>
                         <option value="Cm">Cm</option>
                       </select>
                      </div>
                    <div class="col-5">
                      <input type="text" class="form-control" placeholder="other" name="species" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>
                </form>

                <br></br>


                <form>
                    <div class="form-row">
                      <div class="form-group col-md-4">
                        <label for="date">Date:</label>
                            <input class="form-control" type="date" name="entered_date" onChange={e => this.onChange(e)}/>
                      </div>
                    <div class="form-group col-md-3">
                      <label for="capture-time">Capture Time:</label>
                            <input class="form-control" type="time" name="encounter_time" onChange={e => this.onChange(e)} />
                        </div>
                    <div class="form-group col-md-3">
                      <label for="capture-type">Capture Type:</label>
                        <select class="form-control" name="capture_type" onChange={e => this.onChange(e)} >
                            <option value="New">New</option>
                            <option value="Old">Old</option>
                            <option value="Strange Recap">Strange Recap</option>
                        </select>
                      </div>
                    </div>
                </form>

                <form>
                  <div class="form-row">
                    <div class="form-group col-md-5">
                      <label for="data-entered-by">Data Entered By:</label>
                      <input class="form-control" type="text" name="entered_by" onChange={e => this.onChange(e)}/>
                    </div>
                    <div class="form-group col-md-5">
                      <label for="data-verified-by">Data Verified By:</label>
                      <input class="form-control" type="text"  name="verified_by" onChange={e => this.onChange(e)} />
                      </div>
                  </div>
                </form>

                <div class="form-group row">
                  <label for="tag-numbers" class="col-4 col-form-label">Tag #'s:</label>
                  <div class="col-6">
                  <input class="form-control" type="text" name="tag_number" onChange={e => this.onChange(e)}/>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="pit-tag-scanned" class="col-4 col-form-label">Pit Tag: Scanned:</label>
                  <div class="col-6">
                  <select class="form-control" name="scanned" onChange={e => this.onChange(e)}>
                     <option value="true">Yes</option>
                     <option value="false">No</option>
                   </select>
                  </div>
                </div>

                <div class="form-group row">
                  <label for="living-tags" class="col-4 col-form-label">Living Tags:</label>
                  <div class="col-6">
                  <select class="form-control" name="living_tags" onChange={e => this.onChange(e)}>
                     <option value="true">Yes</option>
                     <option value="false">No</option>
                   </select>
                  </div>
                </div>

                <h4>Tag Scars:</h4>

                <form>
                  <div class="form-row">
                    <div class="form-group col-md-5">
                      <label for="tag-scars-lf">LF:</label>
                      <select class="form-control" name="tag_scars" onChange={e => this.onChange(e)}>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>                    </div>
                    <div class="form-group col-md-5">
                      <label for="tag-scars-rf">RF:</label>
                      <select class="form-control" >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                  </div>
                </form>

              <h4>Morphometrics:</h4>
              <form>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="curved-length">Curved Length (notch-tip):</label>
                    <input class="form-control" type="text" name="curved_length" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-5">
                    <label for="curved-width">Curved Width (widest):</label>
                    <input class="form-control" type="text" name="curved_width" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="straight-length">Straight Length (notch-tip):</label>
                    <input class="form-control" type="text" name="straight_length" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-5">
                    <label for="straight-width">Straight Width (widest):</label>
                    <input type="form-control" name="straight_width" class="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="min-length">Minimum Length (notch-notch):</label>
                    <input type="form-control" name="minimum_length" class="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-5">
                    <label for="tail-length">Tail Length: PL-vent</label>
                    <input type="form-control" name="tail_length_pl_vent" class="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="plastron-length">Plastron Length (tape):</label>
                    <input type="form-control" name="plastron_length" class="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-5">
                    <label for="pl-tip">PL-Tip:</label>
                    <input type="form-control" name="tail_length_pl_tip" class="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-6">
                    <label for="weight">Weight in kg: *tare scale</label>
                    <input type="form-control" name="weight" class="form-control" placeholder="in kg" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-5">
                    <label for="head-width">Head Width (straight):</label>
                    <input type="form-control" name="head_width" class="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div class="form-group col-md-6">

                  </div>
                  <div class="form-group col-md-5">
                    <label for="body-depth">Body Depth (straight):</label>
                    <input type="form-control" name="body_depth" class="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
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
                      <select class="form-control">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div class="col-4">
                      <input type="text" name="blood_sample" class="form-control" placeholder="For" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>
                </form> <br></br>

                <form>
                  <div class="form-row">
                  <label for="skin" class="col-3 col-form-label">Skin:</label>
                      <div class="col-3">
                      <select class="form-control" >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div class="col-4">
                      <input type="text" name="skin_sample" class="form-control" placeholder="For" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>
                </form> <br></br>

                <form>
                  <div class="form-row">
                  <label for="scute" class="col-3 col-form-label">Scute:</label>
                      <div class="col-3 mb-3">
                      <select class="form-control" >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div class="col-4">
                      <input type="text" name="scute_sample" class="form-control" placeholder="For" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>
                </form>

                  <p><h5>Other Samples:</h5></p>
                  <div class="col-sm-10">
                  <textarea class="form-control" name="other" rows="2" onChange={e => this.onChange(e)}></textarea>
                  </div> <br></br>


                    <div class="form-group row">
                      <label for="paps" class="col-4 col-form-label">Paps:</label>
                          <div class="col-6">
                          <select class="form-control" name="paps_category" onChange={e => this.onChange(e)}>
                              <option value="0">0</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                          </select>
                          </div>
                    </div>

                      <div class="form-group row">
                        <label for="regression" class="col-4 col-form-label">Regression:</label>
                        <div class="col-6">
                        <select class="form-control" name="paps_regression" onChange={e => this.onChange(e)}>
                           <option value="Yes">Yes</option>
                           <option value="No">No</option>
                           <option value="Other">Other</option>
                           <option value="Partial">partial</option>
                           <option value="Complete">complete</option>
                         </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="photos" class="col-4 col-form-label">Photos:</label>
                        <div class="col-6">
                        <select class="form-control" name="photos" onChange={e => this.onChange(e)}>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                         </select>
                        </div>
                      </div>

                      <div class="form-group row">
                        <label for="pap-photos" class="col-4 col-form-label">Pap Photos:</label>
                        <div class="col-6">
                        <select class="form-control" name="pap_photos" onChange={e => this.onChange(e)}>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                         </select>
                        </div>
                      </div>


                      <form>
                        <div class="form-row">
                        <label for="example-text-input" class="col-3 col-form-label">Leeches:</label>
                            <div class="col-3">
                            <select class="form-control" name="leeches" onChange={e => this.onChange(e)}>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                             </select>
                            </div>
                          <div class="col-4">
                            <input type="text" class="form-control" name="leeches_where" placeholder="Where" onChange={e => this.onChange(e)}/>
                          </div>
                        </div>
                      </form>

                      <br></br>

                      <form>
                        <div class="form-row">
                        <label for="leech-eggs" class="col-3 col-form-label">Leech Eggs:</label>
                            <div class="col-3">
                            <select class="form-control" name="leech_eggs" onChange={e => this.onChange(e)}>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                             </select>
                            </div>
                          <div class="col-4">
                            <input type="text" class="form-control" placeholder="Where" name="leech_eggs_where" onChange={e => this.onChange(e)}/>
                          </div>
                        </div>
                      </form>

                      <br></br>

                      <h5>Flipper Damage:</h5>
                        <div class="col-sm-12 mb-3">
                        <textarea class="form-control" name="flipper_damage" id="exampleFormControlTextarea1" rows="3" onChange={e => this.onChange(e)}></textarea>
                        </div>

                      <h5>Shell Damage:</h5>
                        <div class="col-sm-12 mb-3">
                        <textarea class="form-control" name="carapace_damage" id="exampleFormControlTextarea1" rows="3" onChange={e => this.onChange(e)}></textarea>
                        </div>
                      <h4>Notes:</h4>
                        <div class="col-sm-12">
                        <p><i>Describe scale and scute abnormalities, condition of turtle, etc.</i></p>
                        <textarea class="form-control" name="notes" id="exampleFormControlTextarea1" rows="3" onChange={e => this.onChange(e)}></textarea>
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



export default Trident;
