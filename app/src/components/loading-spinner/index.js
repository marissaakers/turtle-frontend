import React, { Component } from 'react';

class LoadingSpinner extends React.Component {
  render() {
    return(
      <>
        <i class="las la-spinner fa-spin fa-3x mb-3" style={{color:'#0260f7'}}></i>
      </>
    );
  }
}

export default LoadingSpinner;
