import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const TagInputs = (props) => {
  return (
    props.tagsList.map((val, idx)=> {
      let tag_number = `tag_number-${idx}`, tag_type= `tag_type-${idx}` ,active= `active-${idx}`, tag_scars = `tag_scars-${idx}`, pit =`pit-${idx}`, scanned = `scanned-${idx}`, scanner_number=`scanner_number-${idx}`
      return (
        <div key={idx}>
          <div className="container border pt-3 mb-1">

          <div className="form-group row">
            <label htmlFor="tag-numbers" className="col-4 col-form-label">Tag #:</label>
            <label htmlFor="tag-type" className="col-4 col-form-label">Tag Location:</label>
            <label htmlFor="tag-type" className="col-3 col-form-label">Tag Scars:</label>
            <div className="col-4">
            <input type="text"  name="tag_number" data-id={idx} id={tag_number} className="form-control " />

            </div>
            <div className="col-4">
            <select name="tag_type" id={tag_type} data-id={idx} className="form-control" >
                          <option >LF/RF</option>
                          <option value="LF">LF</option>
                          <option value="RF">RF</option>
            </select>

            </div>
            <div className="col-3">
            <select name="tag_scars" id={tag_scars} data-id={idx} className="form-control" >
                          <option>Y/N</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
            </select>
            </div>
            </div>

            <div className="form-group row">

            <label htmlFor="tag-type" className="col-4 col-form-label">Tag Type:</label>
            <label htmlFor="tag-type" className="col-4 col-form-label">Pit Tag Scanned:</label>
            <label htmlFor="tag-type" className="col-4 col-form-label">Scanner #:</label>


            <div className="col-4">
            <select name="pit" id={pit} data-id={idx} className="form-control" >
                          <option></option>
                          <option value="true">PIT Tag</option>
                          <option value="false">Standard Tag</option>
            </select>
            </div>

            <div className="col-4">
            <select name="scanned" id={scanned} data-id={idx} className="form-control" >
                          <option></option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
            </select>
            </div>

            <div className="col-4">
            <input type="text"  name="scanner_number" data-id={idx} id={scanner_number} className="form-control " />
            </div>
          </div>

          </div>



        </div>
      )
    })
  )
}
export default TagInputs
