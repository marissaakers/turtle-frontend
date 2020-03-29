import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
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
      error: false,
      redirect:false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  renderRedirect = () => {
   if (this.state.redirect) {
     return <Redirect to='/new-report/lagoon' />
   }
 }


  handleSubmit = async(e) => {
     e.preventDefault();


     const data = {
      capture_date: this.state.capture_date,
     	capture_time: this.state.capture_time,
     	capture_latitude: parseFloat(this.state.capture_latitude),
     	capture_longitude: parseFloat(this.state.capture_longitude),
     	cloud_cover: this.state.cloud_cover,
     	seas: this.state.seas,
     	wind: this.state.wind,
     	capture_sargassum_water_temp: parseFloat(this.state.capture_sargassum_water_temp),
     	capture_open_water_temp: parseFloat(this.state.capture_open_water_temp),
     	capture_air_temp: parseFloat(this.state.capture_air_temp),
     	release_latitude: parseFloat(this.state.release_latitude),
     	release_longitude: parseFloat(this.state.release_longitude),
     	release_time: this.state.release_time,
     	release_sargassum_water_temp: parseFloat(this.state.release_sargassum_water_temp),
     	sargassum_salinity: parseFloat(this.state.sargassum_salinity),
     	release_air_temp: parseFloat(this.state.release_air_temp),
     	release_open_water_temp: parseFloat(this.state.release_open_water_temp),
     	open_water_salinity: parseFloat(this.state.open_water_salinity),
     	drifter_released: JSON.parse(this.state.drifter_released),
     	drifter1_id: this.state.drifter1_id,
     	drifter2_id: this.state.drifter2_id,
     	drifter1_type: this.state.drifter1_type,
     	drifter2_type: this.state.drifter2_type,
     	encounters: {
     		species: this.state.species,
     		trip_number: this.state.trip_number,
     		capture_habitat: this.state.capture_habitat,
     		notes: this.state.notes,
     		samples: [{
     			sample_type: this.state.sample_type,
     			received_by: this.state.received_by,
     			purpose_of_sample: this.state.purpose_of_sample,
     			notes: this.state.notes,
     			entered_date: this.state.entered_date,
     			entered_by: this.state.entered_by
     			}
     		],
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
     			}
     		]
     	}

     };



     axios.post('https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/lagoon/metadata/insert',
       data, { headers: {'Content-Type': 'application/json'} })
         .then(res => {
           console.log(data)
           console.log("Successfully posted!")
           this.setState({redirect:true})
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

            <h1><b>OFFSHORE DATA SHEET</b></h1>

            <form>
            <div className="justify-content-center row pb-2 pt-2">
            <div className="col-sm-10 mr-2 ml-2 border pr-3 pl-3 pb-3 pt-3">


            <div className="form-row">
              <div className="col-sm-6 text-left">

              <div className="form-group row">
                <label htmlFor="trip-num" className="col-4 col-form-label">Trip #:</label>
                <div className="col-6">
                <input className="form-control" type="text" name="trip_number" onChange={e => this.onChange(e)}/>
                </div>
              </div>

              <div className="form-row mb-3">
              <label htmlFor="species" className="col-4 col-form-label">Species:</label>
                  <div className="col-2">
                  <select className="form-control" name="species" value={this.value} onChange={e => this.onChange(e)}>
                     <option value="Cc">Cc</option>
                     <option value="Cm">Cm</option>
                     <option value="other">Other</option>
                   </select>
                  </div>
                <div className="col-4">
                  <input type="text" className="form-control" placeholder="other" name="species" onChange={e => this.onChange(e)}/>
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="capture-habitat" className="col-4 col-form-label">Capture habitat:</label>
                <div className="col-6">
                <input className="form-control" type="text" name="capture_habitat" onChange={e => this.onChange(e)}/>
                </div>
              </div>


              <h4>Capture Metadata:</h4>

              <div class="container border pt-3 mb-3">

              <div className="form-row">
                <div className="col-sm-6 text-left">

                <div className="form-group row">
                  <label htmlFor="capture-date" className="col-5 col-form-label">Capture Date:</label>
                  <div className="col-7">
                    <input className="form-control" type="date" name="capture_date" onChange={e => this.onChange(e)}/>
                  </div>
                </div>


                <div className="form-group row">
                  <label htmlFor="capture-time" className="col-5 col-form-label">Capture Time:</label>
                  <div className="col-7">
                  <input className="form-control" type="time" name="capture_time" onChange={e => this.onChange(e)}/>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="capture-location">Capture Location N:</label>
                    <input className="form-control" type="text" name="capture_latitude" onChange={e => this.onChange(e)}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="capture-location">Capture Location W:</label>
                    <input className="form-control" type="text" name="capture_longitude" onChange={e => this.onChange(e)}/>
                  </div>
                  </div>

                </div>

                <div className="col-sm-6 text-left">

                <div className="form-group row">
                  <label htmlFor="cloud-cover" className="col-5 col-form-label">Cloud cover:</label>
                  <div className="col-7">
                  <input className="form-control" type="text" name="cloud_cover" onChange={e => this.onChange(e)}/>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="seas" className="col-5 col-form-label">Seas:</label>
                  <div className="col-7">
                  <input className="form-control" type="text" name="seas" onChange={e => this.onChange(e)}/>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="wind" className="col-5 col-form-label">Wind:</label>
                  <div className="col-7">
                  <input className="form-control" type="text" name="wind" onChange={e => this.onChange(e)}/>
                  </div>
                </div>


                </div>
              </div>

              <form>
                <div className="form-row">
                  <div className="form-group col-md-5">
                    <label htmlFor="water-temp">Sargassum Water Temp:</label>
                    <input className="form-control" type="text" name="capture_sargassum_water_temp" onChange={e => this.onChange(e)} />
                    </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="water-temp">Open Water Temp:</label>
                    <input className="form-control" type="text" name="capture_open_water_temp" onChange={e => this.onChange(e)} />
                    </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="water-temp">Air Temp:</label>
                    <input className="form-control" type="text" name="capture_air_temp" onChange={e => this.onChange(e)} />
                  </div>
                </div>
              </form>

              </div>


              <h4>Tags:</h4>

    <div class="container border pt-3 mb-3">
              <form>
                <div className="form-row">
                  <div className="form-group col-md-4">
                    <label htmlFor="tags">Satellite Tag Applied:</label>
                    <select className="form-control" name="scanned" value={this.value} >
                      <option>Yes/No</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                     </select>
                    </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="tags">Satellite Tag ID:</label>
                    <input className="form-control" type="text" name="wind_dir" />
                    </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="tags">Magnet Off:</label>
                    <input className="form-control" type="text" name="wind_dir" />
                  </div>
                    </div>

                <div className="form-row">
                  <div className="form-group col-md-3">
                    <label htmlFor="tags">PIT Tag: Scanned:</label>
                    <select className="form-control" name="scanned" value={this.value} onChange={e => this.onChange(e)}>
                      <option>Yes/No</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                     </select>
                    </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="tags">PIT Tag:</label>
                    <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                    </div>
                    </div>
              </form>
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

              <div className="col-sm-6 pl-4 text-left">


                <h4>Samples:</h4>

                    <div class="container border pt-3 mb-3">
                <form>
                  <div className="form-row">
                  <label htmlFor="blood" className="col-3 col-form-label">Blood:</label>
                      <div className="col-3 mb-2">
                      <select className="form-control" onChange={e => this.onChange(e)}>
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" className="form-control" placeholder="For"/>
                    </div>
                  </div>

                  <div className="form-row">
                  <label htmlFor="skin" className="col-3 col-form-label">Skin #1:</label>
                      <div className="col-3 mb-2">
                      <select className="form-control" onChange={e => this.onChange(e)}>
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" className="form-control" placeholder="For"/>
                    </div>
                  </div>

                  <div className="form-row">
                  <label htmlFor="scute" className="col-3 col-form-label">Skin #2:</label>
                      <div className="col-3 mb-2">
                      <select className="form-control" onChange={e => this.onChange(e)}>
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" className="form-control" placeholder="For"/>
                    </div>
                  </div>

                  <div className="form-row">
                  <label htmlFor="scute" className="col-3 col-form-label">Scute:</label>
                      <div className="col-3 mb-2">
                      <select className="form-control" onChange={e => this.onChange(e)}>
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" className="form-control" placeholder="For"/>
                    </div>
                  </div>


                  <div className="form-row">
                  <label htmlFor="scute" className="col-3 col-form-label">Sargassum:</label>
                      <div className="col-3 mb-2">
                      <select className="form-control" onChange={e => this.onChange(e)}>
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" className="form-control" placeholder="For"/>
                    </div>
                  </div>


                  <div className="form-row">
                  <label htmlFor="scute" className="col-3 col-form-label">Other:</label>
                      <div className="col-3 mb-2">
                      <select className="form-control" onChange={e => this.onChange(e)}>
                         <option>Yes</option>
                         <option>No</option>
                       </select>
                      </div>
                    <div className="col-4">
                      <input type="text" className="form-control" placeholder="What"/>
                    </div>
                  </div>
                </form>

                <h5>Flipper Damage:</h5>
                  <div className="col-sm-12">
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>
                <br></br>
                <h5>Shell Damage:</h5>
                  <div className="col-sm-12 mb-3">
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>

                </div>

                <h4>Release Metadata:</h4>


    <div class="container border pt-3 mb-3">
                <form>

                <div className="form-row">
                    <div className="form-group col-md-5">
                      <label htmlFor="curved-length">Release Location N:</label>
                      <input className="form-control" type="text" onChange={e => this.onChange(e)}/>
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="curved-width">Release Location W:</label>
                      <input className="form-control" type="text" onChange={e => this.onChange(e)}/>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="release-time">Release Time:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="sargassum-water">Sargassum Water Temp:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="sargassum-salinity">Sargassum Salinity:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                    </div>
                  </div>


                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="air-temp">Air Temp:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="openwater-temp">Open Water Temp:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="openwater-salinity">Open Water Salinity:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="drifter1">Drifter Released:</label>
                      <select className="form-control" name="scanned" value={this.value} onChange={e => this.onChange(e)}>
                        <option>Yes/No</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="drifter1">Drifter #1 ID:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="drifter1">Drifter #1 Type:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-3"></div>
                    <div className="form-group col-md-5">
                      <label htmlFor="drifter2">Drifter #2 ID:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="drifter2">Drifter #2 Type:</label>
                      <input className="form-control" type="text" name="wind_dir" onChange={e => this.onChange(e)} />
                    </div>
                  </div>

                </form>

</div>
                <h4>Notes:</h4>
                  <div className="col-sm-12">
                  <p><i>Describe scale and scute abnormalities, condition of turtle, etc.</i></p>
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                  </div>


                        </div>
                    </div>
                  </div>
              </div>


            </form>


            <button type="submit" className="btn btn-primary">SUBMIT</button>
          </div>

        <InternalFooter />
      </>
    );
  }
}



export default Offshore;
