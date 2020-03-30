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
        require('./trident-preview.png'),
        require('./beach-preview.png'),
        require('./offshore-preview.png'),
        require('./midreach-survey-preview.png'),
        require('./depredations-preview.png'),
        require('./false-crawl-preview.png'),
        require('./scarp-preview.png'),
      ],
      highlightedBoxNum: 0
    }
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
                     href='new-report/lagoon-metadata'
                     className={ this.getBoxHighlightedClassName(0)}
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
                     href='new-report/survey-depredations'
                     className={ this.getBoxHighlightedClassName(5)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 5)}}
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
                     className={ this.getBoxHighlightedClassName(6)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 6)}}
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
                     className={ this.getBoxHighlightedClassName(7)}
                     onMouseOver={(e) => {this.mousedOverFormOption(e, 7)}}
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
              <div style={{height:'190px'}}></div>
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

        <InternalFooter />
      </>
    );
  }
}

export default NewReport;
