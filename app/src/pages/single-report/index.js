import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";

const TITLE = 'MTRG - View report'

class SingleReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      data: {}
    }
  }

  async componentDidMount() {
    this.setState({isLoading: true});
    const data = await axios.get('https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon');
    this.setState(data);
    this.setState({isLoading: false});
    console.log(this.state.data)
  }

  render() {
    let displayBlock;
    let _data = this.state.data;

    if (this.state.isLoading) {
      displayBlock = (
        <div>
          <h2>Loading...</h2>
        </div>
      )
    }
    else {

      const tagsList = [];
      for (var i = 0; i < _data.tags.length; i++) {
        tagsList.push( <li>{ _data.tags[i].tag_number }</li> )
      }
      const netsList = [];
      for (var i = 0; i < _data.metadata.nets.length; i++) {
        netsList.push( <li>Net ID { _data.metadata.nets[i].net_id }</li> )
      }
      const incidentalCapturesList = [];
      for (var i = 0; i < _data.metadata.incidental_captures.length; i++) {
        incidentalCapturesList.push( <li>Incidental capture ID { _data.metadata.incidental_captures[i].incidental_capture_id }</li> )
      }
      const sampleList = [];
      for (var i = 0; i < _data.encounter.samples.length; i++) {
        sampleList.push( <li>Sample ID { _data.encounter.samples[i].samples_id }</li> )
      }

      displayBlock = (
        <div >
          <h3>MTRG - View report #{ _data.encounter.encounter_id }</h3>
          <p>Here we display the values of the report.</p>

          <div align="left" class="pl-4">
            <h4><b>General</b></h4>
            <p>Encounter ID: { _data.encounter.encounter_id }</p>
            <p>Encounter date: { _data.encounter.encounter_date }</p>
            <p>Encounter time: { _data.encounter.encounter_time }</p>
            <p>Entered date: { _data.encounter.entered_date }</p>
            <p>Verified date: { _data.encounter.verified_date }</p>
            <p>Investigated by: { _data.encounter.investigated_by }</p>
            <p>Entered by: { _data.encounter.entered_by }</p>
            <p>Verified by: { _data.encounter.verified_by }</p>
            <br></br>
            <p>Turtle ID: { _data.turtle_id}</p>
            <p>Species: { _data.encounter.species }</p>
            <p>Type: { _data.encounter.type }</p>
            <br></br>
            <p>Paps encounter: { _data.encounter.paps.encounter }</p>
            <p>Number of paps: { _data.encounter.paps.number_of_paps }</p>
            <p>Pap ID: { _data.encounter.paps.pap_id }</p>
            <p>Paps regression: { _data.encounter.paps.paps_regression }</p>

            <h4><b>Tags</b></h4>
            <ul>
              { tagsList }
            </ul>
            <br></br>

            <h4><b>Metadata</b></h4>
            <p>Metadata date: { _data.metadata.metadata_date }</p>
            <p>Metadata ID: { _data.metadata.metadata_id }</p>
            <p>Metadata investigators: { _data.metadata.metadata_investigators }</p>
            <p>Metadata location: { _data.metadata.metadata_location }</p>
            <p># of CC captured: { _data.metadata.number_of_cc_captured }</p>
            <p># of CM captured: { _data.metadata.number_of_cm_captured }</p>
            <p># of other captured: { _data.metadata.number_of_other_captured }</p>
            <br></br>
            <p>Air temperature: { _data.metadata.environment.air_temp }</p>
            <p>Environment ID: { _data.metadata.environment.environment_id }</p>
            <p>Environment time: { _data.metadata.environment.environment_time }</p>
            <p>Metadata: { _data.metadata.environment.metadata }</p>
            <p>Salinity surface: { _data.metadata.environment.salinity_surface }</p>
            <p>Salinity 1m: { _data.metadata.environment.salinity_1_m }</p>
            <p>Salinity 2m: { _data.metadata.environment.salinity_2_m }</p>
            <p>Salinity 6m: { _data.metadata.environment.salinity_6_m }</p>
            <p>Salinity bottom: { _data.metadata.environment.salinity_bottom }</p>
            <p>Water temp surface: { _data.metadata.environment.water_temp_surface }</p>
            <p>Water temp 1m: { _data.metadata.environment.water_temp_1_m }</p>
            <p>Water temp 2m: { _data.metadata.environment.water_temp_2_m }</p>
            <p>Water temp 6m: { _data.metadata.environment.water_temp_6_m }</p>
            <p>Water temp bottom: { _data.metadata.environment.water_temp_bottom }</p>
            <p>Weather: { _data.metadata.environment.weather }</p>
            <p>Wind direction: { _data.metadata.environment.wind_dir }</p>
            <p>Wind speed: { _data.metadata.environment.wind_speed }</p>
            <br></br>
            <p>Incidental captures:</p>
            <ul>
              { incidentalCapturesList }
            </ul>
            <p>Nets:</p>
            <ul>
              { netsList }
            </ul>
            <br></br>

            <h4><b>Samples</b></h4>
            <p>Samples:</p>
            <ul>
              { sampleList }
            </ul>
            <br></br>

            <h4><b>Morphometrics</b></h4>
            <p>Body depth: { _data.morphometrics.body_depth }</p>
            <p>Carapace damage: { _data.morphometrics.carapace_damage }</p>
            <p>Curved length: { _data.morphometrics.curved_length }</p>
            <p>Curved width: { _data.morphometrics.curved_width }</p>
            <p>Encounter: { _data.morphometrics.encounter }</p>
            <p>Flipper carapace: { _data.morphometrics.flipper_carapace }</p>
            <p>Head width: { _data.morphometrics.head_width }</p>
            <p>Minimum length: { _data.morphometrics.minimum_length }</p>
            <p>Morphometrics ID: { _data.morphometrics.morphometrics_id }</p>
            <p>Plastron length: { _data.morphometrics.plastron_length }</p>
            <p>Straight length: { _data.morphometrics.straight_length }</p>
            <p>Straight width: { _data.morphometrics.straight_width }</p>
            <p>Tail length PL tip: { _data.morphometrics.tail_length_pl_tip }</p>
            <p>Tail length PL vent: { _data.morphometrics.tail_length_pl_vent }</p>
            <p>Weight: { _data.morphometrics.weight }</p>
            <br></br>
          </div>
        </div>
      )
    }

    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        {displayBlock}
      </>
    )
  }
}


export default SingleReport;
