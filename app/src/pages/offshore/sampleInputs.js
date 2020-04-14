import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const SampleInputs = (props) => {
  return (
    props.samplesList.map((val, idx)=> {
      let sample_type = `sample_type-${idx}`, received_by= `received_by-${idx}` ,purpose_of_sample= `purpose_of_sample-${idx}`, notes = `notes-${idx}`, entered_date =`entered_date-${idx}`, entered_by = `entered_by-${idx}`, magnet_off = `magnet_off-${idx}`
      return (
        <div key={idx}>

        <div class="container border pt-3 mb-3 pb-3">

        <div className="form-row">
        <label htmlFor="samples" className="col-2 col-form-label">Type:</label>
        <label htmlFor="samples" className="col-3 col-form-label">Received by:</label>
        <label htmlFor="samples" className="col-3 col-form-label">Purpose:</label>
        <label htmlFor="samples" className="col-4 col-form-label">Notes:</label>

  </div>


          <div className="form-row mb-3">
          <div className="col-2">
          <select name="sample_type" id={sample_type} data-id={idx} className="form-control" >
                        <option value="">-</option>
                        <option value="Blood">Blood</option>
                        <option value="Skin #1">Skin #1</option>
                        <option value="Skin #2">Skin #2</option>
                        <option value="Scute">Scute</option>
                        <option value="Sargassum">Sargassum</option>
                        <option value="Sargassum">Other</option>
          </select>
          </div>

          <div className="col-3">
          <input type="text"  name="received_by" data-id={idx} id={received_by} className="form-control " />

          </div>

          <div className="col-3">
          <input type="text"  name="purpose_of_sample" data-id={idx} id={purpose_of_sample} className="form-control " />

          </div>

            <div className="col-4">
            <input type="text"  name="notes" data-id={idx} id={notes} className="form-control " />
            </div>
          </div>

</div>
        </div>
      )
    })
  )
}
export default SampleInputs
