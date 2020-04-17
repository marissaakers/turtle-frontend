import React, { Component } from 'react';
import Modal from "react-bootstrap/Modal";
import { Redirect } from 'react-router-dom'

class SubmitConfirmModal extends React.Component {

  // Props include:
  // - show
  // - redirectURL (optional)
  constructor (props) {
    super(props);

    this.state = {
      redirect: false,
      // This is default URL, but a custom one can be passed to this.
      redirectURL : '/new-report'
    }

    if (this.isNotEmptyOrWhiteSpace( this.props.redirectURL )) {
      this.state.redirectURL = this.props.redirectURL;
      console.log("Set redirect URL to " + this.props.redirectURL);
    }
  }

  isNotEmptyOrWhiteSpace (str) {
    return str && str.trim();
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={ this.state.redirectURL } />
    }
  }

  render() {
    if (this.props.show) {
      this.id = setTimeout(() => this.setState({ redirect: true }), 1500);
    }
    else {
      clearTimeout(this.id);
    }

    return (
      <Modal
        show={this.props.show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered>

        { this.renderRedirect() }

        <Modal.Body className="pt-4 pb-3">
          <h4>Data submitted!</h4>
          <p>
            You are now being redirected...
          </p>
        </Modal.Body>
      </Modal>
    );
  }
}

export default SubmitConfirmModal;
