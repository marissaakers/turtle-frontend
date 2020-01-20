import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import ExternalNavbar from '../../components/external-navbar';
import ExternalFooter from '../../components/external-footer';
import '../shared/external.css';

const TITLE = 'Contact us'

class Contact extends React.Component {
  constructor(props) {
    super(props);

    this.state = {}
  }
  render() {
    return(
    <>
      <Helmet>
        <title>{ TITLE }</title>
      </Helmet>

      <ExternalNavbar />

      <div class="container-fluid bg-white">
        <div class="row justify-content-center">
        	<div class="title col-12 col-lg-8">
        		<h2 class="text-center pb-3 pt-5">CONTACT US</h2>
          </div>
      	</div>
      </div>
      <div class="container-fluid">
      	<div class="row justify-content-center">
      		<div class="media-container-column col-lg-8 pb-3">
      			<p>Galar is an expansive region with diverse environments -- an idyllic countryside, contemporary cities, thick forest, and craggy, snow-covered mountains. The people and the pokémon who live there work together closely to develop the industries in the region. Fans will have the opportunity to visit various gyms in the Galar region in their quest to become champion.</p>
      		</div>
      	</div>

      	<div class="row justify-content-center">
      		<div class="media-container-column col-lg-8" data-form-type="formoid">
      			<div data-form-alert hidden>Thanks for filling out the form!</div>
      			<form class="mbr-form" action="google.com" method="post" data-form-title="Contact Form">
      				<input type="hidden" data-from-email="true" value="bla" />

      				<div class="row row-sm-offset">
      					<div class="col-md-4 multi-horizontal" data-for="name">
      						<div class="form-group">
      							<label class="form-control-label" for="name-form1-4">Name</label>
      							<input type="text" class="form-control" name="name" data-form-field="Name" required id="name-form1-4" />
      						</div>
      					</div>

      					<div class="col-md-4 multi-horizontal" data-for="email">
      						<div class="form-group">
      							<label class="form-control-label" for="name-form1-4">Email</label>
      							<input type="text" class="form-control" name="email" data-form-field="Email" required id="name-form1-4" />
      						</div>
      					</div>

      					<div class="col-md-4 multi-horizontal" data-for="phone">
      						<div class="form-group">
      							<label class="form-control-label" for="name-form1-4">Phone</label>
      							<input type="tel" class="form-control" name="email" data-form-field="Phone" required id="name-form1-4" />
      						</div>
      					</div>
      				</div>

      				<div class="form-group" data-for="message">
      					<label class="form-control-label" for="message-form1-4">Message</label>
      					<textarea type="text" class="form-control" name="message" rows="7" data-form-field="Message" id="message-form1-4"></textarea>
      				</div>

      				<div class="pb-4 pt-2 text-center">
      					<button type="submit" class="btn btn-outline-secondary btn-lg">SEND FORM</button>
      				</div>
      			</form>
      		</div>
      	</div>
      </div>

      <ExternalFooter />
    </>
    );
  }
}

export default Contact;
