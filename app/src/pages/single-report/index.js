import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import TagInputs from './tagInputs.js'
import SampleInputs from './sampleInputs.js'
import TimeInput from 'react-time-input';
import SubmitConfirmModal from '../../components/submit-confirm-modal';
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
      samplesList: [],
      tagsList: [],
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


    let _encounter = this.state.turtleData;
    const tagList = [];
    for (var i = 0; i < _encounter.tags.length; i++) {
      tagList.push({tag_number: _encounter.tags[i].tag_number, isNew: "", tag_type: _encounter.tags[i].tag_type, active: true, pit: ""})
    }

    this.setState({tagsList: tagList});
    console.log({tagsList: tagList});

    for (var i = 0; i < _encounter.tags.length; i++) {
      //tagsList[i]=tagList[i].tag_number;
      //this.setState({})
      console.log(tagList[i].tag_number);
    //  tagList[0][i] = tagList[i].tag_number;
      //console.log(tagList[0][i]);
    }

    const sampleList = [];
    for (var i = 0; i < _encounter.samples.length; i++) {
      sampleList.push({sample_type: _encounter.samples[i].sample_type, received_by: _encounter.samples[i].received_by })
    }

    this.setState({samplesList: sampleList});


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


    onChange = (e) => {

      if(["tag_number", "isNew", "tag_type", "active", "pit"].includes(e.target.name)){
        let tagsList = [...this.state.tagsList];
        let updatedValue = e.target.value;
        if (updatedValue === "true" || updatedValue == "false") {
          updatedValue = JSON.parse(updatedValue);
      }
        tagsList[e.target.dataset.id][e.target.name] = updatedValue;
        this.setState({ tagsList }, () => console.log(this.state.tagsList))
      } else if(["sample_type", "received_by", "purpose_of_sample", "notes"].includes(e.target.name)){
        let samplesList = [...this.state.samplesList];
        samplesList[e.target.dataset.id][e.target.name] = e.target.value;
        this.setState({ samplesList }, () => console.log(this.state.samplesList))
      } else {

        this.setState({ [e.target.name]: e.target.value })
    }
  }

  onTimeChangeHandler (n, e) {
    const v = e;
    console.log({[n]: v});
    this.setState({[n]: v});

  }

    addTagRow = (e) => {
      this.setState((prevState) => ({
        tagsList: [...prevState.tagsList, {tag_number: "", isNew: "", tag_type: "", active: true, pit: ""}],
      }));
    };

    addSampleRow = (e) => {
      this.setState((prevState) => ({
        samplesList: [...prevState.samplesList, {sample_type: "", received_by: "",purpose_of_sample: "", notes: "", entered_date: this.state.date, entered_by: ""}],
      }));
    };


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
      let { tagsList, samplesList, metadata} = this.state;


    //  const tagScars = [];
    //  for (var i = 0; i < tagScarsList.length; i++) {
    //    tagScarsList[i] = tagScarsList[i]==false ? 'No' : 'Yes';
    //    tagScars.push(<li className="list-group-item">{tagScarsList[i]}</li>)
    // }

      const incidentalCapturesList = [];
      for (var i = 0; i < _metadata.incidental_captures.length; i++) {
        incidentalCapturesList.push( <li>Incidental capture ID { _metadata.incidental_captures[i].incidental_capture_id }</li> )
      }

      const ndst = _metadata.nets[0] != null ? _metadata.nets[0].net_deploy_start_time : null;
      const ndet = _metadata.nets[0] != null ? _metadata.nets[0].net_deploy_end_time : null;
      const nrst = _metadata.nets[0] != null ? _metadata.nets[0].net_retrieval_start_time : null;
      const nret = _metadata.nets[0] != null ? _metadata.nets[0].net_retrieval_end_time : null;


      const ics = _metadata.incidental_captures[0] != null ? _metadata.incidental_captures[0].species : null;
      const ict = _metadata.incidental_captures[0] != null ? _metadata.incidental_captures[0].capture_time : null;
      const icm = _metadata.incidental_captures[0] != null ? _metadata.incidental_captures[0].measurement : null;
      const icn = _metadata.incidental_captures[0] != null ? _metadata.incidental_captures[0].notes : null;




      displayBlock = (
        <div>
          <h3>MTRG - View report #{ this.state.encounterNum }</h3>
          <p>Here we display the values of the report.</p>

          <div className="fullform">

              <h1><b>LAGOON DATA SHEET</b></h1>

              <form action="" onSubmit={this.handleSubmit} onChange={this.onChange} >
              <div className="justify-content-center row pb-2 pt-2">
              <div className="col-sm-10 mr-2 ml-2 border pr-5 pl-5 pb-3 pt-3">

              <div className="border-bottom">
              <div className="form-row">
                <div className="col-sm-6 text-left">

              <div className="form-row">
              <label htmlFor="species" className="col-2 col-form-label">Species:</label>
                  <div className="col-5">
                  <select className="form-control" name="species" value={ _encounter.species }>
                    <option></option>
                     <option value="Caretta caretta">Caretta caretta</option>
                     <option value="Chelonia mydas">Chelonia mydas</option>
                     <option value="Chelonia mydas">Eretmochelys imbricata</option>
                     <option value="Chelonia mydas">Lepidochelys kempii</option>
                     <option value="Chelonia mydas">Lepidochelys olivacea</option>
                     <option value="hybrid">hybrid</option>
                   </select>
                  </div>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="hybrid" value={ _encounter.species != ("hybrid" || "") ? "hybrid" : _encounter.species} name="species_other"/>
                  </div>
              </div>

                  <br></br>



              <div className="form-row">
                <div className="form-group col-md-5">
                  <label htmlFor="date">Encounter Date:</label>
                      <input className="form-control" type="date" name="encounter_date" value={ _encounter.encounter_date } onChange={e => this.onChange(e)}/>
                </div>
              <div className="form-group col-md-3">
                <label htmlFor="capture-time">Capture Time:</label>
                    <TimeInput className="form-control"
                      name="encounter_time"
                      initTime= {_encounter.encounter_time }
                      onTimeChange={(e) => this.onTimeChangeHandler("encounter_time", e)}
                    />
                  </div>
              <div className="form-group col-md-4">
                <label htmlFor="capture-type">Capture Type:</label>
                <input className="form-control" disabled value={ _encounter.capture_type } name="capture_type" />

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


              <TagInputs add={this.addTagRow} tagsList={tagsList} />
              <button onClick={this.addTagRow} type="button" className="btn btn-primary text-center" tagsList={tagsList}>ADD NEW TAGS</button>


              <div className="form-row pt-3">
                <div className="form-group col-md-4">
                  <label htmlFor="date">Tag Scars:</label>
                  <select className="form-control" name="scanned" value={_encounter.tag_scars}>
                  <option></option>
                     <option value="LF Scar">LF Scar</option>
                     <option value="RF Scar">RF Scar</option>
                     <option value="RR Scar">RR Scar</option>
                     <option value="Both scarred">Both scarred</option>
                     <option value="No scar">No scar</option>
                     <option value="Unreported">Unreported</option>
                   </select>
                   </div>
              <div className="form-group col-md-4">
                <label htmlFor="capture-time">Scanned:</label>
                <select className="form-control" name="scanned" value={ _encounter.scanned }>
                <option></option>
                   <option value="true">Yes</option>
                   <option value="false">No</option>
                 </select>              </div>
              <div className="form-group col-md-4">
                <label htmlFor="capture-type">Living Tags:</label>
                <select className="form-control" name="living_tags" value={ _encounter.living_tags }>
                <option></option>
                   <option value="true">Yes</option>
                   <option value="false">No</option>
                 </select>
                </div>
              </div>


                <h4>Morphometrics:</h4>

                <div className="container border pt-3 mb-3">

                  <div className="form-row">
                  <div className="col-md-6">

                  <div className="row mb-3">
                    <div className="col-md-6 pr-0">
                      <label htmlFor="curved-length">Curved Length:</label>
                      <input className="form-control" type="text" name="curved_length" value={ _encounter.morphometrics[0].curved_length } placeholder="in cm"/>
                      </div>
                      <div className="col-md-6 pl-0">
                      <label htmlFor="curved-length">over barnacles:</label>
                      <select className="form-control" name="curved_length_over_barnacles" value={ _encounter.morphometrics[0].curved_length_over_barnacles } value={this.state.value}>
                      <option></option>
                         <option value="true">Yes</option>
                       </select>
                       </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="straight-length">Straight Length (notch-tip):</label>
                      <input className="form-control" type="text" name="straight_length" value={ _encounter.morphometrics[0].straight_length } placeholder="in cm"/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="min-length">Minimum Length (notch-notch):</label>
                      <input type="form-control" name="minimum_length" value={ _encounter.morphometrics[0].minimum_length } className="form-control" placeholder="in cm"/>
                    </div>


                    <div className="row mb-3">
                    <div className="col-md-6 pr-0">
                      <label htmlFor="curved-width">Plastron Length:</label>
                      <input type="form-control" name="plastron_length" value={ _encounter.morphometrics[0].plastron_length } className="form-control" placeholder="in cm"/>
                      </div>
                      <div className="col-md-6 pl-0">
                      <label htmlFor="curved-width">over barnacles:</label>
                      <select className="form-control" name="plastron_length_over_barnacles" value={ _encounter.morphometrics[0].plastron_length_over_barnacles } value={this.state.value}>
                      <option></option>
                         <option value="true">Yes</option>
                       </select>
                       </div>
                    </div>


                    <div className="form-group">
                      <label htmlFor="weight">Weight in kg:</label>
                      <input type="form-control" name="weight" className="form-control" value={ _encounter.morphometrics[0].weight } placeholder="in kg"/>
                    </div>

                    <div className="form-group">
                    <label htmlFor="sex">Sex:</label>
                    <select className="form-control" name="sex" value={ _encounter.morphometrics[0].sex }>
                    <option></option>
                       <option value="true">Male</option>
                       <option value="false">Female</option>
                     </select>
                    </div>


                    </div>
                    <div className="col-md-6">

                    <div className="form-group">

                    <div className="row mb-3">
                    <div className="col-md-6 pr-0">
                      <label htmlFor="curved-width">Curved Width:</label>
                      <input className="form-control" type="text" name="curved_width" value={ _encounter.morphometrics[0].curved_width } placeholder="in cm"/>
                      </div>
                      <div className="col-md-6 pl-0">
                      <label htmlFor="curved-width">over barnacles:</label>
                      <select className="form-control" name="curved_width_over_barnacles" value={ _encounter.morphometrics[0].curved_width_over_barnacles}>
                      <option></option>
                         <option value="true">Yes</option>
                       </select>
                       </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="straight-width">Straight Width:</label>
                      <input type="form-control" name="straight_width" className="form-control" value={ _encounter.morphometrics[0].straight_width } placeholder="in cm"/>
                    </div>

                      <label htmlFor="tail-length">Tail Length: PL-vent</label>
                      <input type="form-control" name="tail_length_pl_vent" value={ _encounter.morphometrics[0].tail_length_pl_vent } className="form-control" placeholder="in cm"/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="pl-tip">PL-Tip:</label>
                      <input type="form-control" name="tail_length_pl_tip"  value={ _encounter.morphometrics[0].tail_length_pl_tip } className="form-control" placeholder="in cm"/>
                    </div>

                    <div className="form-group">
                      <label htmlFor="head-width">Head Width (straight):</label>
                      <input type="form-control" name="head_width" className="form-control" value={ _encounter.morphometrics[0].head_width } placeholder="in cm"/>
                    </div>


                    <div className="row mb-3">
                    <div className="col-md-6 pr-0">
                    <label htmlFor="body-depth">Body Depth:</label>
                      <input type="form-control" name="body_depth" className="form-control" value={ _encounter.morphometrics[0].body_depth }  placeholder="in cm"/>
                      </div>
                      <div className="col-md-6 pl-0">
                      <label htmlFor="curved-width">over barnacles:</label>
                      <select className="form-control" name="body_depth_over_barnacles" value={ _encounter.morphometrics[0].body_depth_over_barnacles}>
                      <option></option>
                         <option value="true">Yes</option>
                       </select>
                       </div>
                    </div>


                  </div>
                  </div>
                  </div>


                </div>

                <div className="col-sm-6 pl-3 text-left">


                  <h4>Samples:</h4>

                  <div className="container border pt-3 mb-3 pb-3">

                  <SampleInputs add={this.addSampleRow} samplesList={samplesList} />
                  <button onClick={this.addSampleRow} type="button" className="btn btn-primary text-center mb-3" samplesList={samplesList}>ADD NEW SAMPLE</button>



                    <h5>Other Samples:</h5>
                    <div className="col-sm-10">
                    <textarea className="form-control" name="other" value={ _encounter.other } rows="2"></textarea>
                    </div>

                    </div>


                      <div className="form-group row">
                        <label htmlFor="paps" className="col-4 col-form-label">Paps:</label>
                            <div className="col-6">
                            <select className="form-control" name="pap_category" value={_encounter.pap_category}>
                            <option></option>
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
                          <select className="form-control" name="paps_regression" value={ _encounter.paps_regression } >
                          <option></option>
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
                          <select className="form-control" name="photos" value={ _encounter.photos } >
                          <option></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                           </select>
                          </div>
                        </div>

                        <div className="form-group row">
                          <label htmlFor="pap-photos" className="col-4 col-form-label">Pap Photos:</label>
                          <div className="col-6">
                          <select className="form-control" name="pap_photos" value={ _encounter.pap_photos } >
                          <option></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                           </select>
                          </div>
                        </div>


                          <div className="form-row">
                          <label htmlFor="example-text-input" className="col-3 col-form-label">Leeches:</label>
                              <div className="col-3">
                              <select className="form-control" name="leeches"  value={ _encounter.leeches }>
                              <option></option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                               </select>
                              </div>
                            <div className="col-4">
                              <input type="text" className="form-control" name="leeches_where" value={ _encounter.leeches_where } placeholder="Where"/>
                            </div>
                          </div>


                        <br></br>


                          <div className="form-row">
                          <label htmlFor="leech-eggs" className="col-3 col-form-label">Leech Eggs:</label>
                              <div className="col-3">
                              <select className="form-control" name="leech_eggs" value={ _encounter.leech_eggs }>
                              <option></option>
                                <option value="true">Yes</option>
                                <option value="false">No</option>
                               </select>
                              </div>
                            <div className="col-4">
                              <input type="text" className="form-control" placeholder="Where" value={ _encounter.leech_eggs_where } name="leech_eggs_where"/>
                            </div>
                          </div>


                        <br></br>

                        <h5>Flipper Damage:</h5>
                          <div className="col-sm-12 mb-3">
                          <textarea className="form-control" name="flipper_damage" value={ _encounter.morphometrics[0].flipper_damage } rows="3"></textarea>
                          </div>

                        <h5>Shell Damage:</h5>
                          <div className="col-sm-12 mb-3">
                          <textarea className="form-control" name="carapace_damage" value={ _encounter.morphometrics[0].carapace_damage } rows="3"></textarea>
                          </div>

                          </div>
                          </div>
                        </div>

                        <div class="row pt-2">

                        <div className="col-md-6 text-left">
                        <h4>Notes:</h4>
                          <div className="col-sm-12">
                          <p><i>Describe scale and scute abnormalities, condition of turtle, etc.</i></p>
                          <textarea className="form-control" name="notes_2" rows="3" value={ _encounter.notes }></textarea>
                          </div>

                          <br></br>

                        </div>

                        <div className="col-md-6 text-left">
                        <h4>Upload Files:</h4> <br></br>
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text" >Upload PDF</span>
                            </div>
                            <div className="custom-file">
                              <input type="file" className="custom-file-input" name="pdfFile" aria-describedby="inputGroupFileAddon01" onChange={this.handlePDFInputChange}/>
                              <label className="custom-file-label">Choose file</label>
                            </div>
                          </div>

                          <div className="input-group pt-3">
                            <div className="input-group-prepend">
                              <span className="input-group-text" >Upload Image</span>
                            </div>
                            <div className="custom-file">
                              <input type="file" className="custom-file-input" name="picFile" aria-describedby="inputGroupFileAddon01" onChange={this.handlePicInputChange}/>
                              <label className="custom-file-label">Choose file</label>
                            </div>
                          </div>

                        </div>
                      </div>
                    </div>
                </div>

                <SubmitConfirmModal
                  show={this.state.modalIsShowing}
                  // redirectURL="/home"
                />
              </form>

            </div>

            <div className="fullform">
            <h1><b>LAGOON METADATA</b></h1>
            <form onSubmit={this.handleSubmit}>


            <div className="justify-content-center row pb-2 pt-2">
            <div className="col-sm-10 mr-2 ml-2 border pr-3 pl-3 pb-3 pt-3">

            <div className="row text-left">
              <div className="col-sm-5">

              <div className="form-group row">
                <label htmlFor="date" className="col-4 col-form-label">Date</label>
                <div className="col-7">
                  <input className="form-control" type="date" value={ _metadata.metadata_date } name="metadata_date" onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="location" className="col-4 col-form-label">Location</label>
                <div className="col-7">
                  <input className="form-control" type="text" name= "metadata_location" value={ _metadata.metadata_location } value={ _encounter.investigated_by } onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="investigators" className="col-4 col-form-label">Investigators</label>
                <div className="col-7">
                  <input className="form-control" type="text" name= "metadata_investigators" value={ _encounter.investigated_by } onChange={e => this.onChange(e)} />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="investigators" className="col-4 col-form-label">Time</label>
                <div className="col-7">
                  <TimeInput className="form-control"
                    name="environment_time"
                    initTime={ _metadata.environment_time}
                    placeholder="--:--"
                    onTimeChange={(e) => this.onTimeChangeHandler("environment_time", e)}
                  />
                </div>
              </div>


              <div className="form-row">
                <div className="form-group col-md-5">
                  <label htmlFor="data-entered-by">Data Entered By:</label>
                  <input className="form-control" type="text" value={ _encounter.entered_by } name="entered_by" onChange={e => this.onChange(e)}/>
                </div>
                <div className="form-group col-md-5">
                  <label htmlFor="data-entered-date">Data Entered Date:</label>
                  <input className="form-control" type="date"  value={ _encounter.entered_date } name="entered_date" onChange={e => this.onChange(e)} />
                  </div>
              </div>



              <h5><b>Turtle Capture Data: </b></h5>

              <div class="container border pt-3 mb-3">

                <div className="form-group row">
                  <label htmlFor="cc-number" className="col-4 col-form-label">Caretta caretta:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name="number_of_cc_captured" value={ _metadata.number_of_cc_captured } onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="cm-number" className="col-4 col-form-label">Chelonia mydas:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name= "number_of_cm_captured" value={ _metadata.number_of_cm_captured }  onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="other-number" className="col-4 col-form-label">Other:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name= "number_of_other_captured" value={ _metadata.number_of_other_captured } onChange={e => this.onChange(e)} />
                  </div>
                </div>

              </div>

              <h5><b>Net Set Data: </b></h5>

              <div class="container border pt-3 mb-3">

              <h5><b>Net Deploy: </b></h5>

              <div className="form-group row">
                <label htmlFor="net-start" className="col-4 col-form-label">Start:</label>
                <div className="col-6">

                <TimeInput className="form-control"
                  ref="tref"
                  initTime={ndst}
                  name="net_deploy_start_time"
                  placeholder="--:--"
                  onTimeChange={(e) => this.onTimeChangeHandler("net_deploy_start_time", e)}
                />


                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="net-end" className="col-4 col-form-label">End:</label>
                <div className="col-6">
                <TimeInput className="form-control"
                initTime={ndet}
                  name="net_deploy_end_time"
                  placeholder="--:--"
                  onTimeChange={(e) => this.onTimeChangeHandler("net_deploy_end_time", e)}
                />

                </div>
              </div>

              <h5><b>Net Retreival: </b></h5>

              <div className="form-group row">
                <label htmlFor="net-start" className="col-4 col-form-label">Start:</label>
                <div className="col-6">
                <TimeInput className="form-control"
                initTime={nrst}
                  name="net_retrieval_start_time"
                  placeholder="--:--"
                  onTimeChange={(e) =>this.onTimeChangeHandler("net_retrieval_start_time", e)}
                />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="net-end" className="col-4 col-form-label">End:</label>
                <div className="col-6">
                <TimeInput className="form-control"
                initTime={nret}
                  name="net_retrieval_end_time"
                  placeholder="--:--"
                  onTimeChange={(e) => this.onTimeChangeHandler("net_retrieval_end_time", e)}
                />
                </div>
              </div>
            </div>
              </div>
              <div className="col-sm-7">

              <h5><b>Environmental Data: </b></h5>

              <div class="container border pt-3 mb-3">

                    <div className="form-row">
                      <div className="form-group col-md-3">
                        <label htmlFor="water-sample">Water Sample:</label>
                            <select className="form-control" name="water_sample" value={ _metadata.water_sample} onChange={e => this.onChange(e)}>
                            <option></option>
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                            </select>
                        </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="wind-spd">Wind Spd:</label>
                        <input className="form-control" type="text" name="wind_speed" value={ _metadata.wind_speed} onChange={e => this.onChange(e)} />
                        </div>
                      <div className="form-group col-md-3">
                      <label htmlFor="wind-spd">mph or m/s</label>
                            <select className="form-control" name="wind_speed_types" value={ _metadata.wind_speed_types} onChange={e => this.onChange(e)}>
                            <option></option>
                            <option value="mph">mph</option>
                            <option value="m/s">m/s</option>
                            </select>
                        </div>
                      <div className="form-group col-md-3">
                        <label htmlFor="wind-dir">Wind Dir:</label>
                        <input className="form-control" type="text" name="wind_dir"  value={ _metadata.wind_dir} onChange={e => this.onChange(e)} />
                        </div>

                    </div>



                    <div className="form-row">
                      <div className="form-group col-md-4">
                        <label htmlFor="weather">Weather:</label>
                        <select className="form-control" name="weather" value={ _metadata.weather} onChange={e => this.onChange(e)}>
                          <option value=""></option>
                          <option value="Sunny">Sunny</option>
                          <option value="Partly Cloudy">Partly Cloudy</option>
                          <option value="Overcast">Overcast</option>
                          <option value="Rain">Rain</option>
                        </select>
                        </div>
                      <div className="form-group col-md-4">
                        <label htmlFor="other-weather">other:</label>
                        <input className="form-control" type="text" name="weather_other" value={ _metadata.weather=="" ?  _metadata.other : "other"} placeholder="other weather" onChange={e => this.onChange(e)} />
                        </div>

                      <div className="form-group col-md-4">
                        <label htmlFor="other-weather">Air Temp:</label>
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
                            <input className="form-control" type="text" name="water_temp_2_m"  value={ _metadata.water_temp_2_m} onChange={e => this.onChange(e)} />
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
                          <input className="form-control" type="text" name="salinity_bottom" value={ _metadata.salinity_bottom} onChange={e => this.onChange(e)} />
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

                <h5><b>Incidental Captures: </b></h5>
                <div class="container border pt-3 mb-3">

                <div className="form-group row">
                  <label htmlFor="incidental-species" className="col-4 col-form-label">Species:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name="species" value={ics} onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="incidental-time" className="col-4 col-form-label">Time:</label>
                  <div className="col-6">
                  <TimeInput className="form-control"
                    name="capture_time"
                    initTime={ict}
                    placeholder="--:--"
                    onTimeChange={(e) => this.onTimeChangeHandler("capture_time", e)}
                  />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="incidental-measurement" className="col-4 col-form-label">Measurement:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name="measurement" value={icm} onChange={e => this.onChange(e)} />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="incidental-notes" className="col-4 col-form-label">Notes:</label>
                  <div className="col-6">
                    <input className="form-control" type="text" name="notes" value={icn} onChange={e => this.onChange(e)} />
                  </div>
                </div>
                </div>

                </div>
            </div>
            </div>
            </div>

            {this.renderRedirect()}
            <button type="submit" className="btn btn-primary">SUBMIT</button>

            </form>

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

        <style type="text/css">
            {`
            .fullform {
              zoom: 70%;
            }
            `}
          </style>


        { displayBlock }
        <InternalFooter />
      </>
    )
  }
}


export default SingleReport;
