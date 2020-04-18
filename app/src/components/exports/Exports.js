import React from 'react';
// import './App.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import { Button, FormControl, Form } from 'react-bootstrap';
import LoadingSpinner from '../loading-spinner';

let data = {}
let filters = {}

export class Exports extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: {},
      isLoading: true,
      showLoadFiltersModal: false,
      showSaveFiltersModal: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.processInput = this.processInput.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.toggleLoadFiltersModal = this.toggleLoadFiltersModal.bind(this);
    this.toggleSaveFiltersModal = this.toggleSaveFiltersModal.bind(this);
    this.saveFilters = this.saveFilters.bind(this);
    this.refreshFilters = this.refreshFilters.bind(this);
    this.loadFilterSet = this.loadFilterSet.bind(this);
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const incomingData = await axios.get("https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/exports/fields/capture");
    data = incomingData.data;
    // Initialize selected object to all false, filters set to ""
    Object.entries(data).map(([table, columns]) => {
      this.state.selected[table] = {}
      Object.entries(columns).map(([key, value]) => {
        this.state.selected[table][key] = false;
        this.state.selected[table][key + "_filter"] = "";
      });
    });
    this.refreshFilters();
    this.setState({ isLoading: false });
  }

  async refreshFilters() {
    const refreshFiltersJson = {"username": ""}
    const incomingFilters = await axios.post("https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/exports/filters/get-by-username", refreshFiltersJson);
    filters = incomingFilters.data;
    this.forceUpdate();
  }

  handleChange(e) {
    // parse the id for the location in our object
    const mapLoc = e.target["id"].split(".");
    // update the object
    this.state.selected[mapLoc[0]][mapLoc[1]] = !this.state.selected[mapLoc[0]][mapLoc[1]];
    this.forceUpdate();
  }

  handleSelectAll(e) {
    //console.log(e.target["checked"]);
    const table = e.target["id"].split(".")[0];
    Object.entries(this.state.selected[table]).map(([col, index]) => {
      if (col.includes("_filter")) return;
      this.state.selected[table][col] = e.target["checked"];
    })
    this.forceUpdate();
  }

  processInput(e) {
    // parse the id for the location in our object
    const mapLoc = e.target["id"].split(".");
    // update the object
    this.state.selected[mapLoc[0]][mapLoc[1]] = e.target.value;
    this.forceUpdate();
  }

  async submitForm() {
    const outgoingJson = {}
    Object.entries(data).map(([table,columns]) => {
      Object.entries(columns).map(([col, index]) => {
        // does the user want this field?
        if (this.state.selected[table][col] === true) {
          // only add the table to our json if it has a field that the user wants
          if (!(table in outgoingJson)) {
            outgoingJson[table] = {}
          }
          outgoingJson[table][col] = this.state.selected[table][col + "_filter"];
          // do quick replace on number columns... - becomes _
          if (data[table][col] === "int" || data[table][col] === "float" 
                  || data[table][col] === "date" || data[table][col] === "time") {
            outgoingJson[table][col] = outgoingJson[table][col].replace("-", "_");
          }
        }
      });
    });
    const resp = await axios.post("https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/exports/csv", outgoingJson, {responseType: 'blob'});
    const url = window.URL.createObjectURL(new Blob([resp.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'export.csv');
    document.body.appendChild(link);
    link.click();
  }

  async saveFilters() {
    const filter_set = {
        filter_set_name: this.filterSetName.value,
        username: "",
        survey_filter_set: "N",
        filter_data: JSON.stringify(this.state.selected)
    }
      await axios.post("https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/exports/filters/save", filter_set);
      this.toggleSaveFiltersModal();
      this.refreshFilters();
  }

  async loadFilterSet(e) {
    const getfilterSetJson = {"filter_set_id": e.target.id}
    const filter_set = await axios.post("https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/exports/filters/get", getfilterSetJson);
    this.state.selected = JSON.parse(filter_set.data["filter_data"]);
    this.forceUpdate();
    this.toggleLoadFiltersModal();
  }

  toggleLoadFiltersModal() {
    this.setState({showLoadFiltersModal: !this.state.showLoadFiltersModal});
  }

  toggleSaveFiltersModal() {
      this.setState({showSaveFiltersModal: !this.state.showSaveFiltersModal});
  }

  render() {
    if (this.state.isLoading) return (
        <div>
          <LoadingSpinner />
        </div>
    );
    else return (
      <div className="w-50">
          <div className="mb-5">
            <h2 className="mb-3">Filter Sets</h2>
            <Button variant="primary" onClick={this.toggleLoadFiltersModal}>Load</Button>
            <Button variant="success" className="ml-1" onClick={this.toggleSaveFiltersModal}>Save</Button>
          </div>
          <h2 className="text-center">Capture Data Tables</h2>
          <div id="accordion">
            {
              Object.entries(data).map(([table, columns]) => (
                <div className="card border" key={table}>
                  <div className="card-header">
                    <a className="card-link" data-toggle="collapse" href={"#collapse-" + table}>
                    <i className="fa fa-chevron-down" />
                      <span className="ml-1">{table}</span>
                    </a>
                  </div>
                  <div id={"collapse-" + table} className="collapse" data-parent="#accordion">
                    <div className="card-body text-left pl-5"> 
                      <div className="form-check" key={table + ".all"}>
                          <input type="checkbox" id={table + ".all"} onChange={this.handleSelectAll} />
                          <label className="ml-1 mr-2" htmlFor={table + ".all"}>Select All</label>
                      </div>
                      {
                        Object.entries(columns).map(([key, value]) => (
                          <div className="form-check" key={key}>
                            <input type="checkbox" id={table + "." + key} checked={this.state.selected[table][key] === true}
                                onChange={this.handleChange} />
                            <label className="ml-1 mr-2" htmlFor={key}>{key}</label>
                            <span className={!this.state.selected[table][key] ? "d-none" : ""}>
                              <input type="text" id={table + "." + key + "_filter"} className="w-50"
                                    defaultValue={this.state.selected[table][key + "_filter"]}
                                    onInput={this.processInput} placeholder="Enter filter" />
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
              </div>
            ))}
          </div>
          <Button variant="primary" className="border btn-block mt-2" onClick={this.submitForm}>Download</Button>
          {
                <Modal show={this.state.showLoadFiltersModal}>
                <Modal.Header>
                    <Modal.Title>Load Filter Set</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        filters
                        ? Object.entries(filters).map(([filter, index]) => (
                            <div key={filter}>
                            <span>{filters[filter]["filter_set_name"]}</span>
                            <Button variant="primary" className="ml-2" size="sm"
                                    id={filters[filter]["filter_set_id"]} onClick={this.loadFilterSet}>Load</Button>
                            </div>
                        ))
                        : "There are no saved filter sets!"
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.toggleLoadFiltersModal} variant="info">Close</Button>
                </Modal.Footer>
              </Modal>
          }
          {
                <Modal show={this.state.showSaveFiltersModal}>
                <Modal.Header>
                    <Modal.Title>Save Filter Set</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="filterSetName">
                            <FormControl
                                placeholder="Filter Set Name"
                                aria-label="Filter Set Name"
                                ref={filterSetName => this.filterSetName = filterSetName}
                            />
                        </Form.Group>
                        <Form.Group controlId="shareCheckbox">
                            <Form.Check type="checkbox" label="Make this filter set visible to all users" />
                        </Form.Group>
                        <Button onClick={this.saveFilters} variant="success">Save</Button>
                        <Button onClick={this.toggleSaveFiltersModal} className="ml-1" variant="info">Close</Button>
                    </Form>
                </Modal.Body>
                </Modal>
          }
      </div>
    );
  }
}
