import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from "axios";
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';

const TITLE = 'MTRG - View report'

class SingleReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      turtleData: {},
      encounterNum: -1
    }
  }

  async componentDidMount() {
    this.setState({ turtleData: this.props.location.state.turtleData });
    this.setState({ encounterNum: this.props.location.state.encounterNum });
    //
    // this.setState({isLoading: true});
    // const data = await axios.get('https://8lm507guic.execute-api.us-east-2.amazonaws.com/dev/api/capture/lagoon');
    // this.setState(data);
    // this.setState({isLoading: false});
    console.log("blabla turtle data = " + this.state.encounterNum);
  }

  render() {
    let displayBlock;

    if (this.state.encounterNum < 0) {
      displayBlock = (
        <div></div>
      )
    }
    else {
      let _data = this.state.turtleData;
      let _encounter = _data.encounters[this.state.encounterNum];

      const tagsList = [];
      for (var i = 0; i < _data.tags.length; i++) {
        tagsList.push( <li>{ _data.tags[i].tag_number }</li> )
      }
      const netsList = [];
      for (i = 0; i < _encounter.metadata.nets.length; i++) {
        netsList.push( <li>Net ID { _encounter.metadata.nets[i].net_id }</li> )
      }
      const incidentalCapturesList = [];
      for (i = 0; i < _encounter.metadata.incidental_captures.length; i++) {
        incidentalCapturesList.push( <li>Incidental capture ID { _encounter.metadata.incidental_captures[i].incidental_capture_id }</li> )
      }
      const sampleList = [];
      for (i = 0; i < _encounter.samples.length; i++) {
        sampleList.push( <li>Sample ID { _encounter.samples[i].samples_id }</li> )
      }

      displayBlock = (
        <div>
          <h3>MTRG - View report #{ this.state.encounterNum }</h3>
          <p>Here we display the values of the report.</p>

          <div align="left" class="pl-4">
            <h4><b>General</b></h4>
            <p>Encounter ID: { _encounter.encounter_id }</p>
            <p>Encounter date: { _encounter.encounter_date }</p>
            <p>Encounter time: { _encounter.encounter_time }</p>
            <p>Entered date: { _encounter.entered_date }</p>
            <p>Verified date: { _encounter.verified_date }</p>
            <p>Investigated by: { _encounter.investigated_by }</p>
            <p>Entered by: { _encounter.entered_by }</p>
            <p>Verified by: { _encounter.verified_by }</p>
            <br></br>
            <p>Turtle ID: { _data.turtle_id}</p>
            <p>Species: { _encounter.species }</p>
            <p>Type: { _encounter.type }</p>
            <br></br>
            <p>Paps encounter: { _encounter.paps.encounter }</p>
            <p>Number of paps: { _encounter.paps.number_of_paps }</p>
            <p>Pap ID: { _encounter.paps.pap_id }</p>
            <p>Paps regression: { _encounter.paps.paps_regression }</p>

            <h4><b>Tags</b></h4>
            <ul>
              { tagsList }
            </ul>
            <br></br>

            <h4><b>Metadata</b></h4>
            <p>Metadata date: { _encounter.metadata.metadata_date }</p>
            <p>Metadata ID: { _encounter.metadata.metadata_id }</p>
            <p>Metadata investigators: { _encounter.metadata.metadata_investigators }</p>
            <p>Metadata location: { _encounter.metadata.metadata_location }</p>
            <p># of CC captured: { _encounter.metadata.number_of_cc_captured }</p>
            <p># of CM captured: { _encounter.metadata.number_of_cm_captured }</p>
            <p># of other captured: { _encounter.metadata.number_of_other_captured }</p>
            <br></br>
            <p>Air temperature: { _encounter.metadata.environment.air_temp }</p>
            <p>Environment ID: { _encounter.metadata.environment.environment_id }</p>
            <p>Environment time: { _encounter.metadata.environment.environment_time }</p>
            <p>Metadata: { _encounter.metadata.environment.metadata }</p>
            <p>Salinity surface: { _encounter.metadata.environment.salinity_surface }</p>
            <p>Salinity 1m: { _encounter.metadata.environment.salinity_1_m }</p>
            <p>Salinity 2m: { _encounter.metadata.environment.salinity_2_m }</p>
            <p>Salinity 6m: { _encounter.metadata.environment.salinity_6_m }</p>
            <p>Salinity bottom: { _encounter.metadata.environment.salinity_bottom }</p>
            <p>Water temp surface: { _encounter.metadata.environment.water_temp_surface }</p>
            <p>Water temp 1m: { _encounter.metadata.environment.water_temp_1_m }</p>
            <p>Water temp 2m: { _encounter.metadata.environment.water_temp_2_m }</p>
            <p>Water temp 6m: { _encounter.metadata.environment.water_temp_6_m }</p>
            <p>Water temp bottom: { _encounter.metadata.environment.water_temp_bottom }</p>
            <p>Weather: { _encounter.metadata.environment.weather }</p>
            <p>Wind direction: { _encounter.metadata.environment.wind_dir }</p>
            <p>Wind speed: { _encounter.metadata.environment.wind_speed }</p>
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
            <p>Body depth: { _encounter.morphometrics.body_depth }</p>
            <p>Carapace damage: { _encounter.morphometrics.carapace_damage }</p>
            <p>Curved length: { _encounter.morphometrics.curved_length }</p>
            <p>Curved width: { _encounter.morphometrics.curved_width }</p>
            <p>Encounter: { _encounter.morphometrics.encounter }</p>
            <p>Flipper carapace: { _encounter.morphometrics.flipper_carapace }</p>
            <p>Head width: { _encounter.morphometrics.head_width }</p>
            <p>Minimum length: { _encounter.morphometrics.minimum_length }</p>
            <p>Morphometrics ID: { _encounter.morphometrics.morphometrics_id }</p>
            <p>Plastron length: { _encounter.morphometrics.plastron_length }</p>
            <p>Straight length: { _encounter.morphometrics.straight_length }</p>
            <p>Straight width: { _encounter.morphometrics.straight_width }</p>
            <p>Tail length PL tip: { _encounter.morphometrics.tail_length_pl_tip }</p>
            <p>Tail length PL vent: { _encounter.morphometrics.tail_length_pl_vent }</p>
            <p>Weight: { _encounter.morphometrics.weight }</p>
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

        <InternalNavbar />
        { displayBlock }
        <InternalFooter />
      </>
    )
  }
}


export default SingleReport;
