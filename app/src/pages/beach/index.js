import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import { Helmet } from 'react-helmet';
import TagInputs from './tagInputs';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";
import SubmitConfirmModal from '../../components/submit-confirm-modal';
import TimeInput from 'react-time-input';



const metadata_investigators = 'MTRG - Beach Data'


class Beach extends Component {

  constructor(props){
    super(props)

    this.state = {
      tagsList: [{tag_number: "", tag_type: "", active: true, tag_scars: "", pit: "", scanned: "", scanner_number: "" }],
      data : [],
      error: false,
      redirect:false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onTimeChangeHandler = this.onTimeChangeHandler.bind(this);

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

  onTimeChangeHandler (n, e) {
    const v = e;
    console.log({[n]: v});
    this.setState({[n]: v});

  }

  onChange(e) {
    if(["tag_number", "tag_type", "active", "tag_scars", "pit", "scanned", "scanner_number"].includes(e.target.name)){
      let tagsList = [...this.state.tagsList];
      let updatedValue = e.target.value;
      if (updatedValue === "true" || updatedValue == "false") {
        updatedValue = JSON.parse(updatedValue);
    }
      tagsList[e.target.dataset.id][e.target.name] = updatedValue;
      this.setState({ tagsList }, () => console.log(this.state.tagsList));
    } else {

      this.setState({ [e.target.name]: e.target.value })
  }
}


  handleSubmit = async(e) => {
     e.preventDefault();

     for(var i=0; i< this.state.tagsList.length; i++){
       console.log(this.state.tagsList[i].tag_number)
     }



     const data = {


     };



     axios.post('https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/lagoon/metadata/insert',
       data, { headers: {'Content-Type': 'application/json'} })
         .then(res => {
           console.log(data)
           console.log("Successfully posted!")
           this.setState({modalIsShowing: true})
         })
         .catch(error => {
           console.log(error.response)
           console.log("Error.")
         });
  }
  render() {

    let { tagsList, data } = this.state;


    return(
      <>
        <Helmet>
          <metadata_investigators>{ metadata_investigators }</metadata_investigators>
        </Helmet>
        <InternalNavbar />

        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>
        <p align="right" className="pr-5"><a href="/new-report/beach-inventory">see beach inventory sheet →</a></p>


        <style type="text/css">
            {`
            .fullform {
              zoom: 70%;
            }
            `}
          </style>


      <div className="fullform">
      <h1><b>BEACH DATA SHEET</b></h1>

      <form action="" onSubmit={this.handleSubmit}>

      <div className="justify-content-center row pb-2 pt-2">
      <div className="col-sm-10 mr-2 ml-2 border pr-2 pl-2 pb-3 pt-3" >



      <div className="container-fluid text-left">
      <div class="row border-bottom pl-3 pr-3 mb-3">

        <div className="col-sm-6 text-left">

        <div className="form-row mb-3">
        <label htmlFor="species" className="col-2 col-form-label">Species:</label>
            <div className="col-5">
            <select className="form-control" name="species" value={this.value}>
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
              <input type="text" className="form-control" placeholder="hybrid" name="species_other"/>
            </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-7">
            <label htmlFor="date">Date:</label>
                <input className="form-control" type="date" name="encounter_date"  onChange={e => this.onChange(e)}/>
          </div>
        <div className="form-group col-md-5">
          <label htmlFor="capture-time">Time:</label>
              <TimeInput className="form-control"
                name="encounter_time"
                placeholder="--:--"
                onTimeChange={(e) => this.onTimeChangeHandler("encounter_time", e)}
              />
            </div>
        </div>



        <div className="form-group row">
          <label htmlFor="example-text-input" className="col-2 col-form-label">Activity:</label>
          <div className="col-4">
          <select className="form-control" name="scanned" value={this.state.value}>
          <option></option>
             <option value="LF Scar">LF Scar</option>
             <option value="RF Scar">RF Scar</option>
             <option value="RR Scar">RR Scar</option>
             <option value="Both scarred">Both scarred</option>
             <option value="No scar">No scar</option>
             <option value="Unreported">Unreported</option>
           </select>          </div>
        </div>


        <div className="form-group row">
          <label htmlFor="example-text-input" className="col-2 col-form-label">Location:</label>
          <div className="col-4">
            <input className="form-control" type="text" name= "location_detail" onChange={e => this.onChange(e)} />
          </div>
          <div className="col-1 pl-0 mt-2 pr-0">
            km          </div>
            <div className="col-1 pl-0 mt-2 text-right">
            N/S:</div>
          <div className="col-3 pl-0">
            <input className="form-control" type="text" name= "location_NS" onChange={e => this.onChange(e)} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="date">Latitude N:</label>
                <input className="form-control" type="text" name="latitude"  onChange={e => this.onChange(e)}/>
          </div>
        <div className="form-group col-md-5">
          <label htmlFor="capture-time">Longitude W:</label>
          <input className="form-control" type="text" name="longitude"  onChange={e => this.onChange(e)}/>
            </div>
        </div>


        </div>
        <div className="col-sm-6 pl-5 text-left">


        <div className="form-group row">
          <label htmlFor="example-text-input" className="col-3 col-form-label">Capture Type:</label>
          <div className="col-5">
          <input className="form-control" type="text" name="capture_type" disabled/>
          </div>
        </div>


        <div className="form-row">
          <div className="form-group col-md-5">
            <label htmlFor="stake">Stake #:</label>
                <input className="form-control" type="text" name="stake_number"  onChange={e => this.onChange(e)}/>
          </div>
        <div className="form-group col-md-5">
          <label htmlFor="prime">Prime Tag:</label>
          <input className="form-control" type="text" name="prime_tag"  onChange={e => this.onChange(e)}/>
            </div>
        </div>


        <div className="form-group row">
        <label htmlFor="example-text-input" className="col-5 col-form-label">Site Description:</label>
        <div className="col-12">
          <input className="form-control" type="text" name="site_description" onChange={e => this.onChange(e)} />
        </div>
        </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Investigators:</label>
            <div className="col-12">
              <input className="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>


        </div>

      </div>

      <div class="row">

          <div className="col-sm-6">

          <h4>Tag Information: </h4>

            <div className="form-row pt-2">
              <div className="form-group col-md-4">
                <label htmlFor="date">Tag Scars:</label>
                <select className="form-control" name="scanned" value={this.state.value}>
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
              <label htmlFor="capture-time">Pit Tag Scanned:</label>
              <select className="form-control" name="scanned" value={this.state.value}>
              <option></option>
                 <option value="true">Yes</option>
                 <option value="false">No</option>
               </select>              </div>
            <div className="form-group col-md-4">
              <label htmlFor="capture-type">Scanner #:</label>
              <input className="form-control" type="text" name="scanner_number" onChange={e => this.onChange(e)} />
              </div>
            </div>



                <TagInputs add={this.addTagRow} tagsList={tagsList} />
                <button onClick={this.addTagRow} type="button" className="btn btn-primary text-center mb-3" tagsList={tagsList}>ADD NEW TAGS</button>








              <h4>Morphometrics:</h4>

              <div className="container border pt-3 mb-3">

                <div className="form-row">
                <div className="col-md-6">

                <div className="row mb-3">
                  <div className="col-md-6 pr-0">
                    <label htmlFor="curved-lwngth">Curved Length:</label>
                    <input className="form-control" type="text" name="curved_length" placeholder="in cm"/>
                    </div>
                    <div className="col-md-6 pl-0">
                    <label htmlFor="curved-length">over barnacles:</label>
                    <select className="form-control" name="curved_length_over_barnacles" value={this.state.value}>
                    <option></option>
                       <option value="true">Yes</option>
                     </select>
                     </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="straight-length">Straight Length (notch-tip):</label>
                    <input className="form-control" type="text" name="straight_length" placeholder="in cm"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="min-length">Minimum Length (notch-notch):</label>
                    <input type="form-control" name="minimum_length" className="form-control" placeholder="in cm"/>
                  </div>


                  <div className="row mb-3">
                  <div className="col-md-6 pr-0">
                    <label htmlFor="curved-width">Plastron Length:</label>
                    <input type="form-control" name="plastron_length" className="form-control" placeholder="in cm"/>
                    </div>
                    <div className="col-md-6 pl-0">
                    <label htmlFor="curved-width">over barnacles:</label>
                    <select className="form-control" name="plastron_length_over_barnacles" value={this.state.value}>
                    <option></option>
                       <option value="true">Yes</option>
                     </select>
                     </div>
                  </div>


                  <div className="form-group">
                    <label htmlFor="weight">Weight in kg:</label>
                    <input type="form-control" name="weight" className="form-control" placeholder="in kg"/>
                  </div>

                  <div className="form-group">
                  <label htmlFor="sex">Sex:</label>
                  <select className="form-control" name="sex" value={this.state.value}>
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
                    <input className="form-control" type="text" name="curved_width" placeholder="in cm"/>
                    </div>
                    <div className="col-md-6 pl-0">
                    <label htmlFor="curved-width">over barnacles:</label>
                    <select className="form-control" name="curved_width_over_barnacles" value={this.state.value}>
                    <option></option>
                       <option value="true">Yes</option>
                     </select>
                     </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="straight-width">Straight Width:</label>
                    <input type="form-control" name="straight_width" className="form-control" placeholder="in cm"/>
                  </div>

                    <label htmlFor="tail-length">Tail Length: PL-vent</label>
                    <input type="form-control" name="tail_length_pl_vent" className="form-control" placeholder="in cm"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="pl-tip">PL-Tip:</label>
                    <input type="form-control" name="tail_length_pl_tip" className="form-control" placeholder="in cm"/>
                  </div>

                  <div className="form-group">
                    <label htmlFor="head-width">Head Width (straight):</label>
                    <input type="form-control" name="head_width" className="form-control" placeholder="in cm"/>
                  </div>


                  <div className="row mb-3">
                  <div className="col-md-6 pr-0">
                  <label htmlFor="body-depth">Body Depth:</label>
                    <input type="form-control" name="body_depth" className="form-control" placeholder="in cm"/>
                    </div>
                    <div className="col-md-6 pl-0">
                    <label htmlFor="curved-width">over barnacles:</label>
                    <select className="form-control" name="body_depth_over_barnacles" value={this.state.value}>
                    <option></option>
                       <option value="true">Yes</option>
                     </select>
                     </div>
                  </div>
                  </div>
                </div>
          </div>


              <h5>Flipper Damage:</h5>
              <div className="col-sm-15">
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>

              <h5>Shell Damage:</h5>
              <div className="col-sm-15 mt-2">
                  <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>




          </div>
          <div className="col-sm-6 pl-3">


          <h5>Samples:</h5>


          <div className="container border pt-2 mb-2">
            <div className="form-group row">
            <label htmlFor="example-text-input" className="col-2 col-form-label">Skin:</label>
              <div className="col-3">
                  <select className="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
              </div>
              <div className="col-4">
                <input type="text" className="form-control" placeholder="For"/>
              </div>
            </div>



            <div className="form-group row">
            <label htmlFor="example-text-input" className="col-2 col-form-label">Skin 2:</label>
              <div className="col-3">
                  <select className="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
              </div>
              <div className="col-4">
                <input type="text" className="form-control" placeholder="For"/>
              </div>
            </div>



            <div className="form-group row">
            <label htmlFor="example-text-input" className="col-2 col-form-label">Other:</label>
              <div className="col-3">
                  <select className="form-control" id="exampleFormControlSelect1">
                  <option>Yes</option>
                  <option>No</option>
                  </select>
              </div>
              <div className="col-4">
                <input type="text" className="form-control" placeholder="For"/>
              </div>
            </div>


          </div>



          <br></br>
          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-4 col-form-label">Paps:</label>
            <div className="col-7">
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>seen</option>
                    <option>not seen</option>
                </select>
              </div>
            </div>


          <h5><b>Clutch Data: </b></h5>


            <div className="form-row">
              <div className="form-group col-md-4">
                <label htmlFor="inputEmail4">Clutch Deposited:</label>
                    <select className="form-control" id="exampleFormControlSelect1">
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                    </select>
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Sand Type:</label>
                  <select className="form-control" id="exampleFormControlSelect1">
                  <option value="Natural">Natural</option>
                  <option value="Artificial">Artificial</option>
                  <option value="Mix">Mix</option>
                  <option value="Other - see notes">Other (see notes)</option>
                  </select>
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Placement:</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option value="Before">Before</option>
                  <option value="Transition">Transition</option>
                  <option value="On dune">On dune</option>
                </select>              </div>
            </div>




          <h5><b>Nest Marking: </b></h5>

            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">HIDDEN:</label>
                <input type="text" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Planted in:</label>
                <input type="text" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputPassword4">DIST TO DUNE:</label>
                <input type="text" className="form-control" id="inputPassword4" />
              </div>
            </div>



            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">OBVIOUS:</label>
                <input type="text" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Planted in:</label>
                <input type="text" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputPassword4">DIST TO HIGH TIDE:</label>
                <input type="text" className="form-control" id="inputPassword4" />
              </div>
            </div>



            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">CAN BURIED:</label>
                <select className="form-control" value={this.state.value} name="">
                  <option></option>
                  <option value="N">N</option>
                  <option value="S">S</option>
                  <option value="N and S">N and S</option>
                </select>
              </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Sign Stake in Place:</label>
                <select className="form-control" value={this.state.value} name="">
                  <option></option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>                </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputPassword4">Turtle found scarp >=46cm:</label>
                <select className="form-control" value={this.state.value} name="">
                  <option></option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                </div>
            </div>



            <div className="form-row">
              <div className="form-group col-md-10">
                <label htmlFor="inputEmail4">Is the nest seaward of man-made structure?:</label>
                <select className="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option value="true">Yes</option>
                <option value="false">No</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-10">
                <label htmlFor="inputPassword4">If Yes, is it within 1m of the structure?:</label>
                <select className="form-control" value={this.state.value} name="">
                  <option></option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            </div>



            <h4>Describe Structure:</h4>
              <div className="col-sm-15">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>


            <h4>Notes:</h4>
              <div className="col-sm-15">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>



          </div>
        </div>

        <div className="container-fluid border-top mt-2 mb-2">

        <h5><b>For DC only: </b></h5>

            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">Outgoing crawl width:</label>
                <select className="form-control" id="exampleFormControlSelect1">
                <option>Yes</option>
                <option>No</option>
                </select>
              </div>

              <div className="form-group col-md-3">
                <label htmlFor="inputPassword4">Yolkless Collected?</label>
                <select className="form-control" id="exampleFormControlSelect1">
                <option>Yes</option>
                <option>No</option>
                </select>
              </div>

              <div className="form-group col-md-3">
                <label htmlFor="inputPassword4">Pink Spot Photo?</label>
                <select className="form-control" id="exampleFormControlSelect1">
                <option>Yes</option>
                <option>No</option>
                </select>
              </div>

              <div className="form-group col-md-3">
                <label htmlFor="inputPassword4">Photo Taken By:</label>
                <input type="text" className="form-control" />

              </div>

            </div>
            </div>

        </div>
        </div>

      </div>

      <button type="submit" className="btn btn-primary">SUBMIT</button>

      <SubmitConfirmModal
        show={this.state.modalIsShowing}
        // redirectURL="/home"
      />
      </form>

        </div>

        <InternalFooter />
      </>
    );
  }
}



export default Beach;
