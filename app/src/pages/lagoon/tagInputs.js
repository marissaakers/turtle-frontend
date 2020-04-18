import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';


const TagInputs = (props) => {
  return (
    props.tagsList.map((val, idx)=> {
      let tag_number = `tag_number-${idx}`, isNew = `isNew-${idx}`, tag_type= `tag_type-${idx}` ,active= `active-${idx}`, pit =`pit-${idx}`
      return (
        <div key={idx}>
          <div className="container border pt-3 mb-1">

          <div className="form-group row">
            <label htmlFor="tag-numbers" className="col-3 col-form-label">Tag #:</label>
            <label htmlFor="tag-type" className="col-3 col-form-label">Location:</label>
            <label htmlFor="tag-type" className="col-2 col-form-label">Type:</label>
            <label htmlFor="tag-type" className="col-2 col-form-label">Status:</label>
            <label htmlFor="tag-type" className="col-2 col-form-label">PIT:</label>

            <div className="col-3 pr-0">
            <input type="text"  name="tag_number" data-id={idx} id={tag_number} className="form-control " />

            </div>
            <div className="col-3 pr-0">
            <select name="tag_type" id={tag_type} data-id={idx} className="form-control" >
                          <option ></option>
                          <option value="LF">LF</option>
                          <option value="RF">RF</option>
            </select>

            </div>
            <div className="col-2 pr-0">
            <select name="tag_scars" id={isNew} data-id={idx} className="form-control" >
                          <option></option>
                          <option value="true">New</option>
                          <option value="false">Old</option>
            </select>
            </div>
            <div className="col-2 pr-0">
            <select name="tag_scars" id={isNew} data-id={idx} className="form-control" >
                          <option></option>
                          <option value="true">Active</option>
                          <option value="false">Lost</option>
            </select>
            </div>
            <div className="col-2">
            <select name="tag_scars" id={isNew} data-id={idx} className="form-control" >
                        <option value="false"></option>
                          <option value="true">Yes</option>
            </select>
            </div>
          </div>

          </div>



        </div>
      )
    })
  )
}
export default TagInputs
