import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import TagInputs from './tagInputs.js';
import SampleInputs from './sampleInputs.js'
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';
import axios from "axios";


const TITLE = 'New Offshore Report'

class Offshore extends Component {

  constructor(props){
    super(props)

    this.state = {
      tagsList: [{tag_number: "", tag_type: "", active: true, tag_scars: "", pit: "", scanned: "", scanner_number: "", magnet_off: "" }],
      samplesList: [{sample_type: "", received_by: "",purpose_of_sample: "", notes: "", entered_date: "", entered_by: ""}],
      data : [],
      error: false,
      redirect:false
    };

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  onChange= (e) => {
    if(["tag_number", "tag_type", "active", "tag_scars", "pit", "scanned", "scanner_number"].includes(e.target.name)){
      let tagsList = [...this.state.tagsList];
      let updatedValue = e.target.value;
      if (updatedValue === "true" || updatedValue == "false") {
        updatedValue = JSON.parse(updatedValue);
    }
      tagsList[e.target.dataset.id][e.target.name] = updatedValue;
      this.setState({ tagsList }, () => console.log(this.state.tagsList));
    } else if(["sample_type", "received_by", "purpose_of_sample", "notes"].includes(e.target.name)){
      let samplesList = [...this.state.samplesList];
      samplesList[e.target.dataset.id][e.target.name] = e.target.value;
      this.setState({ samplesList }, () => console.log(this.state.samplesList))
    } else {


      this.setState({ [e.target.name]: e.target.value })
  }
}

  addTagRow = (e) => {
    this.setState((prevState) => ({
      tagsList: [...prevState.tagsList, {tag_number: "", tag_type: "", active: true, tag_scars: "", pit: "", scanned: "", scanner_number: "" }],
    }));
  };

  addSampleRow = (e) => {
    this.setState((prevState) => ({
      samplesList: [...prevState.samplesList, {sample_type: "", received_by: "",purpose_of_sample: "", notes: "", entered_date: "", entered_by: ""}],
    }));
  };

  renderRedirect = () => {
   if (this.state.redirect) {
     return <Redirect to='/new-report/lagoon' />
   }
 }


  handleSubmit = async(e) => {
     e.preventDefault();

     if(this.state.species == "other"){
       this.state.species = this.state.species_other
     }

     for(var i=0; i< this.state.tagsList.length; i++){
       console.log(this.state.tagsList[i].tag_number)
     }

     for(var i=0; i< this.state.samplesList.length; i++){
       this.state.samplesList[i].entered_date = this.state.entered_date_2;
       this.state.samplesList[i].entered_by = this.state.entered_by_2;
     }



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
     		samples: this.state.samplesList,
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
        tags: this.state.tagsList
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
    let { tagsList, samplesList, data } = this.state;

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>
        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>


        <style type="text/css">
            {`
            .fullform {
              zoom: 70%;
            }
            `}
          </style>

        <div className="fullform">

            <h1><b>OFFSHORE DATA SHEET</b></h1>

            <form action="" onSubmit={this.handleSubmit} onChange={this.onChange} >
            <div className="justify-content-center row pb-2 pt-2">
            <div className="col-sm-10 mr-2 ml-2 border pr-3 pl-3 pb-3 pt-3">


            <div className="form-row">
              <div className="col-sm-6 text-left">

              <div className="form-group row">
                <label htmlFor="trip-num" className="col-4 col-form-label">Trip #:</label>
                <div className="col-6">
                <input className="form-control" type="text" name="trip_number" />
                </div>
              </div>

              <div className="form-row mb-3">
              <label htmlFor="species" className="col-4 col-form-label">Species:</label>
                  <div className="col-2">
                  <select className="form-control" name="species" value={this.value} >
                     <option value="Cc">Cc</option>
                     <option value="Cm">Cm</option>
                     <option value="other">Other</option>
                   </select>
                  </div>
                <div className="col-4">
                  <input type="text" className="form-control" placeholder="other" name="species" />
                </div>
              </div>

              <div className="form-group row">
                <label htmlFor="capture-habitat" className="col-4 col-form-label">Capture habitat:</label>
                <div className="col-6">
                <input className="form-control" type="text" name="capture_habitat" />
                </div>
              </div>


              <h4>Capture Metadata:</h4>

              <div class="container border pt-3 mb-3">

              <div className="form-row">
                <div className="col-sm-6 text-left">

                <div className="form-group row">
                  <label htmlFor="capture-date" className="col-5 col-form-label">Capture Date:</label>
                  <div className="col-7">
                    <input className="form-control" type="date" name="capture_date" />
                  </div>
                </div>


                <div className="form-group row">
                  <label htmlFor="capture-time" className="col-5 col-form-label">Capture Time:</label>
                  <div className="col-7">
                  <input className="form-control" type="time" name="capture_time" />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="capture-location">Capture Location N:</label>
                    <input className="form-control" type="text" name="capture_latitude" />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="capture-location">Capture Location W:</label>
                    <input className="form-control" type="text" name="capture_longitude" />
                  </div>
                  </div>

                </div>

                <div className="col-sm-6 text-left">

                <div className="form-group row">
                  <label htmlFor="cloud-cover" className="col-5 col-form-label">Cloud cover:</label>
                  <div className="col-7">
                  <input className="form-control" type="text" name="cloud_cover" />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="seas" className="col-5 col-form-label">Seas:</label>
                  <div className="col-7">
                  <input className="form-control" type="text" name="seas" />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="wind" className="col-5 col-form-label">Wind:</label>
                  <div className="col-7">
                  <input className="form-control" type="text" name="wind" />
                  </div>
                </div>


                </div>
              </div>

                <div className="form-row">
                  <div className="form-group col-md-5">
                    <label htmlFor="water-temp">Sargassum Water Temp:</label>
                    <input className="form-control" type="text" name="capture_sargassum_water_temp"  />
                    </div>
                  <div className="form-group col-md-4">
                    <label htmlFor="water-temp">Open Water Temp:</label>
                    <input className="form-control" type="text" name="capture_open_water_temp"  />
                    </div>
                  <div className="form-group col-md-3">
                    <label htmlFor="water-temp">Air Temp:</label>
                    <input className="form-control" type="text" name="capture_air_temp"  />
                  </div>
                </div>

              </div>


              <h4>Tags:</h4>


                <TagInputs add={this.addTagRow} tagsList={tagsList} />
                <button onClick={this.addTagRow} type="button" className="btn btn-primary text-center mb-3" tagsList={tagsList}>ADD NEW TAGS</button>




              <h4>Morphometrics:</h4>

          <div class="container border pt-3 mb-3">
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="curved-length">Curved Length (notch-tip):</label>
              <input className="form-control" type="text" name="curved_length" placeholder="in cm" />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="curved-width">Curved Width (widest):</label>
              <input className="form-control" type="text" name="curved_width" placeholder="in cm" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="straight-length">Straight Length (notch-tip):</label>
              <input className="form-control" type="text" name="straight_length" placeholder="in cm" />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="straight-width">Straight Width (widest):</label>
              <input type="form-control" name="straight_width" className="form-control" placeholder="in cm" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="min-length">Minimum Length (notch-notch):</label>
              <input type="form-control" name="minimum_length" className="form-control" placeholder="in cm" />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="tail-length">Tail Length: PL-vent</label>
              <input type="form-control" name="tail_length_pl_vent" className="form-control" placeholder="in cm" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="plastron-length">Plastron Length (tape):</label>
              <input type="form-control" name="plastron_length" className="form-control" placeholder="in cm" />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="pl-tip">PL-Tip:</label>
              <input type="form-control" name="tail_length_pl_tip" className="form-control" placeholder="in cm" />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="weight">Weight in kg: *tare scale</label>
              <input type="form-control" name="weight" className="form-control" placeholder="in kg" />
            </div>
            <div className="form-group col-md-5">
              <label htmlFor="head-width">Head Width (straight):</label>
              <input type="form-control" name="head_width" className="form-control" placeholder="in cm" />
            </div>
            <div className="form-group col-md-6">

            </div>
            <div className="form-group col-md-5">
              <label htmlFor="body-depth">Body Depth (straight):</label>
              <input type="form-control" name="body_depth" className="form-control" placeholder="in cm" />
            </div>
          </div>

</div>
              </div>

              <div className="col-sm-6 pl-4 text-left">


                <h4>Samples:</h4>

              <div class="container border pt-3 mb-3">

              <div className="form-row">
                  <div className="form-group col-md-5">
                    <label htmlFor="entered_date">Entered Date:</label>
                    <input className="form-control" name="entered_date_2" type="date" />
                  </div>
                  <div className="form-group col-md-5">
                    <label htmlFor="entered-by">Entered By:</label>
                    <input className="form-control" type="text" name="entered_by_2"/>
                  </div>
                </div>


                <SampleInputs add={this.addSampleRow} samplesList={samplesList} />
                <button onClick={this.addSampleRow} type="button" className="btn btn-primary text-center mb-3" samplesList={samplesList}>ADD NEW SAMPLE</button>



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

                <div className="form-row">
                    <div className="form-group col-md-5">
                      <label htmlFor="curved-length">Release Location N:</label>
                      <input className="form-control" type="text" />
                    </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="curved-width">Release Location W:</label>
                      <input className="form-control" type="text" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="release-time">Release Time:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                      </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="sargassum-water">Sargassum Water Temp:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="sargassum-salinity">Sargassum Salinity:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                    </div>
                  </div>


                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="air-temp">Air Temp:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                      </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="openwater-temp">Open Water Temp:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="openwater-salinity">Open Water Salinity:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-3">
                      <label htmlFor="drifter1">Drifter Released:</label>
                      <select className="form-control" name="scanned" value={this.value} >
                        <option>Yes/No</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                       </select>
                      </div>
                    <div className="form-group col-md-5">
                      <label htmlFor="drifter1">Drifter #1 ID:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="drifter1">Drifter #1 Type:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group col-md-3"></div>
                    <div className="form-group col-md-5">
                      <label htmlFor="drifter2">Drifter #2 ID:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                      </div>
                    <div className="form-group col-md-4">
                      <label htmlFor="drifter2">Drifter #2 Type:</label>
                      <input className="form-control" type="text" name="wind_dir"  />
                    </div>
                  </div>


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

              <button type="submit" className="btn btn-primary">SUBMIT</button>

            </form>

          </div>

        <InternalFooter />
      </>
    );
  }
}



export default Offshore;
