import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './index.css';

const ReportsListNav = ({ content, selectedTab }) => {

  // index = 1;
  function getTabs() {
    return (
      <>
        <li class='nav-item'><a class='nav-link active' data-toggle='tab' href='#s1'>Lagoon</a></li>
        <li class='nav-item'><a class='nav-link' data-toggle='tab' href='#s2'>Trident</a></li>
        <li class='nav-item'><a class='nav-link' data-toggle='tab' href='#s3'>Beach</a></li>
        <li class='nav-item'><a class='nav-link' data-toggle='tab' href='#s3'>Offshore</a></li>
      </>
    )

    // else if (selectedTab === "trident") {
    //   return (
    //     <>
    //       <li><a href="/reports-list/lagoon">Lagoon</a></li>
    //       <li className="active"><a href="/reports-list/trident">Trident</a></li>
    //       <li><a href="/reports-list/beach">Beach</a></li>
    //       <li><a href="/reports-list/offshore">Offshore</a></li>
    //     </>
    //   )
    // }
    // else if (selectedTab === "beach") {
    //   return (
    //     <>
    //       <li><a href="/reports-list/lagoon">Lagoon</a></li>
    //       <li><a href="/reports-list/trident">Trident</a></li>
    //       <li className="active"><a href="/reports-list/beach">Beach</a></li>
    //       <li><a href="/reports-list/offshore">Offshore</a></li>
    //     </>
    //   )
    // }
    // else if (selectedTab === "offshore") {
    //   return (
    //     <>
    //       <li><a href="/reports-list/lagoon">Lagoon</a></li>
    //       <li><a href="/reports-list/trident">Trident</a></li>
    //       <li><a href="/reports-list/beach">Beach</a></li>
    //       <li className="active"><a href="/reports-list/offshore">Offshore</a></li>
    //     </>
    //   )
    // }
    // else {
    //   console.error("Please pass a proper tab name to reports-list-nav.");
    // }
  }

  return (
    <>
      {/*
      <Helmet>
        <link href="//netdna.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css" />
      </Helmet>
      */}

      <div className="container">
        <div className="panel with-nav-tabs panel-default">
          <div className="panel-heading">
            <ul className="nav nav-tabs">
              { getTabs() }
             </ul>

               <div class="tab-content">
                 <div class='tab-pane container fade in show active' id='s1'>{ content }</div>
                 <div class='tab-pane container fade' id='s2'>2</div>
                 <div class='tab-pane container fade' id='s3'>3</div>
                 <div class='tab-pane container fade' id='s4'>4</div>
                 <div class='tab-pane container fade' id='s5'>5</div>
                 <div class='tab-pane container fade' id='s6'>6</div>
               </div>
               {/*
            </ul>

          <div className="tab-pane fade in active">{ content }</div>*/}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReportsListNav;
