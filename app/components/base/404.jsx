import React from "react";
import { Segment } from "semantic-ui-react";
import {Link} from "react-router";

const missingPage = () =>
  <Segment textAlign='center' padded="very"
    style={{minHeight: "100%", width: "100%" ,background: 'url(../../resources/img/hal.png)no-repeat', backgroundPosition: 'center', backgroundSize: 'cover', backgroundColor:'rgba(52,52,52,0)'}}>

    <h3 style={{color: 'white'}}>I'm sorry Dave, I'm afraid I can't let you in.</h3>
    <p style={{color: 'white'}}>This page is missing or does not exist</p>
    <Link to="/">Click Here to Go to the Home Page</Link>
    <div className="push404"></div>
  </Segment>;


export default missingPage;
