import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link }from 'react-router-dom'
import ReactDOM from "react-dom";
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';
import TagInputs from '../lagoon/TagInputs'
import axios from "axios";

const TITLE = 'New Trident report'


class Trident extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      tags: [{tag_number: "", tag_type: "", active: null, tag_scars: "", pit: "", scanned: null, scanner_number: "" }],

      samples: [],
      data : [],
      metadata: undefined,
      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  async loadMetadata(json) {
    console.log("loadMetadata sent JSON = " + json);

    const metadata = await axios.post(
      'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/Trident/metadata/query',
      json,
      { headers: {'Content-Type': 'application/json'} }
    );

    this.setState({metadata: metadata.data});

    console.log("this.state.metadata = ");
    console.log(this.state.metadata);
    return (this.state.metadata.metadata_id)
  }



  onChange = (e) => {
    if (["tag_number", "tag_type","active","tag_scars","pit","scanned","scanner_number"].includes(e.target.className) ) {
      let tags = [...this.state.tags]
      tags[e.target.dataset.id][e.target.className] = e.target.value
      this.setState({ tags }, () => console.log(this.state.tags))
    } else {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  handleAddTags = (e) => {
    this.setState((prevState) => ({
      tags: [...prevState.tags, {tag_number: "", tag_type: "", active: null, tag_scars: "", pit: "", scanned: null, scanner_number: "" }],
    }));
  };

  handleRemoveTags = idx => () => {
    this.setState({
      tags: this.state.tags.filter((s, sidx) => idx !== sidx)
    });

  }



  handleSubmit = async(e) => {
       e.preventDefault();

       const getMetadataID = await this.loadMetadata({metadata_date: this.state.encounter_date})



       const data = {
        species: this.state.species,
        metadata_id: getMetadataID,
       	entered_date: this.state.entered_date,
       	entered_by: this.state.entered_by,
       	verified_date: this.state.verified_date,
       	verified_by: this.state.verified_by,
       	encounter_date: this.state.encounter_date,
       	encounter_time: this.state.encounter_time,
       	investigated_by: "me",
       	capture_type: this.state.capture_type,
       	living_tags: JSON.parse(this.state.living_tags),
       	pap_category: parseFloat(this.state.pap_category),
       	paps_present: JSON.parse("true"),
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
       			entered_date: this.state.entered_date,
       			entered_by: this.state.entered_by,
       		},
          {
         			sample_type: "Skin",
         			received_by: null,
         			purpose_of_sample: this.state.skin_sample,
         			notes: null,
         			entered_date: this.state.entered_date,
         			entered_by: this.state.entered_by,
         	},
          {
         			sample_type: "Scute",
         			received_by: null,
         			purpose_of_sample: this.state.scute_sample,
         			notes: null,
         			entered_date: this.state.entered_date,
         			entered_by: this.state.entered_by,
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
       			tag_type: "LF",
       			active: true,
       			tag_scars: JSON.parse(this.state.tag_scars),
       			pit: true,
       			scanned: JSON.parse(this.state.scanned),
       			scanner_number: "123456"
       		}]
       };

       console.log(data)



      axios.post('https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/Trident/insert',
      data, { headers: {'Content-Type': 'application/json'} })
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

    let _metadata = this.state.metadata;
    let {tags} = this.state

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>

        <div className="container-fluid">

            <h1><b>TRIDENT BASIN DATA SHEET</b></h1>

            <form action="" onSubmit={this.handleSubmit} onChange={this.handleChange} >
            <div className="justify-content-center row pb-2 pt-2">
            <div className="col-sm-10 mr-2 ml-2 border pr-5 pl-5 pb-3 pt-3">

            <div className="form-row">
              <div className="col-sm-6 text-left">

            <div className="form-row">
            <label htmlFor="species" className="col-3 col-form-label">Species:</label>
                <div className="col-2">
                <select className="form-control" name="species" value={this.value} onChange={e => this.onChange(e)}>
                   <option value="Cc">Cc</option>
                   <option value="Cm">Cm</option>
                   <option value="other">Other</option>
                 </select>
                </div>
              <div className="col-5">
                <input type="text" className="form-control" placeholder="other" name="species" onChange={e => this.onChange(e)}/>
              </div>
            </div>

                <br></br>



            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="date">Encounter Date:</label>
                    <input className="form-control" type="date" name="encounter_date" onChange={e => this.onChange(e)}/>
              </div>
            <div className="form-group col-md-3">
              <label htmlFor="capture-time">Capture Time:</label>
                    <input className="form-control" type="time" name="encounter_time" onChange={e => this.onChange(e)} />
                </div>
            <div className="form-group col-md-3">
              <label htmlFor="capture-type">Capture Type:</label>
                <select className="form-control" name="capture_type" value={this.state.value} onChange={e => this.onChange(e)} >
                    <option>New/Old/Strange</option>
                    <option value="New">New</option>
                    <option value="Old">Old</option>
                    <option value="Strange Recap">Strange Recap</option>
                </select>
              </div>
            </div>


            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="data-entered-by">Data Entered By:</label>
                <input className="form-control" type="text" name="entered_by" onChange={e => this.onChange(e)}/>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="data-entered-date">Data Entered Date:</label>
                <input className="form-control" type="date"  name="entered_date" onChange={e => this.onChange(e)} />
                </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-5">
                <label htmlFor="data-verified-by">Data Verified By:</label>
                <input className="form-control" type="text" name="verified_by" onChange={e => this.onChange(e)}/>
              </div>
              <div className="form-group col-md-5">
                <label htmlFor="data-verified-date">Data Verified Date:</label>
                <input className="form-control" type="date"  name="verified_date" onChange={e => this.onChange(e)} />
                </div>
            </div>


            <h4>Tags:</h4>

            <div class="container border pt-3 mb-3">


            <div className="form-row">
            <label htmlFor="species" className="col-2 col-form-label mb-3 mr-0 pr-0 no-gutters">Tag #:</label>
                <div className="col-2 pl-0">
                <input type="text" className="form-control" name="species" onChange={e => this.onChange(e)}/>
                </div>
            <label htmlFor="species" className="col-2 col-form-label mb-3">Tag Type:</label>
              <div className="col-2">
              <select className="form-control" name="tag_scars" value={this.value} onChange={e => this.onChange(e)}>
              <option>LF/RF</option>
                <option value="LF">LF</option>
                <option value="RF">RF</option>
               </select>
                             </div>
            <label htmlFor="species" className="col-2 col-form-label mb-3">Tag Scar:</label>
              <div className="col-2">
              <select className="form-control" name="tag_scars" value={this.value} onChange={e => this.onChange(e)}>
              <option>Y/N</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
               </select>
              </div>
            </div>

            <div className="form-row">
            <label htmlFor="species" className="col-2 col-form-label mb-3">Pit Tag:</label>
            <label htmlFor="species" className="col-2 col-form-label mb-3">Scanned:</label>
              <div className="col-2">
              <select className="form-control" name="scanned" value={this.value} onChange={e => this.onChange(e)}>
                <option>Y/N</option>
                <option value="true">Yes</option>
                <option value="false">No</option>
               </select>   </div>
            <label htmlFor="species" className="col-2 col-form-label mb-3">Pit Tag #:</label>
              <div className="col-4">
              <input className="form-control" type="text" name="scanner_number" placeholder="PIT tag #" onChange={e => this.onChange(e)}/>
              </div>
            </div>

</div>

          <TagInputs tags={tags}/>

<button onClick={this.handleAddTags} type="button" className="btn btn-primary text-center"> ADD NEW TAGS</button>





            <div className="form-group row">
              <label htmlFor="living-tags" className="col-4 col-form-label">Living Tags:</label>
              <div className="col-4">
              <select className="form-control" name="living_tags" value={this.value} onChange={e => this.onChange(e)}>
                  <option>Yes/No</option>
                 <option value="true">Yes</option>
                 <option value="false">No</option>
               </select>
              </div>
            </div>


              <h4>Morphometrics:</h4>

              <div class="container border pt-3 mb-3">

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="curved-length">Curved Length (notch-tip):</label>
                    <input className="form-control" type="text" name="curved_length" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="curved-width">Curved Width (widest):</label>
                    <input className="form-control" type="text" name="curved_width" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="straight-length">Straight Length (notch-tip):</label>
                    <input className="form-control" type="text" name="straight_length" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="straight-width">Straight Width (widest):</label>
                    <input type="form-control" name="straight_width" className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="min-length">Minimum Length (notch-notch):</label>
                    <input type="form-control" name="minimum_length" className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="tail-length">Tail Length: PL-vent</label>
                    <input type="form-control" name="tail_length_pl_vent" className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="plastron-length">Plastron Length (tape):</label>
                    <input type="form-control" name="plastron_length" className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="pl-tip">PL-Tip:</label>
                    <input type="form-control" name="tail_length_pl_tip" className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="weight">Weight in kg: *tare scale</label>
                    <input type="form-control" name="weight" className="form-control" placeholder="in kg" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="head-width">Head Width (straight):</label>
                    <input type="form-control" name="head_width" className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">

                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="body-depth">Body Depth (straight):</label>
                    <input type="form-control" name="body_depth" className="form-control" placeholder="in cm" onChange={e => this.onChange(e)}/>
                  </div>
                </div>
                </div>


              </div>

              <div className="col-sm-6 pl-3 text-left">


                <h4>Samples:</h4>

                <div class="container border pt-3 mb-3 pb-3">

                  <div className="form-row">
                  <label htmlFor="blood" className="col-3 col-form-label mb-3">Blood:</label>
                      <div className="col-3">
                      <select className="form-control">
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" name="blood_sample" className="form-control" placeholder="For" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>


                  <div className="form-row">
                  <label htmlFor="skin" className="col-3 col-form-label mb-3">Skin:</label>
                      <div className="col-3">
                      <select className="form-control" >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" name="skin_sample" className="form-control" placeholder="For" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>


                  <div className="form-row">
                  <label htmlFor="scute" className="col-3 col-form-label mb-3">Scute:</label>
                      <div className="col-3 mb-3">
                      <select className="form-control" >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" name="scute_sample" className="form-control" placeholder="For" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>


                  <h5>Other Samples:</h5>
                  <div className="col-sm-10">
                  <textarea className="form-control" name="other" rows="2" onChange={e => this.onChange(e)}></textarea>
                  </div>

                  </div>


                    <div className="form-group row">
                      <label htmlFor="paps" className="col-4 col-form-label">Paps:</label>
                          <div className="col-6">
                          <select className="form-control" name="pap_category" value={this.value} onChange={e => this.onChange(e)}>
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
                        <select className="form-control" name="paps_regression" value={this.value} onChange={e => this.onChange(e)}>
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
                        <select className="form-control" name="photos" value={this.value} onChange={e => this.onChange(e)}>
                        <option>Yes/No</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                         </select>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label htmlFor="pap-photos" className="col-4 col-form-label">Pap Photos:</label>
                        <div className="col-6">
                        <select className="form-control" name="pap_photos" value={this.value} onChange={e => this.onChange(e)}>
                        <option>Yes/No</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                         </select>
                        </div>
                      </div>


                        <div className="form-row">
                        <label htmlFor="example-text-input" className="col-3 col-form-label">Leeches:</label>
                            <div className="col-3">
                            <select className="form-control" name="leeches" value={this.value} onChange={e => this.onChange(e)}>
                            <option>Yes/No</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                             </select>
                            </div>
                          <div className="col-4">
                            <input type="text" className="form-control" name="leeches_where" placeholder="Where" onChange={e => this.onChange(e)}/>
                          </div>
                        </div>


                      <br></br>


                        <div className="form-row">
                        <label htmlFor="leech-eggs" className="col-3 col-form-label">Leech Eggs:</label>
                            <div className="col-3">
                            <select className="form-control" name="leech_eggs" value={this.value} onChange={e => this.onChange(e)}>
                            <option>Yes/No</option>
                              <option value="true">Yes</option>
                              <option value="false">No</option>
                             </select>
                            </div>
                          <div className="col-4">
                            <input type="text" className="form-control" placeholder="Where" name="leech_eggs_where" onChange={e => this.onChange(e)}/>
                          </div>
                        </div>


                      <br></br>

                      <h5>Flipper Damage:</h5>
                        <div className="col-sm-12 mb-3">
                        <textarea className="form-control" name="flipper_damage" id="exampleFormControlTextarea1" rows="3" onChange={e => this.onChange(e)}></textarea>
                        </div>

                      <h5>Shell Damage:</h5>
                        <div className="col-sm-12 mb-3">
                        <textarea className="form-control" name="carapace_damage" id="exampleFormControlTextarea1" rows="3" onChange={e => this.onChange(e)}></textarea>
                        </div>
                      <h4>Notes:</h4>
                        <div className="col-sm-12">
                        <p><i>Describe scale and scute abnormalities, condition of turtle, etc.</i></p>
                        <textarea className="form-control" name="notes" id="exampleFormControlTextarea1" rows="3" onChange={e => this.onChange(e)}></textarea>
                        </div>


                        </div>
                    </div>
                  </div>
              </div>


              <button type="submit" className="btn btn-primary">SUBMIT</button>

            </form>

          </div>

        <InternalFooter />
      </>
    );
  }
}





export default Trident;

const rootElement = document.getElementById("root");
ReactDOM.render(<Trident/>, rootElement);
