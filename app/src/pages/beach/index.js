import React, { Component } from 'react';
import Button from 'react-bootstrap/Button'
import { Link }from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import axios from "axios";


const metadata_investigators = 'MTRG - Beach Data'


class Beach extends Component {

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
     return <Redirect to='/new-report/beach-inventory' />
   }
 }


  handleSubmit = async(e) => {
     e.preventDefault();


     const data = {


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
          <metadata_investigators>{ metadata_investigators }</metadata_investigators>
        </Helmet>
        <InternalNavbar />

        <p align="left" className="pl-4"><a href="/new-report">← back</a></p>
        <p align="right" className="pr-5"><a href="/new-report/beach-inventory">see beach inventory sheet →</a></p>


      <h1><b>BEACH DATA SHEET</b></h1>

      <div className="container-fluid">
      <form action="" onSubmit={this.handleSubmit}>

      <div className="justify-content-center row pb-2 pt-2">
      <div className="col-sm-10 mr-2 ml-2 border pr-2 pl-2 pb-3 pt-3">



      <div className="container-fluid text-left">
        <div className="row">
          <div className="col-sm-6">

          <div className="row">
          <div className="col-sm-6">

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">45 days:</label>
            <div className="col-7">
            <input className="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">70 days:</label>
            <div className="col-7">
            <input className="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Stake #:</label>
            <div className="col-7">
            <input className="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Species:</label>
            <div className="col-7">
            <select className="form-control" id="exampleFormControlSelect1">
               <option>Cc</option>
               <option>Cm</option>
               <option>Dm</option>
             </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Capture Type:</label>
            <div className="col-7">
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>New</option>
                    <option>Old</option>
                    <option>Strange Recap</option>
                </select>
              </div>
            </div>



          <div className="form-group row">
            <label htmlFor="example-date-input" className="col-5 col-form-label">Date:</label>
            <div className="col-7">
              <input className="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Time:</label>
            <div className="col-7">
            <input className="form-control" type="time"   id="example-time-input"/>
            </div>
          </div>


          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Activity:</label>
            <div className="col-7">
              <input className="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Location:</label>
            <div className="col-7">
              <input className="form-control" type="text" name= "metadata_location" onChange={e => this.onChange(e)} />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Lat N:</label>
            <div className="col-7">
            <input className="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Long W:</label>
            <div className="col-7">
            <input className="form-control" type="text" id="example-text-input"/>
            </div>
          </div>



          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Investigators:</label>
            <div className="col-7">
              <input className="form-control" type="text" onChange={e => this.onChange(e)} />
            </div>
          </div>


          </div>
          <div className="col-sm-6">

          <h5><b>Tag Information: </b></h5>
          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Prime Tag:</label>
            <div className="col-7">
            <input className="form-control" type="text" id="example-text-input"/>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Tag Scar:</label>
            <div className="col-7">
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>LF</option>
                    <option>RF</option>
                    <option>NONE</option>
                </select>
              </div>
            </div>

        <div className="form-group row">
              <label htmlFor="example-text-input" className="col-5 col-form-label">Tag #: LF/LR</label>
              <div className="col-7">
                    <input className="form-control" type="text" id="example-text-input"/>
              </div>
        </div>

          <div className="form-group row">
                <label htmlFor="example-text-input" className="col-5 col-form-label">Tag #: RF/RR</label>
                <div className="col-7">
                    <input className="form-control" type="text" id="example-text-input"/>
                </div>
          </div>


          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Pit Tag: Scanned:</label>
            <div className="col-7">
            <select className="form-control" id="exampleFormControlSelect1">
               <option>Yes</option>
               <option>No</option>
             </select>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="example-text-input" className="col-5 col-form-label">Pit Tag:</label>
            <div className="col-7">
                <select className="form-control" id="exampleFormControlSelect1">
                    <option>New</option>
                    <option>Old</option>
                </select>
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="example-date-input" className="col-5 col-form-label">Scanner #:</label>
              <div className="col-7">
                <input className="form-control" type="date" name="metadata_date" onChange={e => this.onChange(e)} />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="example-text-input" className="col-5 col-form-label">Pit Tag: Location:</label>
              <div className="col-7">
                  <select className="form-control" id="exampleFormControlSelect1">
                      <option>RR</option>
                      <option>RF</option>
                  </select>
                </div>
              </div>
            </div>
            </div>


          <h5><b>Morphometrics: </b></h5>

          <div className="container border pt-2 mb-2">


            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="curved-length">Curved Length (notch-tip):</label>
                <input className="form-control" type="text" id="example-text-input"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="curved-width">Curved Width (widest):</label>
                <input className="form-control" type="text" id="example-text-input"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="straight-length">Straight Length (notch-tip):</label>
                <input className="form-control" type="text" id="example-text-input"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="straight-width">Straight Width (widest):</label>
                <input type="form-control" className="form-control" placeholder="in cm"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="min-length">Minimum Length (notch-notch):</label>
                <input type="form-control" className="form-control" placeholder="in cm"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="tail-length">Tail Length: PL-vent</label>
                <input type="form-control" className="form-control" placeholder="in cm"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="plastron-length">Plastron Length (tape):</label>
                <input type="form-control" className="form-control" placeholder="in cm"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="pl-tip">PL-Tip:</label>
                <input type="form-control" className="form-control" placeholder="in cm"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="weight">Weight in kg: *tare scale</label>
                <input type="form-control" className="form-control" placeholder="in kg"/>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="head-width">Head Width (straight):</label>
                <input type="form-control" className="form-control"/>
              </div>
              <div className="form-group col-md-6">

              </div>
            </div>

          </div>


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
                  <input type="password" className="form-control" id="inputPassword4" />

                </div>

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


          <h5>Flipper Damage:</h5>
          <div className="col-sm-15">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>

          <h5>Shell Damage:</h5>
          <div className="col-sm-15">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
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
                    <option>Yes</option>
                    <option>No</option>
                    </select>
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Sand Type:</label>
                  <select className="form-control" id="exampleFormControlSelect1">
                  <option>Natural</option>
                  <option>Artificial</option>
                  </select>
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Placement:</label>
                <input type="password" className="form-control" id="inputPassword4" />
              </div>
            </div>




          <h5><b>Nest Marking: </b></h5>

            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">HIDDEN STAKE:</label>
                <input type="password" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Planted In:</label>
                <input type="password" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputPassword4">DIST TO DUNE:</label>
                <input type="password" className="form-control" id="inputPassword4" />
              </div>
            </div>



            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">OBVIOUS STAKE:</label>
                <input type="password" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">Planted In:</label>
                <input type="password" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputPassword4">DIST TO HIGH TIDE:</label>
                <input type="password" className="form-control" id="inputPassword4" />
              </div>
            </div>



            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="inputEmail4">CAN BURIED:</label>
                <input type="password" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-4">
                <label htmlFor="inputPassword4">SIGN STAKE IN PLACE:</label>
                <input type="password" className="form-control" id="inputPassword4" />
                </div>
              <div className="form-group col-md-5">
                <label htmlFor="inputPassword4">Turtle found scarp >=46cm:</label>
                <input type="password" className="form-control" id="inputPassword4" />
              </div>
            </div>



            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Is the nest seaward of man-made structure?:</label>
                <select className="form-control" id="exampleFormControlSelect1">
                <option>Yes</option>
                <option>No</option>
                </select>
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPassword4">If Yes, is it within 1m of the structure?:</label>
                <select className="form-control" id="exampleFormControlSelect1">
                <option></option>
                <option>Yes</option>
                <option>No</option>
                </select>
              </div>
            </div>



            <h4>Describe Structure:</h4>
              <div className="col-sm-15">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>


            <h4>Site Description:</h4>
              <div className="col-sm-15">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>


            <h4>Notes:</h4>
              <div className="col-sm-15">
              <textarea className="form-control" id="exampleFormControlTextarea1" rows="2"></textarea>
              </div>



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



export default Beach;
