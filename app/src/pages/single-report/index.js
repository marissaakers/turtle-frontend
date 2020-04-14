import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import turtleimg from '../images/lagoonturtle.png';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import LoadingSpinner from '../../components/loading-spinner';

const TITLE = 'MTRG - View report'

class SingleReport extends React.Component {
  constructor(props) {
    super(props);

    var theData;
    this.state = {
      turtleData: undefined,
      metadata: undefined,
      id: undefined
    };
  }

  async loadEncounter(json) {
    console.log("loadEncounter sent JSON = " + json);

    const turtleData = await axios.post(
      'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/lagoon/query',
      json,
      { headers: {'Content-Type': 'application/json'} }
    );

    this.setState({turtleData: turtleData.data});
    // console.log("this.state.turtleData = ");
    // console.log(this.state.turtleData);
  }

  async loadMetadata(json) {
    console.log("loadMetadata sent JSON = " + json);

    const metadata = await axios.post(
      'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/lagoon/metadata/query',
      json,
      { headers: {'Content-Type': 'application/json'} }
    );

    this.setState({metadata: metadata.data});
    // console.log("this.state.metadata = ");
    // console.log(this.state.metadata);
    // this.setState({id: this.state.metadata.encounter_id});
    // console.log(this.state.metadata.encounter_id)

  }

  async loadReport(encounterJson, metadataJson) {
    this.setState({isLoading: true});

    await Promise.all([ this.loadEncounter(encounterJson), this.loadMetadata(metadataJson) ]);
    // await this.loadEncounter(encounterJson);
    // await this.loadMetadata(metadataJson);
    this.setState({isLoading: false});
  }

  async componentDidMount () {

    // JSON post query requires one of the following fields:
    // {
    //     "turtle_ids": [ 431, 432, 433 ],
    //     "tags" : [ "ABCDEF", "LMNOP"]
    //     "encounter_id": 866
    // }

    console.log(this.state.id);

    let encounterJson = "{ \"encounter_id\": " + this.props.location.state.encounterId + "}";
    let metadataJson = '{ "metadata_id": ' + this.props.location.state.metadataId + '}';


    console.log(encounterJson);
    console.log(metadataJson);
    this.loadReport(encounterJson, metadataJson);
  }



  renderRedirect = () => {
   if (this.state.redirect) {
     return <Redirect to='/edit/lagoon/' />
   }
 }

   handleSubmit = async(e) => {
        e.preventDefault();
        this.setState({redirect:true})


      }

  render() {
    let displayBlock;

    if (this.props.location.state.encounterId < 0 || this.state.isLoading
        || this.state.turtleData === undefined) {
      displayBlock = (
        <div>
          <LoadingSpinner />
        </div>
      )
    }

    else {
      let _encounter = this.state.turtleData;
      let _metadata = this.state.metadata;

      const tagsList = [];
      const tagTypeList= [];
      const tagScarsList = [];
      const pitTagsList = [];
      for (var i = 0; i < _encounter.tags.length; i++) {
        tagsList.push( <li className="list-group-item">{ _encounter.tags[i].tag_number }</li> )
        tagTypeList.push( <li className="list-group-item">{ _encounter.tags[i].tag_type }</li> )
        tagScarsList.push( <li className="list-group-item"> {_encounter.tags[i].tag_scars} </li> )
        pitTagsList.push( <li className="list-group-item">{ _encounter.tags[i].scanner_number }</li> )
      }

      const tagScars = [];
      for (var i = 0; i < tagScarsList.length; i++) {
        tagScarsList[i] = tagScarsList[i]==false ? 'No' : 'Yes';
        tagScars.push(<li className="list-group-item">{tagScarsList[i]}</li>)

      }
      const incidentalCapturesList = [];
      for (i = 0; i < _metadata.incidental_captures.length; i++) {
        incidentalCapturesList.push( <li>Incidental capture ID { _metadata.incidental_captures[i].incidental_capture_id }</li> )
      }
      const sampleTypeList = [];
      const samplePurposeList = [];
      const sampleReceivedList = [];
      const sampleNotesList = [];
      for (i = 0; i < _encounter.samples.length; i++) {
        sampleTypeList.push( <li className="list-group-item">{ _encounter.samples[i].sample_type }</li> )
        samplePurposeList.push( <li className="list-group-item">{ _encounter.samples[i].purpose_of_sample }</li>)
        sampleReceivedList.push( <li className="list-group-item">{ _encounter.samples[i].received_by }</li>)
        sampleNotesList.push( <li className="list-group-item">{ _encounter.samples[i].notes }</li> )

      }

      displayBlock = (
        <div>
          <h3>MTRG - View report #{ this.state.encounterNum }</h3>
          <p>Here we display the values of the report.</p>



      <div className="justify-content-center row pb-2 pt-2">
          <div className="col-sm-10 mr-2 ml-2 border pr-5 pl-5 pb-3 pt-3">

          <div className="form-row">
            <div className="col-sm-6 text-left">

          <div className="form-row">
          <label htmlFor="species" className="col-3 col-form-label">Species:</label>
            <div className="col-5">
              <input type="text" className="form-control" value={ _encounter.species } name="species" onChange={e => this.onChange(e)}/>
            </div>
          </div>

              <br></br>



          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="date">Encounter Date:</label>
                  <input className="form-control" type="date" value={ _encounter.encounter_date } name="encounter_date" onChange={e => this.onChange(e)}/>
            </div>
          <div className="form-group col-md-3">
            <label htmlFor="capture-time">Capture Time:</label>
                  <input className="form-control" type="time" value={ _encounter.encounter_time } name="encounter_time" onChange={e => this.onChange(e)} />
              </div>
          <div className="form-group col-md-3">
            <label htmlFor="capture-type">Capture Type:</label>
            <input className="form-control" type="ext" value={ _encounter.capture_type } name="capture_type" onChange={e => this.onChange(e)} />
            </div>
          </div>


          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="data-entered-by">Data Entered By:</label>
              <input className="form-control" type="text" value={ _encounter.entered_by }name="entered_by" onChange={e => this.onChange(e)}/>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="data-entered-date">Data Entered Date:</label>
              <input className="form-control" type="date"  value={ _encounter.entered_date } name="entered_date" onChange={e => this.onChange(e)} />
              </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-5">
              <label htmlFor="data-verified-by">Data Verified By:</label>
              <input className="form-control" type="text" value={ _encounter.verified_by } name="verified_by" onChange={e => this.onChange(e)}/>
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="data-verified-date">Data Verified Date:</label>
              <input className="form-control" type="date" value={ _encounter.verified_date } name="verified_date" onChange={e => this.onChange(e)} />
              </div>
          </div>

          <h4>Tags:</h4>
          <div className="container border mb-3">

          <div className="form-group row">
            <label htmlFor="tag-numbers" className="col-3 col-form-label">Tag #:</label>
            <label htmlFor="tag-type" className="col-2 col-form-label">Tag Type:</label>
            <label htmlFor="tag-type" className="col-2 col-form-label">Tag Scars:</label>
            <label htmlFor="tag-type" className="col-2 col-form-label">Scanned:</label>
            <label htmlFor="tag-type" className="col-3 col-form-label">Pit Tag #:</label>

            <div className="col-3 pr-0 pl-1 ml-0 mr-0">
            <ul className="list-group pl-0 ml-0">
            {tagsList}
            </ul>
            </div>
            <div className="col-2">
            <ul className="list-group">
            { tagTypeList }
            </ul>
            </div>
            <div className="col-2">
            <ul className="list-group">
            { tagScars }
            </ul>
            </div>
            <div className="col-2">
            <ul className="list-group">
            { tagScars }
            </ul>
            </div>
            <div className="col-3">
            <ul className="list-group">
            { pitTagsList }
            </ul>
            </div>
          </div>

          </div>

          <div className="form-group row">
            <label htmlFor="living-tags" className="col-3 col-form-label">Living Tags:</label>
            <div className="col-3">
              <input className="form-control" type="text" name="living_tags" value={ _encounter.living_tags } onChange={e => this.onChange(e)}/>

            </div>
          </div>




            <h4>Morphometrics:</h4>

            <div className="container border pt-3 mb-3">

              <div className="form-row">
                <div className="form-group col-md-6">
                  <label htmlFor="curved-length">Curved Length (notch-tip):</label>
                  <input className="form-control" type="text" value={ _encounter.morphometrics[0].curved_length } name="curved_length" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="curved-width">Curved Width (widest):</label>
                  <input className="form-control" type="text" value={ _encounter.morphometrics[0].curved_width } name="curved_width" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="straight-length">Straight Length (notch-tip):</label>
                  <input className="form-control" type="text" name="straight_length" value={ _encounter.morphometrics[0].straight_length } placeholder="in cm" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="straight-width">Straight Width (widest):</label>
                  <input type="form-control" name="straight_width" value={ _encounter.morphometrics[0].straight_width } className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="min-length">Minimum Length (notch-notch):</label>
                  <input type="form-control" name="minimum_length" value={ _encounter.morphometrics[0].minimum_length } className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="tail-length">Tail Length: PL-vent</label>
                  <input type="form-control" name="tail_length_pl_vent" className="form-control" value={ _encounter.morphometrics[0].tail_length_pl_vent } placeholder="in cm" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="plastron-length">Plastron Length (tape):</label>
                  <input type="form-control" name="plastron_length" className="form-control" placeholder="in cm" value={ _encounter.morphometrics[0].plastron_length } onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="pl-tip">PL-Tip:</label>
                  <input type="form-control" name="tail_length_pl_tip" className="form-control" placeholder="in cm" value={ _encounter.morphometrics[0].tail_length_pl_tip } onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="weight">Weight in kg: *tare scale</label>
                  <input type="form-control" name="weight" className="form-control" placeholder="in kg" value={ _encounter.morphometrics[0].weight }onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="head-width">Head Width (straight):</label>
                  <input type="form-control" name="head_width" value={ _encounter.morphometrics[0].head_width } className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-6">

                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="body-depth">Body Depth (straight):</label>
                  <input type="form-control" name="body_depth" value={ _encounter.morphometrics[0].body_depth } className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                </div>
              </div>
              </div>


            </div>

            <div className="col-sm-6 pl-3 text-left">


              <h4>Samples:</h4>

              <div className="container border pt-3 mb-3 pb-3">

              <div className="form-row">
              <label htmlFor="samples" className="col-2 col-form-label">Type:</label>
              <label htmlFor="samples" className="col-2 col-form-label">Recieved by:</label>
              <label htmlFor="samples" className="col-4 col-form-label">Purpose:</label>
              <label htmlFor="samples" className="col-4 col-form-label">Notes:</label>

        </div>


                <div className="form-row mb-3">
                <div className="col-2">
                <ul className="list-group">
                { sampleTypeList }
                </ul>
                </div>

                <div className="col-2">
                <ul className="list-group">
                  { sampleReceivedList }
                </ul>
                </div>

                <div className="col-4">
                <ul className="list-group">
                  { samplePurposeList }
                </ul>
                </div>

                  <div className="col-4">
                  <ul className="list-group">
                    { sampleNotesList }
                  </ul>
                  </div>
                </div>


                <h5>Other Samples:</h5>
                <div className="col-sm-10">
                <textarea className="form-control" name="other" rows="2" onChange={e => this.onChange(e)}>{ _encounter.other }</textarea>
                </div>


                </div>


                  <div className="form-group row">
                    <label htmlFor="paps" className="col-4 col-form-label">Paps:</label>
                        <div className="col-6">
                        <select className="form-control" name="pap_category" value={_encounter.pap_category} onChange={e => this.onChange(e)}>
                        <option>-</option>
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                        </select>
                        </div>
                  </div>

                    <div className="form-group row">
                      <label htmlFor="regression" className="col-4 col-form-label">Regression:</label>
                      <div className="col-6">
                      <select className="form-control" name="paps_regression" value={ _encounter.paps_regression } onChange={e => this.onChange(e)}>
                      <option>-</option>
                         <option value="Yes">Yes</option>
                         <option value="No">No</option>
                         <option value="Other">Other</option>
                         <option value="Partial">partial</option>
                         <option value="Complete">complete</option>
                       </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="photos" className="col-4 col-form-label">Photos:</label>
                      <div className="col-6">
                      <select className="form-control" name="photos" value={ _encounter.photos } onChange={e => this.onChange(e)}>
                      <option>Yes/No</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label htmlFor="pap-photos" className="col-4 col-form-label">Pap Photos:</label>
                      <div className="col-6">
                      <select className="form-control" name="pap_photos" value={ _encounter.pap_photos } onChange={e => this.onChange(e)}>
                      <option>Yes/No</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    </div>


                      <div className="form-row">
                      <label htmlFor="example-text-input" className="col-3 col-form-label">Leeches:</label>
                          <div className="col-3">
                          <select className="form-control" name="leeches" value={ _encounter.leeches } onChange={e => this.onChange(e)}>
                          <option>Yes/No</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                           </select>
                          </div>
                        <div className="col-4">
                          <input type="text" className="form-control" name="leeches_where" value={ _encounter.leeches_where } placeholder="Where" onChange={e => this.onChange(e)}/>
                        </div>
                      </div>


                    <br></br>


                      <div className="form-row">
                      <label htmlFor="leech-eggs" className="col-3 col-form-label">Leech Eggs:</label>
                          <div className="col-3">
                          <select className="form-control" name="leech_eggs" value={ _encounter.leech_eggs } onChange={e => this.onChange(e)}>
                          <option>Yes/No</option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                           </select>
                          </div>
                        <div className="col-4">
                          <input type="text" className="form-control" placeholder="Where" value={ _encounter.leech_eggs_where } name="leech_eggs_where" onChange={e => this.onChange(e)}/>
                        </div>
                      </div>


                    <br></br>

                    <h5>Flipper Damage:</h5>
                      <div className="col-sm-12 mb-3">
                      <textarea className="form-control" name="flipper_damage" rows="3" onChange={e => this.onChange(e)}>{ _encounter.morphometrics[0].flipper_damage }</textarea>
                      </div>

                    <h5>Shell Damage:</h5>
                      <div className="col-sm-12 mb-3">
                      <textarea className="form-control" name="carapace_damage"  rows="3" onChange={e => this.onChange(e)}>{ _encounter.morphometrics[0].carapace_damage }</textarea>
                      </div>
                    <h4>Notes:</h4>
                      <div className="col-sm-12">
                      <p><i>Describe scale and scute abnormalities, condition of turtle, etc.</i></p>
                      <textarea className="form-control" name="notes" rows="3" onChange={e => this.onChange(e)}>{ _encounter.notes }</textarea>
                      </div>


                      </div>
                  </div>

                  {this.renderRedirect()}
                  <button type="SUBMIT"  className="btn btn-primary mt-3 mb-3">EDIT FORM</button>
                </div>
            </div>

            <h5>METADATA</h5>

            <div className="justify-content-center row pb-2 pt-2">
            <div className="col-sm-10 mr-2 ml-2 border pr-3 pl-3 pb-3 pt-3">

            <div className="row text-left">
              <div className="col-sm-5">

              <div className="form-group row">
                <label htmlFor="date" className="col-4 col-form-label">Date</label>
                <div className="col-6">
                  <input className="form-control" type="date" name="metadata_date" value={ _metadata.metadata_date } onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="location" className="col-4 col-form-label">Location</label>
                <div className="col-6">
                  <input className="form-control" type="text" name= "metadata_location" value={ _metadata.metadata_location } onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="investigators" className="col-4 col-form-label">Investigators</label>
                <div className="col-8">
                  <input className="form-control" type="text" name= "metadata_investigators" value={ _encounter.investigated_by }  onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="investigators" className="col-4 col-form-label">Entered by</label>
                <div className="col-6">
                  <input className="form-control" type="text" name= "entered_by"  onChange={e => this.onChange(e)} />
                </div>
              </div>


              <h5><b>Turtle Capture Data: </b></h5>

              <div class="container border pt-3 mb-3">

                <div className="form-group row">
                  <label htmlFor="cc-number" className="col-4 col-form-label">Cc:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name="number_of_cc_captured" value={ _metadata.number_of_cc_captured } onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="cm-number" className="col-4 col-form-label">Cm:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name= "number_of_cm_captured" value={ _metadata.number_of_cm_captured } onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="other-number" className="col-4 col-form-label">Other:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name= "number_of_other_captured" onChange={e => this.onChange(e)} value={ _metadata.number_of_other_captured } />
                  </div>
                </div>

              </div>

              <h5><b>Net Set Data: </b></h5>

              <div class="container border pt-3 mb-3">

              <h5><b>Net Deploy: </b></h5>
              <div className="form-group row">
                <label htmlFor="net-start" className="col-4 col-form-label">Start:</label>
                <div className="col-6">
                <input className="form-control" type="time" name="net_deploy_start_time"   onChange={e => this.onChange(e)} />
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
                <input className="form-control" type="time" name="net_retrieval_start_time"  id="example-time-input" onChange={e => this.onChange(e)} />
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
                            <select className="form-control" name="water_sample" value={ _metadata.water_sample} onChange={e => this.onChange(e)}>
                            <option value="1">Yes</option>
                            <option value="0">No</option>
                            </select>
                        </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="wind-spd">Wind Spd:</label>
                        <input className="form-control" type="text" name="wind_speed" value={ _metadata.wind_speed} onChange={e => this.onChange(e)} />
                        </div>
                      <div className="form-group col-md-2">
                        <label htmlFor="wind-dir">Wind Dir:</label>
                        <input className="form-control" type="text" name="wind_dir" value={ _metadata.wind_dir} onChange={e => this.onChange(e)} />
                        </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="environment_time">Time:</label>
                        <input className="form-control" type="time" name="environment_time" value={ _metadata.environment_time} onChange={e => this.onChange(e)}/>
                      </div>
                    </div>



                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="weather">Weather:</label>
                        <select className="form-control" name="weather" value={ _metadata.weather} onChange={e => this.onChange(e)}>
                          <option value="">-</option>
                          <option value="Sunny">Sunny</option>
                          <option value="Partly Cloudy">Partly Cloudy</option>
                          <option value="Overcast">Overcast</option>
                          <option value="Rain">Rain</option>
                        </select>
                        </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="other-weather">Other:</label>
                        <input className="form-control" type="text" name="weather_other" value={ _metadata.other} onChange={e => this.onChange(e)} />
                        </div>
                    </div>



                <div className="form-group row">
                      <label htmlFor="air-temp" className="col-2 col-form-label">Air Temp:</label>
                      <div className="col-3">
                          <input className="form-control" type="text" name="air_temp" value={ _metadata.air_temp} onChange={e => this.onChange(e)} />
                      </div>
                </div>




                  <div className="row">
                    <div className="col">

                        <h5><b>Water Temp: </b></h5>

                        <div className="form-group row">
                          <label htmlFor="surface-temp" className="col-4 col-form-label">Surface:</label>
                          <div className="col-6">
                            <input className="form-control" type="text" name="water_temp_surface" value={ _metadata.water_temp_surface} onChange={e => this.onChange(e)} />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label htmlFor="1m-temp" className="col-4 col-form-label">1m:</label>
                          <div className="col-6">
                            <input className="form-control" type="text" name="water_temp_1_m" value={ _metadata.water_temp_1_m} onChange={e => this.onChange(e)} />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label htmlFor="2m-temp" className="col-4 col-form-label">2m:</label>
                          <div className="col-6">
                            <input className="form-control" type="text" name="water_temp_2_m" value={ _metadata.water_temp_2_m} onChange={e => this.onChange(e)} />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label htmlFor="bottom-temp" className="col-4 col-form-label">Bottom:</label>
                          <div className="col-6">
                            <input className="form-control" type="text" name="water_temp_bottom" value={ _metadata.water_temp_bottom} onChange={e => this.onChange(e)} />
                          </div>
                        </div>


                    </div>
                    <div className="col">
                      <h5><b>Salinity: </b></h5>
                      <div className="form-group row">
                        <label htmlFor="surface-salinity" className="col-4 col-form-label">Surface:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="salinity_surface" value={ _metadata.salinity_surface} onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="1m-salinity" className="col-4 col-form-label">1m:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="salinity_1_m" value={ _metadata.salinity_1_m} onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="2m-salinity" className="col-4 col-form-label">2m:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="salinity_2_m" value={ _metadata.salinity_2_m} onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="bottom-salinity" className="col-4 col-form-label">Bottom:</label>
                        <div className="col-6">
                          <input className="form-control" type="text" name="salinity_bottom"  value={ _metadata.salinity_bottom} onChange={e => this.onChange(e)} />
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
                    <input className="form-control" type="text" name="species"  onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="incidental-time" className="col-4 col-form-label">Time:</label>
                  <div className="col-6">
                  <input className="form-control" type="time" name="capture_time"   onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="incidental-measurement" className="col-4 col-form-label">Measurement:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name="measurement"  onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="incidental-notes" className="col-4 col-form-label">Notes:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name="notes"   onChange={e => this.onChange(e)} />
                  </div>
                </div>
                </div>

                </div>
            </div>
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
        <p align="left" className="pl-4"><a href="/reports-list/">← back</a></p>

        { displayBlock }
        <InternalFooter />
      </>
    )
  }
}


export default SingleReport;
