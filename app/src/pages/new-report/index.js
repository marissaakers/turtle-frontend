import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';

const TITLE = 'MTRG - Choose new report'

class NewReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImage: require('./lagoon-preview.png'),
      previewImages: [
        require('./lagoon-preview.png'),
        require('./lagoon-metadata-preview.png'),
        ,
        
      ]
    }
  }

  mousedOverFormOption = (linkNum) => {
    this.setState({previewImage: this.state.previewImages[linkNum]});
  }

  render() {
    return(
      <>
        <Helmet>
          <title>{ TITLE }</title>
        </Helmet>

        <InternalNavbar />
        <p align="left" className="pl-4"><a href="/home">← back</a></p>

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

          {/* Buttons and previews */}
          <div className="row pb-4 pt-1">
            <div className="col-sm-6">
              <div className="pl-3">
                <div className="row">
                  <a role="button"
                     href='new-report/lagoon'
                     className="btn btn-light border btn-block mb-2 rounded-0"
                     onMouseOver={this.mousedOverFormOption.bind(this, 0)} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>Lagoon</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/lagoonmetadata'
                     className="btn btn-light border btn-block mb-2 rounded-0"
                     onMouseOver={this.mousedOverFormOption.bind(this, 1)} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>Lagoon Metadata</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/lagoon'
                     className="btn btn-light border btn-block mb-2 rounded-0"
                     onMouseOver={this.mousedOverFormOption.bind(this, 2)} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>Placeholder</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='new-report/lagoon'
                     className="btn btn-light border btn-block mb-2 rounded-0"
                     onMouseOver={this.mousedOverFormOption.bind(this, 3)} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>Placeholder</b></h5>
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
              <div className="border shadow bg-white">
                <img src={ this.state.previewImage } height='367px'/>
              </div>
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

        <InternalFooter />
      </>
    );
  }
}

export default NewReport;
