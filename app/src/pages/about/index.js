import React, { Component } from 'react';
import { Helmet } from 'react-helmet'

const TITLE = 'About'

class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }
  render() {
    return(
    <>
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>

      {/* <div id="loadedNavbar"></div> */}

      <div class="container-fluid bg-white about-description">
         <div class="row">
            <div class="col-sm-8">
               <h2 class="pb-3">About This Database</h2>
               <h4 class="pb-3">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</h4>
               <p class="pb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
               <div class="button-wrapper">
                  <a href="contact.html">
                     <button class="btn btn-outline-secondary btn-lg">Get in Touch</button>
                  </a>
               </div>
            </div>
            <div class="col-sm-4 pl-4 pt-4">
               <img src="https://media.discordapp.net/attachments/612118988083822612/635163055222947890/iu.png?width=438&height=605" height="300px" />
            </div>
         </div>
      </div>

      <div class="container-fluid bg-grey">
         <div class="row">
            <div class="col-sm-4 p-3 pt-4 pb-4 pl-4">
               <img src="https://www.ucf.edu/news/files/2019/01/sea-turtle.jpg" width='100%' />
            </div>
            <div class="col-sm-4 p-3 pt-4 pb-4">
               <img src="https://www.ucf.edu/pegasus/wp-content/blogs.dir/4/files/2016/10/Fall-2016-InFocus-Web-Images-Turtles-4.jpg" width='100%' />
            </div>
            <div class="col-sm-4 p-3 pt-4 pb-4">
               <img src="https://www.ucf.edu/pegasus/wp-content/blogs.dir/4/files/2016/10/Fall-2016-InFocus-Web-Images-Turtles-1.jpg" width='100%' />
            </div>
         </div>
      </div>

      {/* <div id="loadedFooter"></div> */}

    </>
    );
  }
}

export default About;
