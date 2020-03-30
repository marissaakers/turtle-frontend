import React, { Component } from 'react';
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import '../shared/internal.css';


const TagInputs = (props) => {
  return (
    props.tags.map((val, idx)=> {
      let tag_numberId=`tag_numberId-${idx}`, tag_typeId=`tag_typeId-${idx}-${idx}`,activeId=`activeId-${idx}`,tag_scarId=`tag_scarId-${idx}`,pitId=`pitId-${idx}`, scannedId=`scannedId-${idx}`, scanner_numberId=`scanner_numberId-${idx}`
      return (
        <div key={idx}>
        <div className="container border pt-3 mb-3">


        <div className="form-row">
        <label htmlFor="tag_numberId" className="col-2 col-form-label mb-3 mr-0 pr-0 no-gutters">Tag #:</label>
            <div className="col-2 pl-0">
            <input type="text"
            className="form-control"
            name={tag_numberId}
            data-id={idx}
            id={tag_numberId}
            value={props.tags[idx].tag_number}
            />
            </div>
        <label htmlFor="tag_typeId" className="col-2 col-form-label mb-3">Tag Type:</label>
          <div className="col-2">
          <select
          className="form-control"
          name={tag_typeId}
          data-id={idx}
          id={tag_typeId}
          value={props.tags[idx].tag_type}
          >
          <option>LF/RF</option>
            <option value="LF">LF</option>
            <option value="RF">RF</option>
           </select>
                         </div>
        <label htmlFor="tag_scarId" className="col-2 col-form-label mb-3">Tag Scar:</label>
          <div className="col-2">
          <select className="form-control"
          name={tag_scarId}
          data-id={idx}
          id={tag_scarId}
          value={props.tags[idx].tag_scar}
          >
          <option>Y/N</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
           </select>
          </div>
        </div>

        <div className="form-row">
        <label htmlFor="pit-tag" className="col-2 col-form-label mb-3">Pit Tag:</label>
        <label htmlFor="scanned" className="col-2 col-form-label mb-3">Scanned:</label>
          <div className="col-2">
          <select className="form-control"
          name={scannedId}
          data-id={idx}
          id={scannedId}
          value={props.tags[idx].scanned}
          >
            <option>Y/N</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
           </select>   </div>
        <label htmlFor="scanner_number" className="col-2 col-form-label mb-3">Pit Tag #:</label>
          <div className="col-4">
          <input type="text"
          className="form-control"
          name={scanner_numberId}
          data-id={idx}
          id={scanner_numberId}
          value={props.tags[idx].scanner_number}
          placeholder="PIT tag #"
          />
          </div>
        </div>
</div>




        </div>
      )
    })
  )
}
export default TagInputs
