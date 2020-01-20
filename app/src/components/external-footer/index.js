import React, { Component } from 'react';
import './index.css';

class ExternalFooter extends React.Component {
  render() {
    return(
      <>
        <footer class="page-footer">
           <div class="container">
              <div class="row">
                 <div class="col-lg-8 col-md-8 col-sm-12">
                    <h6 class="text-uppercase font-weight-bold">Additional Information</h6>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum quam odio, quis placerat ante luctus eu. Sed aliquet dolor id sapien rutrum, id vulputate quam iaculis.</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque interdum quam odio, quis placerat ante luctus eu. Sed aliquet dolor id sapien rutrum, id vulputate quam iaculis.</p>
                 </div>
                 <div class="col-lg-4 col-md-4 col-sm-12">
                    <h6 class="text-uppercase font-weight-bold">Contact</h6>
                    <p>1640 Riverside Drive, Hill Valley, California
                    <br/>info@mywebsite.com
                    <br/>+ 01 234 567 88
                    <br/>+ 01 234 567 89</p>
                 </div>
              </div>
           </div>
           <div class="footer-copyright text-center">© 2019 Copyright: TurtleTime.com</div>
        </footer>
      </>
    );
  }
}

export default ExternalFooter;
