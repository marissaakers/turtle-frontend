import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const SampleInputs = (props) => {
  return (
    props.samplesList.map((val, idx)=> {
      let sample_type = `sample_type-${idx}`, received_by= `received_by-${idx}` ,purpose_of_sample= `purpose_of_sample-${idx}`, notes = `notes-${idx}`, entered_date =`entered_date-${idx}`, entered_by = `entered_by-${idx}`
      return (
        <div key={idx}>

        <div class="container border pt-3 mb-3 pb-3">

        <div className="form-row">
        <label htmlFor="samples" className="col-4 col-form-label">Type:</label>
        <label htmlFor="samples" className="col-4 col-form-label">Received by:</label>
        <label htmlFor="samples" className="col-4 col-form-label">Purpose:</label>
        </div>

          <div className="form-row mb-1">
          <div className="col-4">
          <select name="sample_type" id={sample_type} data-id={idx} className="form-control" >
                        <option></option>
                        <option value="Blood">Blood</option>
                        <option value="Skin">Skin</option>
                        <option value="Scute">Scute</option>
                        <option value="Lavage">Lavage</option>
                        <option value="Cloacal swab">Cloacal swab</option>
                        <option value="Feces">Feces</option>
                        <option value="Leeches">Leeches</option>
                        <option value="Leech eggs">Leech eggs</option>
                        <option value="Tumor">Tumor</option>
                        <option value="Slide with blood">Slide with blood</option>
                        <option value="Other">Other</option>

          </select>
          </div>

          <div className="col-4">
          <input type="text"  name="received_by" data-id={idx} id={received_by} className="form-control " />
          </div>

          <div className="col-4">
          <input type="text"  name="purpose_of_sample" data-id={idx} id={purpose_of_sample} className="form-control " />

          </div>
          </div>

          <div className="form-row">
            <label htmlFor="samples" className="col-4 col-form-label">Notes:</label>
          </div>
            <div className="col-12">
              <input type="text"  name="notes" data-id={idx} id={notes} className="form-control " />
            </div>

            </div>

        </div>
      )
    })
  )
}
export default SampleInputs
