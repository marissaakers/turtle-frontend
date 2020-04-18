import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import InternalNavbar from '../../components/internal-navbar';
import InternalFooter from '../../components/internal-footer';
import '../shared/internal.css';

const TITLE = 'MTRG - Choose export type'

class ExportPick extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      previewImage: require('./capture-preview.png'),
      previewImages: [
        require('./capture-preview.png'),
        require('./survey-preview.png')
      ],
      highlightedBoxNum: 0
    }
  }

  mousedOverFormOption = (event, linkNum) => {
    this.setState({previewImage: this.state.previewImages[linkNum]});
    this.setState({highlightedBoxNum: linkNum});
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

        <div className="container" align="left">
          {/* Labels */}
          <div className="row pb-3 pt-2">
            <div className="col-sm-6">
              <h3>Select an export type:</h3>
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
                     href='export/capture'
                     className={ this.getBoxHighlightedClassName(0)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 0)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>CAPTURE</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
                <div className="row">
                  <a role="button"
                     href='export/survey'
                     className={ this.getBoxHighlightedClassName(1)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 1)}}
                     onMouseLeave={this.mouseLeftFormOption} >
                    <div className="choose-form-button-contents pl-2" align="left">
                      <h5><b>SURVEY</b></h5>
                      <p>This is a description.</p>
                    </div>
                  </a>
                </div>
              </div>
              <p className="pt-3 pb-5">You'll be able to export to .CSV file format.</p>
            </div>
            <div className="col-sm-1 my-auto" align="center">
              <img src={require('./tall-arrow.png')} width='30px' height='70px'/>
            </div>
            <div className="col-sm-3">
              <div style={{height:'20px'}}></div>
              <img src={ this.state.previewImage } height='340px' className="border shadow bg-white"/>
            </div>
          </div>

          {/* Description */}
          <div className="row">
            <div className="col-sm-6">

            </div>
          </div>
        </div>

        <InternalFooter />
      </>
    );
  }
}

export default ExportPick;
