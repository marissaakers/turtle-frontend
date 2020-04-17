import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { Modal, Button } from 'react-bootstrap';
import { Redirect } from 'react-router-dom'
import axios from "axios";
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';

const TITLE = 'MTRG - Choose new report'

class NewReport extends React.Component {
  constructor(props) {
    super(props);

    this.handleShowLagoon = this.handleShowLagoon.bind(this);
    this.handleSubmitLagoon = this.handleSubmitLagoon.bind(this);
    this.handleCloseLagoon = this.handleCloseLagoon.bind(this);
    this.handleShowTrident = this.handleShowTrident.bind(this);
    this.handleCloseTrident = this.handleCloseTrident.bind(this);

    this.state = {
      previewImage: require('./lagoon-preview.png'),
      previewImages: [
        require('./lagoon-preview.png'),
        require('./trident-preview.png'),
        require('./beach-preview.png'),
        require('./offshore-preview.png'),
        require('./midreach-survey-preview.png'),
        require('./south-reach-survey-preview.png'),
        require('./pafb-survey-preview.png'),
        require('./depredations-preview.png'),
        require('./false-crawl-preview.png'),
        require('./scarp-preview.png'),
      ],
      highlightedBoxNum: 0,
      metadata: undefined,
      showLagoon:false,
      showTrident:false,
      redirectLagoon: false,
      redirectTrident: false
    }
  }

  async loadMetadata(json) {
    const metadata = await axios.post(
      'https://no1unm6ijk.execute-api.us-east-1.amazonaws.com/dev/api/capture/lagoon/metadata/query',
      json,
      { headers: {'Content-Type': 'application/json'} }
    );

    this.setState({metadata: metadata.data});
    return (this.state.metadata.metadata_id);
  }

  renderRedirect = () => {
   if (this.state.redirectLagoon) {
     return <Redirect to='/new-report/lagoon-metadata' />
   } else if (this.state.redirectTrident) {
     return <Redirect to='/new-report/trident-metadata' />
   }
 }

  	handleCloseLagoon() {
  		this.setState({ showLagoon: false });
  	}

    handleSubmitLagoon = async(e) => {
      this.setState({ [e.target.name]: e.target.value })
      const getMetadataID = await this.loadMetadata({metadata_date: this.state.metadata_date})

      if(getMetadataID != undefined){
        this.setState({redirectLagoon: true})
      }

      console.log(getMetadataID);

    }

  	handleShowLagoon() {
  		this.setState({ showLagoon: true });
  	}

    handleCloseTrident() {
      this.setState({ showTrident: false });
    }

    handleShowTrident() {
      this.setState({ showTrident: true });
    }

  mousedOverFormOption = (event, linkNum) => {
    this.setState({previewImage: this.state.previewImages[linkNum]});
    this.setState({highlightedBoxNum: linkNum});
  }

  mouseLeftFormOption = (event) => {

  }

  getBoxHighlightedClassName = (boxNum) => {
    let returnStr = "btn btn-light border btn-block mb-2 rounded-0 "
    if (boxNum === this.state.highlightedBoxNum) {
      return (returnStr + "choose-form-highlight-button");
    }
    else {
      return returnStr;
    }
  }


  render() {
    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/home">← back</a></p>

        <style type="text/css">
            {`
            .allreports {
              zoom: 80%;
            }
            `}
          </style>

        <div className="allreports">
        <div className="container" align="left">
          {/* Labels */}
          <div className="row pb-3 pt-2">
            <div className="col-sm-6">
              <h3>Select a form:</h3>
            </div>
            <div className="col-sm-1"></div>
            <div className="col-sm-3">
              <h5 className="pt-2">Preview:</h5>
            </div>
          </div>

          {/* Modals */}
          <Modal show={this.state.showLagoon} onHide={this.handleCloseLagoon}>
					<Modal.Header closeButton>
						<Modal.Title>Lagoon Metadata Date</Modal.Title>
					</Modal.Header>
					<Modal.Body>Enter a date from the input box below. <br></br>
          <input className="form-control" type="date" name="metadata_date" onClick={e => this.handleSubmitLagoon(e)}/> <br></br>
          If metadata for that date exists, you will be forwarded to the encounter sheet.
          If not, you must enter metadata for that date in order to enter an encounter.
          </Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.handleCloseLagoon}>
							Close
            </Button>
						<Button variant="primary" onClick={e => this.handleSubmitLagoon(e)}>
							Go
            </Button>
            {this.renderRedirect()}

					</Modal.Footer>
				</Modal>

          {/* Buttons and previews */}
          <div className="row pb-4 pt-1">
            <div className="col-sm-6">
              <div className="pl-3">
                <div className="row">
                  <a role="button"
                     className={ this.getBoxHighlightedClassName(0)}
                     onClick={this.handleShowLagoon}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 0)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>LAGOON</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/trident-metadata'
                     className={ this.getBoxHighlightedClassName(1)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 1)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>TRIDENT</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/beach'
                     className={ this.getBoxHighlightedClassName(2)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 2)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>BEACH</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/offshore'
                     className={ this.getBoxHighlightedClassName(3)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 3)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>OFFSHORE</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>

                <div className="row">
                  <a role="button"
                     href='new-report/survey-midreach'
                     className={ this.getBoxHighlightedClassName(4)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 4)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>MIDREACH SURVEY</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>

                <div className="row">
                  <a role="button"
                     href='new-report/survey-south-reach'
                     className={ this.getBoxHighlightedClassName(5)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 5)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>SOUTH REACH SURVEY</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>

                <div className="row">
                  <a role="button"
                     href='new-report/survey-pafb'
                     className={ this.getBoxHighlightedClassName(6)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 6)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>PAFB SURVEY</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>

                <div className="row">
                  <a role="button"
                     href='new-report/survey-depredations'
                     className={ this.getBoxHighlightedClassName(7)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 7)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>DEPREDATIONS</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/survey-false-crawl'
                     className={ this.getBoxHighlightedClassName(8)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 8)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>FALSE CRAWL</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/survey-scarp'
                     className={ this.getBoxHighlightedClassName(9)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 9)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>SCARP</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
            <div className="col-sm-1 my-auto" align="center">
              <img src={require('./tall-arrow.png')} width='30px' height='70px'/>
            </div>
            <div className="col-sm-3">
              <div style={{height:'280px'}}></div>
              <img src={ this.state.previewImage } height='367px' className="border shadow bg-white"/>
            </div>
          </div>

          {/* Description */}
          <div className="row">
            <div className="col-sm-6">
              <p className="pt-3 pb-5">Don't worry about the metadata sheet--you will be
                    prompted to select one or create a new one after choosing a form.</p>
            </div>
          </div>
        </div>
        </div>

        <InternalFooter />
      </>
    );
  }
}

export default NewReport;
